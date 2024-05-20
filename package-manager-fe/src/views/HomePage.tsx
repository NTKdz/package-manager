import { CustomDialog } from "@/components/custom/custom-dialog/CustomDialog";
import { Delivery, columns } from "@/components/custom/data-table/Columns";
import { DataTable } from "@/components/custom/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState<Delivery[]>([]);
  useEffect(() => {
    const data = async () => {
      try {
        // const response: Payment[] = await axios.get(`/`);
        const response: Delivery[] = [
          {
            id: "728ed52f",
            waybill: 1234567890,
            company: "FastTrack Logistics",
            status: "pending",
            cpn: "CPN12345",
            department: "Sales",
          },
          {
            id: "839c4a6b",
            waybill: 9876543210,
            company: "Global Express",
            status: "processing",
            cpn: "CPN67890",
            department: "Marketing",
          },
          {
            id: "4f5b0c1d",
            waybill: 5551212345,
            company: "Swift Delivery Co.",
            status: "success",
            cpn: "CPN54321",
            department: "Finance",
          },
          {
            id: "a1b2c3d4",
            waybill: 1118887777,
            company: "Reliable Shipping",
            status: "failed",
            cpn: "CPN99999",
            department: "Support",
          },
        ];

        console.log(response);
        setData(response);
      } catch (e) {
        console.log((e as Error).message);
      }
    };
    data();
  }, []);

  function handleInputChange() {
    console.log("Input changed");
  }
  return (
    <div className="container mx-auto">
      <CustomDialog
        title="Request Package"
        style="mb-2"
        dialogContent={
          <div>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value="@peduarte"
                  className="col-span-3"
                  onChange={() => {}}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </div>
        }
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
