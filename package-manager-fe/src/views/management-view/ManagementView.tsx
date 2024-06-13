import { columns } from "@/components/custom/data-table/Columns";
import { DataTable } from "@/components/custom/data-table/DataTable";
import DataVisualization from "@/components/custom/managementview/DataVisualization";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/redux/store";
import TableService from "@/services/TableService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

export default function ManagementView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLayout, setCurrentLayout] = useState(
    location.pathname.split("/")[2]
  );
  const [transition, setTransition] = useState(false);
  const { requestedPackage } = useSelector((state: RootState) => state.package);
  const { getPackageData } = TableService();

  useEffect(() => {
    getPackageData();
  }, []);

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
          <DataTable columns={columns} data={requestedPackage} />
        </div>
      )}
    </div>
  );
}
