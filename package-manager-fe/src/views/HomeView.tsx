import { columns } from "@/components/custom/data-table/Columns";
import { DataTable } from "@/components/custom/data-table/DataTable";
import RequestPackageDialog from "@/components/custom/homeview/RequestPackageDialog";
import { PackageInterface, mockPackages } from "@/interface/packageInterface";
import { useEffect, useState } from "react";

export default function HomeView() {
  const [data, setData] = useState<PackageInterface[]>([]);
  useEffect(() => {
    const data = async () => {
      try {
        // const response: Payment[] = await axios.get(`/`);
        const response: PackageInterface[] = mockPackages;

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
    <div className="container mx-auto mt-10">
      <RequestPackageDialog />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
