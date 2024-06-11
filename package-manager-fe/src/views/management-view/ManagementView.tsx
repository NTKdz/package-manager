import { columns } from "@/components/custom/data-table/Columns";
import { DataTable } from "@/components/custom/data-table/DataTable";
import DataVisualization from "@/components/custom/managementview/DataVisualization";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageInterface, mockPackages } from "@/interface/packageInterface";
import Analytics from "@/services/analytics";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

export default function ManagementView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLayout, setCurrentLayout] = useState(
    location.pathname.split("/")[2]
  );
  const [transition, setTransition] = useState(false);
  const [data, setData] = useState<PackageInterface[]>([]);
  const { getPackageData } = Analytics();

  useEffect(() => {
    setTransition(true);
    const data = async () => {
      try {
        // const response: Payment[] = await axios.get(`/`);
        const response: PackageInterface[] = mockPackages;

        getPackageData().then((res) => console.log(res));
        setData(response);
      } catch (e) {
        console.log((e as Error).message);
      }
    };
    data();
  }, [currentLayout]);

  function handleChangeLayout(layout: string) {
    if (currentLayout !== layout) {
      setTransition(false);
      switch (currentLayout) {
        case "chart":
          navigate("/manage/table");
          setCurrentLayout("table");
          break;
        case "table":
          navigate("/manage/chart");
          setCurrentLayout("chart");
          break;
        default:
          break;
      }
    }
  }

  return (
    <div className="w-full px-10 mt-4">
      <div className="absolute top-4 right-8">
        <Tabs defaultValue={currentLayout} className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="chart"
              onClick={() => {
                handleChangeLayout("chart");
              }}
            >
              Biểu đồ
            </TabsTrigger>
            <TabsTrigger
              value="table"
              onClick={() => {
                handleChangeLayout("table");
              }}
            >
              Bảng
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {currentLayout === "chart" ? (
        <div className={`${transition ? currentLayout : ""}`}>
          <DataVisualization />
        </div>
      ) : (
        <div className={`${transition ? currentLayout : ""} w-full`}>
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}
