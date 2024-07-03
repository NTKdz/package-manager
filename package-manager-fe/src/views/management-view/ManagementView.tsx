import PackageTable from "@/components/custom/data-table/package-table/PackageTable";
import DataVisualization from "@/components/custom/management-view/data-visualization/DataVisualization";
import ExcelHandler from "@/components/custom/management-view/excel-handler/ExcelHandler";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploadService from "@/services/UploadService";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StatisticsTableView from "./statistics-table-view/StatisticsTableView";
import "./styles.css";

export default function ManagementView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLayout, setCurrentLayout] = useState(
    location.pathname.split("/")[2]
  );
  const [transition, setTransition] = useState(false);
  const { importExcelFile } = UploadService();

  function handleChangeLayout(layout: string) {
    console.log(transition);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onFileChange(e: any) {
    const file = e.target.files[0];
    importExcelFile(file);
    console.log(file);
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
          <div className="mb-2 flex">
            <ExcelHandler />
            <div className="cursor-pointer w-[300px]">
              <Input
                id="picture"
                type="file"
                className="cursor-pointer "
                onChange={onFileChange}
                title="Nhập dữ liệu từ file Excel. Dung luơng tệp tối đa 50MB."
              />
            </div>
          </div>
          <PackageTable />
        </div>
      )}
    </div>
  );
}
