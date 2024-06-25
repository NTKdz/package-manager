import CustomDatePicker from "@/components/custom/custom-date-picker/CustomDatePicker";
import { CustomDropdownMenu } from "@/components/custom/custom-dropdown-menu/CustomDropdownMenu";
import { columns } from "@/components/custom/data-table/Columns";
import { DataTable } from "@/components/custom/data-table/DataTable";
import DataVisualization from "@/components/custom/management-view/data-visualization/DataVisualization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/redux/store";
import TableService from "@/services/TableService";
import UploadService from "@/services/UploadService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import StatisticsTableView from "./statistics-table-view/StatisticsTableView";
import { CiCircleRemove } from "react-icons/ci";
import "./styles.css";
import PackageTable from "@/components/custom/data-table/package-table/PackageTable";

export default function ManagementView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLayout, setCurrentLayout] = useState(
    location.pathname.split("/")[2]
  );
  const [transition, setTransition] = useState(false);
  const { exportExcelFile } = UploadService();

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
          <PackageTable />
        </div>
      )}
    </div>
  );
}
