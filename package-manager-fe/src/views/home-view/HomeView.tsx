import { columns } from "@/components/custom/data-table/Columns";
import { DataTable } from "@/components/custom/data-table/DataTable";
import RequestPackageDialog from "@/components/custom/homeview/RequestPackageDialog";
import { RootState } from "@/redux/store";
import Analytics from "@/services/TableService";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function HomeView() {
  const { requestedPackage } = useSelector((state: RootState) => state.package);
  const { getPackageData } = Analytics();
  useEffect(() => {
    getPackageData();
  }, []);


  return (
    <div className="container mx-auto mt-10">
      <RequestPackageDialog />
      <DataTable columns={columns} data={requestedPackage} />
    </div>
  );
}
