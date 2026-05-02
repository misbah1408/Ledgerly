import { Ledger } from "@/types/Ledger";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import {
  LedgerAdjustmentSchema,
  ledgerAdjustmentSchema,
} from "@/schema/LedgerAdjustmentSchema";
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
import { toast } from "sonner";
import { ledgerAdjustment } from "@/service/ledgerService";

interface LedgerAdjustmentProps {
  ledger: Ledger;
  setOpen: (v: boolean) => void;
  isOpen: boolean;
  ledgers: Ledger[];
  onSuccess: () => void;
}

const LedgerAdjustment: React.FC<LedgerAdjustmentProps> = ({
  ledger,
  setOpen,
  isOpen,
  onSuccess,
}) => {
  const form = useForm<LedgerAdjustmentSchema>({
    resolver: zodResolver(ledgerAdjustmentSchema),
    defaultValues: {
      displayName: ledger.displayName,
      amount: 0,
      createdAt: new Date(),
      ledgerId: ledger?.ledgerId,
      type: "ADJUSTMENT_INCREASE",
    },
  });

  const cost = form.watch("amount");
  const type = form.watch("type");
  const balance =
    ledger.balance + (type === "ADJUSTMENT_INCREASE" ? cost : -cost);

  const onSubmit = async (values: LedgerAdjustmentSchema) => {
    if (!ledger) {
      return;
    }
    try {
      const res = await ledgerAdjustment(ledger.ledgerId, values);
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
              onSubmit={form.handleSubmit(onSubmit)}
              id="adjForm"
            >
              {/* left */}
              <div className="space-y-3 w-full">
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Display Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Account Display Name"
                          {...field}
                          readOnly
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <NumberInput
                          placeholder="Enter Opening Balance"
                          value={field.value}
                          className="selection:bg-blue-500"
                          onChange={(e) =>
                            form.setValue(
                              "amount",
                              Number(e.target.valueAsNumber),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span
                  className={`text-[12px] ${(isNaN(balance) ? 0 : balance) >= 0 ? "text-green-700" : "text-red-700"}`}
                >
                  Bal: {isNaN(balance) ? ledger.balance : balance}
                </span>
              </div>
              {/* right */}
              <div className="grid-cols-1 w-full space-y-3">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={"ADJUSTMENT_INCREASE"}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background w-full">
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
                <FormField
                  control={form.control}
                  name="createdAt"
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
                            onSelect={field.onChange}
                            defaultMonth={field.value}
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

export default LedgerAdjustment;
