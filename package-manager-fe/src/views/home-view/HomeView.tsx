import PackageTable from "@/components/custom/data-table/package-table/PackageTable";
import RequestPackageDialog from "@/components/custom/homeview/RequestPackageDialog";

export default function HomeView() {
  return (
    <div className="container mx-auto mt-10">
      <RequestPackageDialog />
      <PackageTable />
    </div>
  );
}
