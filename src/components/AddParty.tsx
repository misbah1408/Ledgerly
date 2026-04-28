"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { partySchema } from "@/schema/PartySchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Party } from "@/types/Party";
import { addCustomer, updateCustomer } from "@/service/customerService";
import { Textarea } from "./ui/textarea";
import { useUser } from "@/context/UserContext";

interface AddPartyProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  data?: Party;
  existing: boolean;
  partyId?: number;
  onSuccess?: () => void;
}
const AddParty: React.FC<AddPartyProps> = ({
  isOpen,
  setIsOpen,
  data,
  existing,
  partyId,
  onSuccess,
}) => {
  const { store } = useUser();
  const form = useForm({
    resolver: zodResolver(partySchema),
    defaultValues: {
      name: data?.name || "",
      phone: data?.phone,
      email: data?.email || "",
      balance: data?.balance || 0,
      storeId: store?.id,
    },
  });

  const onError = (errors: typeof form.formState.errors) => {
    console.log("Validation errors:", errors);

    // Optional: print each error nicely
    Object.entries(errors).forEach(([field, error]) => {
      console.log(`${field}: ${error.message}`);
    });
  };

  const onSubmit = async (values: z.infer<typeof partySchema>) => {
    if (!existing) {
      const res = await addCustomer(values);

      if (res.data.success) {
        toast.success(res.data.message);
        setIsOpen(false);
        onSuccess?.();
      }
    } else {
      const res = await updateCustomer(values, partyId as number);
      console.log(res.data);

      if (res.data.success) {
        toast.success(res.data.message);
        setIsOpen(false);
        onSuccess?.();
      }
    }
  };

  useEffect(() => {
    if (data) {
      form.reset({
        name: data?.name || "",
        phone: data?.phone,
        email: data?.email || "",
        address: data?.address || "",
        storeId: data?.storeId,
        balance: data?.balance || 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="w-[50%] max-w-[60%]! min-h-100">
        <DialogHeader>
          <DialogTitle>Add Party</DialogTitle>
          <hr />

          <form onSubmit={form.handleSubmit(onSubmit, onError)} id="partyForm">
            <Form {...form}>
              <div className="grid grid-cols-3 gap-5 mb-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>Party Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Party Name"
                          {...field}
                          className="selection:bg-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Phone Number"
                          type="tel"
                          {...field}
                          value={(field.value as string | undefined) ?? ""} // show empty if undefined
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val === "" ? undefined : val); // allow empty
                          }}
                          className="selection:bg-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="balance"
                  render={({ field }) => (
                    <FormItem className="col-span-1 w-fit">
                      <FormLabel>Opening Balance</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Opening Balance"
                          {...field}
                          value={field.value as number}
                          className="selection:bg-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-1 mt-5">
                      <FormLabel>Biling Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Party Biling Address"
                          {...field}
                          className="selection:bg-blue-500 w-80 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </form>
        </DialogHeader>
        <div className="h-fit flex justify-end fixed bottom-0 right-0 py-5 px-3">
          <Button type="submit" form="partyForm">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddParty;
