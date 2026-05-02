import { useState, useMemo } from "react";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import AddParty from "../AddParty";
import { Party } from "@/types/Party";
import { InvoiceSchema } from "@/schema/InvoiceSchema";

interface PartySelectorProps {
  parties: Party[];
  selectedParty: Party | null;
  setSelectedParty: (party: Party) => void;
  form: UseFormReturn<InvoiceSchema>;
  fetchParties: ()=> void;
}

export function PartySelector({
  parties,
  selectedParty,
  setSelectedParty,
  form,
  fetchParties,
}: PartySelectorProps) {
  const [customerName, setCustomerName] = useState("");
  const [partyDivOpen, setPartyDivOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    setValue,
    // formState: { errors },
  } = form;
  const filteredParties = useMemo(() => {
    if (!customerName.trim()) return parties;

    const search = customerName.toLowerCase();
    return parties.filter((p) => {
      const name = p.name?.toLowerCase() ?? "";
      // const phone = String(p?.phoneNo ?? "").toLowerCase();
      // return name.includes(search) || phone.includes(search);
      return name.includes(search);
    });
  }, [customerName, parties]);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <Label htmlFor="customerName" className="mb-2">
            Search by Name/Phone *
          </Label>
          <div className="relative">
            <Input
              id="customerName"
              value={customerName}
              {...register(`customerName`)}
              onChange={(e) => {
                setCustomerName(e.target.value);
                setValue("customerName", e.target.value);
              }}
              placeholder="Party name"
              autoComplete="off"
              onBlur={() => setTimeout(() => setPartyDivOpen(false), 200)}
              onFocus={() => setPartyDivOpen(true)}
            />

            {partyDivOpen && (
              <div className="absolute z-10 max-h-48 w-full overflow-y-auto p-2 bg-card rounded-lg shadow-lg border mt-1">
                <Button
                  variant="ghost"
                  type="button"
                  className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10 mb-2"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setIsOpen(true)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Party
                </Button>

                <div className="flex flex-col gap-1">
                  {filteredParties.length > 0 ? (
                    filteredParties.map((party) => (
                      <Button
                        type="button"
                        key={party.id}
                        variant="ghost"
                        className="w-full justify-between hover:bg-muted"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setSelectedParty(party);
                          setCustomerName(party.name);
                          setValue("customerName", party.name);
                          setValue("customerId", party?.id);
                          setPartyDivOpen(false);
                        }}
                      >
                        <span className="text-sm">{party.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ₹{party.balance}
                        </span>
                      </Button>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      No parties found
                    </p>
                  )}
                </div>
              </div>
            )}

            {selectedParty && (
              <p className="text-xs mt-1 text-success text-green-600">
                Balance:{" "}
                <strong>
                  ₹{selectedParty.balance}
                </strong>
              </p>
            )}
          </div>

          <div className="mt-4">
            <Label htmlFor="address" className="mb-2">
              Billing Address
            </Label>
            <Textarea
              id="address"
              className="resize-none"
              value={selectedParty?.address ?? ""}
              readOnly
            />
          </div>
        </div>

        {/* <div>
          <Label htmlFor="phoneNumber" className="mb-2">
            Phone No.
          </Label>
          <Input
            id="phoneNumber"
            {...register(`phoneNo`)}
            placeholder="Phone number"
            value={selectedParty?.phoneNo ?? ""}
            readOnly
          />
        </div> */}
      </div>
      <AddParty
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSuccess={fetchParties}
        existing={false}
      />
    </>
  );
}