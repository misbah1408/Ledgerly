"use client";

import PartyInvoiceList from "@/components/invoice/PartyInvoiceList";
import AddParty from "@/components/AddParty";
import PartyList from "@/components/PartyList";
import { Button } from "@/components/ui/button";
import { getCustomers } from "@/service/customerService";
import { Party } from "@/types/Party";
import { Edit, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import Image from "next/image";

const Page = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [parties, setParties] = useState<Party[]>([]);
  const [party, setParty] = useState<Party>();
  const { store } = useUser();

  const fetchAllParties = useCallback(async () => {
    if (!store) {
      toast.message("Please Select store");
      return;
    }
    try {
      const res = await getCustomers(store?.id);
      setParty(res.data.data[0]);
      setParties(res.data.data);
    } catch (error) {
      console.error("Failed to fetch parties", error);
    }
  }, [store]);

  useEffect(() => {
    function f() {
      fetchAllParties();
    }
    if (store) {
      f();
    }
  }, [fetchAllParties, store]);

  return (
    <>
      {parties.length === 0 ? (
        <>
          <NoCustomer setIsOpen={setIsAddOpen} />
          <AddParty
            isOpen={isAddOpen}
            setIsOpen={setIsAddOpen}
            existing={false}
            onSuccess={fetchAllParties}
          />
        </>
      ) : (
        <div className="max-w-full bg-gray-200">
          {/* Header Section */}
          <div className="flex justify-between bg-accent p-5">
            <h1 className="text-xl font-bold">Parties</h1>
            <div className="flex">
              <Button variant="destructive" onClick={() => setIsAddOpen(true)}>
                <Plus /> Add Party
              </Button>
              <AddParty
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
                existing={false}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-full grid grid-cols-4 p-1">
            {/* Party List */}
            <div className="p-1 bg-white rounded-lg col-span-1">
              <PartyList
                data={parties || []}
                party={party as Party}
                setParty={setParty}
              />
            </div>

            {/* Party Details + Invoices */}
            <div className="min-w-[74%] bg-gray-200 flex flex-col gap-1 pl-2 col-span-3">
              <div
                className=" rounded-lg bg-white p-3 cursor-pointer"
                onClick={() => setIsEditOpen(true)}
              >
                {party && (
                  <h1 className="flex items-center gap-2">
                    {party?.name}
                    <Edit size={20} className="text-blue-600" />
                  </h1>
                )}

                <AddParty
                  isOpen={isEditOpen}
                  setIsOpen={setIsEditOpen}
                  data={party}
                  existing={true}
                  partyId={party?.id || parties[0]?.id}
                  onSuccess={fetchAllParties}
                />
              </div>

              <div className="rounded-lg bg-white p-3">
                <PartyInvoiceList party={party as Party} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;

interface NoCustomerProps {
  setIsOpen: (v: boolean) => void;
}

const NoCustomer = ({ setIsOpen }: NoCustomerProps) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-5">
      <h1 className="text-3xl font-bold">Party Details</h1>
      <p className="">
        Add your customers to manage your business easily. Track payments and
        grow your business without any hassle!
      </p>
      <div className="flex flex-col">
        <Image
          src={"/create-party.png"}
          alt="create party"
          height={300}
          width={300}
        />
        <div className="bg-gray-200 h-4 w-full rounded-[100%]"></div>
      </div>
      <Button
        variant={"destructive"}
        className="animate-pulse"
        onClick={() => setIsOpen(true)}
      >
        <Plus />
        Add Your First Party
      </Button>
    </div>
  );
};
