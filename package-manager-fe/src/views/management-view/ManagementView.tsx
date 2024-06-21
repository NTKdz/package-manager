import { columns } from "@/components/custom/data-table/Columns";
import { DataTable } from "@/components/custom/data-table/DataTable";
import DataVisualization from "@/components/custom/management-view/data-visualization/DataVisualization";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/redux/store";
import TableService from "@/services/TableService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import StatisticsTableView from "./statistics-table-view/StatisticsTableView";
import "./styles.css";
import { Button } from "@/components/ui/button";
import UploadService from "@/services/UploadService";

export default function ManagementView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLayout, setCurrentLayout] = useState(
    location.pathname.split("/")[2]
  );
  const [transition, setTransition] = useState(false);

  const { requestedPackage } = useSelector((state: RootState) => state.package);
  const { getPackageData } = TableService();
  const { exportExcelFile } = UploadService();
  useEffect(() => {
    getPackageData();
  }, []);

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setTransition(true);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentLayout]);

  function handleChangeLayout(layout: string) {
    if (currentLayout !== layout) {
      switch (currentLayout) {
        case "chart":
          navigate("/manage/table");
          setCurrentLayout("table");
          setTransition(false);
          break;
        case "table":
          navigate("/manage/chart");
          setCurrentLayout("chart");
          setTransition(false);
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
        <div>
          <div>
            <StatisticsTableView />
          </div>
          <DataVisualization />
        </div>
      ) : (
        <div>
          <div className="mb-2">
            <Button
              className="mr-2"
              onClick={() => {
                exportExcelFile();
              }}
            >
              Xuất excel
            </Button>
            <Button>Nhập excel</Button>
          </div>
          <DataTable columns={columns} data={requestedPackage} />
        </div>
      )}
    </div>
  );
}
