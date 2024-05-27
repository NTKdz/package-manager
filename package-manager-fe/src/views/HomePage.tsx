import { columns } from "@/components/custom/data-table/Columns";
import { DataTable } from "@/components/custom/data-table/DataTable";
import RequestPackageDialog from "@/components/custom/homepage/RequestPackageDialog";
import { Package } from "@/redux/interface/packageInterface";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState<Package[]>([]);
  useEffect(() => {
    const data = async () => {
      try {
        // const response: Payment[] = await axios.get(`/`);
        const response: Package[] = [
          {
           
            waybill: 1234567890,
            company: "FastTrack Logistics",
            status: "pending",
            cpn: "CPN12345",
            department: "Sales",
          },
          {
           
            waybill: 9876543210,
            company: "Global Express",
            status: "processing",
            cpn: "CPN67890",
            department: "Marketing",
          },
          {
            
            waybill: 5551212345,
            company: "Swift Delivery Co.",
            status: "success",
            cpn: "CPN54321",
            department: "Finance",
          },
          {
           
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
      <RequestPackageDialog />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
