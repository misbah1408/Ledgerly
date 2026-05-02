"use client";

import { LedgerForm } from "@/components/forms/LedgerForm";
import LedgerList from "@/components/LedgerList";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { getLedgers } from "@/service/ledgerService";
import { Ledger } from "@/types/Ledger";
import { ChevronDown, Edit, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import LedgerTransactions from "@/components/LedgerTransactions";
import LedgerAdjustment from "@/components/forms/LedgerAdjustment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TransferForm from "@/components/forms/TransferForm";

const NoLedger = ({ setIsOpen }: { setIsOpen: (value: boolean) => void }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-5">
      <h1 className="text-3xl font-bold">Ledger Details</h1>
      <p className="">
        Add your ledgers to manage your business easily. Track payments and grow
        your business without any hassle!
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
        Add Your Ledger Party
      </Button>
    </div>
  );
};

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEntryForm, setIsOpenEntryForm] = useState(false);
  const [isOpenTransferForm, setIsOpenTransferForm] = useState(false);
  const [ledgers, setLedgers] = useState<Ledger[] | null>();
  const [ledger, setLedger] = useState<Ledger | null>();
  const [mode, setMode] = useState<"add" | "edit" | null>(null);

  const { store } = useUser();
  const fecthAllLedgers = async () => {
    if (!store) return;
    try {
      const res = await getLedgers(store?.id);
      console.log(res.data.data);
      setLedgers(res.data.data);
      setLedger(res.data?.data[0]);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    function fn() {
      fecthAllLedgers();
    }
    if (store) {
      fn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);
  return (
    <>
      {ledgers?.length === 0 ? (
        <>
          <NoLedger setIsOpen={setIsOpen} />
          <LedgerForm
            isNew={true}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSuccess={fecthAllLedgers}
          />
        </>
      ) : (
        <div className="w-full bg-gray-200">
          {/* Header */}
          <div className="flex justify-between bg-accent p-5">
            <h1 className="text-xl font-bold">Accounts</h1>
            <div className="flex">
              <Button
                variant="destructive"
                onClick={() => {
                  setMode("add");
                  setIsOpen(true);
                }}
              >
                <Plus /> Add Account
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="w-full grid grid-cols-4 p-1 h-[calc(100dvh-146px)]">
            {/* Sidebar */}
            <div className="p-1 bg-white rounded-lg col-span-1 h-full overflow-y-auto">
              <LedgerList
                data={ledgers || []}
                ledger={ledger as Ledger}
                setLedger={setLedger}
              />
            </div>

            {/* Main */}
            <div className="h-full flex flex-col gap-1 pl-2 col-span-3">
              <div className="rounded-lg bg-white p-3">
                {ledger && (
                  <div className="flex justify-between">
                    <h1 className="flex items-center gap-2">
                      {ledger?.displayName}
                      <Edit
                        size={20}
                        className="text-blue-600 cursor-pointer"
                        onClick={() => {
                          setIsOpen(true);
                          setMode("edit");
                        }}
                      />
                    </h1>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="bg-transparent text-red-600 hover:text-white rounded-l-full rounded-r-full hover:bg-red-600">
                            Deposit / Withdraw
                            <ChevronDown className="border-l" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="start">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => setIsOpenTransferForm(true)}
                            >
                              Acc to Acc transfer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setIsOpenEntryForm(true)}
                            >
                              Adjust Balance
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <LedgerAdjustment
                        ledger={ledger ?? {}}
                        ledgers={ledgers ?? []}
                        isOpen={isOpenEntryForm}
                        setOpen={setIsOpenEntryForm}
                        onSuccess={fecthAllLedgers}
                      />
                      <TransferForm
                        ledger={ledger ?? {}}
                        ledgers={ledgers ?? []}
                        isOpen={isOpenTransferForm}
                        setOpen={setIsOpenTransferForm}
                        onSuccess={fecthAllLedgers}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-white flex-1 overflow-auto">
                <LedgerTransactions ledger={ledger ?? ({} as Ledger)} />
              </div>
            </div>
          </div>
          <LedgerForm
            isNew={mode === "add" ? true : false}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            ledgerDetails={mode === "edit" ? (ledger ?? undefined) : undefined}
            onSuccess={fecthAllLedgers}
          />
        </div>
      )}
    </>
  );
};

export default Page;
