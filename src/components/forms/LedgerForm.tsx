import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { NumberInput } from "../NumberInput";
import { useRouter } from "next/navigation";
import { ledgerSchema, LedgerSchema } from "@/schema/LedgerSchema";
import { useUser } from "@/context/UserContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createLedger, updateLedger } from "@/service/ledgerService";
import { Ledger } from "@/types/Ledger";
import { useEffect } from "react";

interface LedgerFormProps {
  isNew: boolean;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  ledgerDetails?: Ledger;
  onSuccess: () => void;
}

export function LedgerForm({
  isNew,
  isOpen,
  setIsOpen,
  ledgerDetails,
  onSuccess,
}: LedgerFormProps) {
  const { store } = useUser();
  const router = useRouter();
  const form = useForm<LedgerSchema>({
    resolver: zodResolver(ledgerSchema),
    defaultValues: {
      displayName: "",
      balance: 0,
      accountType: "BANK",
      storeId: store?.id,
      type: "OPENING_BALANCE",
    },
  });

  const onError = (errors: typeof form.formState.errors) => {
    console.log("Validation errors:", errors);

    // Optional: print each error nicely
    Object.entries(errors).forEach(([field, error]) => {
      console.log(form.getValues());

      console.log(`${field}: ${error}`);
    });
  };

  const onSubmit = async (values: LedgerSchema) => {
    console.log("Form values:", values);
    if (isNew) {
      const res = await createLedger(values);
      console.log(res.data);
      if (res.data.success) {
        toast.success("Account details saved successfully!");
        router.push("/dashboard/ledger");
        setIsOpen(false);
        onSuccess();
      }
    } else {
      if (!ledgerDetails) {
        toast.error("Ledger not found!!!");
        return;
      }
      const res = await updateLedger(ledgerDetails?.ledgerId, values);
      console.log(res.data);
      if (res.data.success) {
        toast.success("Account details saved successfully!");
        router.push("/dashboard/ledger");
        setIsOpen(false);
        onSuccess();
      }
    }
  };
  useEffect(() => {
    if (!isNew && ledgerDetails && ledgerDetails.storeId === store?.id) {
      form.reset({
        accountType: ledgerDetails.accountType,
        balance: ledgerDetails.balance,
        displayName: ledgerDetails.displayName,
        storeId: ledgerDetails.storeId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, ledgerDetails, store]);

  useEffect(() => {
    if (isNew) {
      form.reset({
        accountType: "CASH",
        balance: 0,
        displayName: "",
        storeId: store?.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, ledgerDetails, store]);

  useEffect(() => {
    if (store?.id) {
      form.setValue("storeId", store.id);
    }
  }, [store, form]);
  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => setIsOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isNew ? "Add Account" : "Edit Account"}</DialogTitle>
        </DialogHeader>

        <div className="w-full h-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="space-y-6 p-3"
              id="accForm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Display Name */}
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Account Display Name
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Account Display Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Opening Balance */}
                <FormField
                  control={form.control}
                  name="balance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opening Balance</FormLabel>
                      <FormControl>
                        <NumberInput
                          placeholder="Enter Opening Balance"
                          value={field.value}
                          onChange={(e) =>
                            form.setValue(
                              "balance",
                              Number(e.target.valueAsNumber),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                {/* Account type */}
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"CASH"}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["CASH", "BANK"].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant={"destructive"} form="accForm">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
