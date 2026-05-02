import { Ledger } from "@/types/Ledger";
import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { NumberInput } from "../NumberInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { TransferSchema, transferSchema } from "@/schema/TransferSchema";
import { transferAccountToAccount } from "@/service/ledgerService";
import { toast } from "sonner";

interface TransferFormProps {
  ledger: Ledger;
  setOpen: (v: boolean) => void;
  isOpen: boolean;
  ledgers: Ledger[];
  onSuccess: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({
  ledger,
  setOpen,
  ledgers,
  isOpen,
}) => {
  const otherLedger = useMemo(() => {
    return ledgers.filter((l) => l.ledgerId != ledger.ledgerId);
  }, [ledger, ledgers]);
  const [toLedger, setToLedger] = useState(otherLedger[0]);

  const form = useForm<TransferSchema>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      from: {
        displayName: ledger.displayName,
        ledgerId: ledger.ledgerId,
        amount: 0,
        createdAt: new Date(),
        type: "ADJUSTMENT_INCREASE",
      },
      to: {
        displayName: otherLedger[0].displayName,
        ledgerId: otherLedger[0].ledgerId,
        amount: 0,
        createdAt: new Date(),
        type: "ADJUSTMENT_DECREASE",
      },
    },
  });

  const onError = (errors: typeof form.formState.errors) => {
    console.log("Validation errors:", errors);

    // Optional: print each error nicely
    Object.entries(errors).forEach(([field, error]) => {
      console.log(`${field}: ${error.message}`);
    });
  };

  const onSubmit = async (values: TransferSchema) => {
    if (!ledger) {
      return;
    }
    try {
      const { from, to } = values;
      const res = await transferAccountToAccount([
        { ...from },
        { ...to },
      ]);
      console.log(res.data);
      if (res.data?.success) {
        toast.message(res.data?.message);
        setOpen(false);
      }
    } catch (error) {
      console.log("onsubmit error", error);
      toast.error("Something went wrong!!!");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={(v) => setOpen(v)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Amount Adjustment Entry</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              className="grid grid-cols-2 gap-5"
              onSubmit={form.handleSubmit(onSubmit, onError)}
              id="adjForm"
            >
              {/* left */}
              <div className="space-y-3 w-full">
                <FormField
                  name="from"
                  render={() => (
                    <FormItem>
                      <FormLabel>From:</FormLabel>
                      <FormControl>
                        <Input value={ledger?.displayName} readOnly disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="from.amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <NumberInput
                          placeholder="Enter Opening Balance"
                          value={field.value}
                          className="selection:bg-blue-500"
                          onChange={(e) => {
                            form.setValue(
                              "from.amount",
                              Number(e.target.valueAsNumber),
                            );
                            form.setValue(
                              "to.amount",
                              Number(e.target.valueAsNumber),
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="from.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={(e) => {
                          if (!e) return;
                          console.log(e);
                          const val = e as
                            | "ADJUSTMENT_INCREASE"
                            | "ADJUSTMENT_DECREASE";
                          form.setValue("from.type", val);
                          form.setValue(
                            "to.type",
                            val === "ADJUSTMENT_INCREASE"
                              ? "ADJUSTMENT_DECREASE"
                              : "ADJUSTMENT_INCREASE",
                          );
                        }}
                        value={field.value}
                        defaultValue={"ADJUSTMENT_INCREASE"}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"ADJUSTMENT_INCREASE"}>
                            Adjustment Increase
                          </SelectItem>
                          <SelectItem value={"ADJUSTMENT_DECREASE"}>
                            Adjustment Decrease
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* right */}
              <div className="grid-cols-1 w-full space-y-3">
                <FormField
                  name="to"
                  render={() => (
                    <FormItem>
                      <FormLabel>To:</FormLabel>
                      <Select
                        onValueChange={(e) => {
                          const ledge = otherLedger[Number(e)];
                          setToLedger(ledge);
                          form.setValue("to.ledgerId", ledge.ledgerId);
                        }}
                        defaultValue={"0"}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {otherLedger.map((l, idx) => (
                            <SelectItem key={idx} value={idx + ""}>
                              {l.displayName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="from.createdAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adjustment Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty={!field.value}
                            className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(e) => {
                              if (!e) return;
                              console.log(e);
                              form.setValue("to.createdAt", new Date(e));
                              form.setValue("from.createdAt", new Date(e));
                            }}
                            defaultMonth={field.value}
                            className="w-full"
                          />
                        </PopoverContent>
                      </Popover>
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
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant={"destructive"} form="adjForm">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferForm;
