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
  const [filter, setFilter] = useState<{
    waybill: null | number;
    name: null | string;
    requestedDate: null | Date;
    department: null | string;
    priority: null | string;
    confidentiality: null | string;
  }>({
    waybill: null,
    name: null,
    requestedDate: null,
    department: null,
    priority: null,
    confidentiality: null,
  });

  useEffect(() => {
    getPackageData();
  }, []);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      console.log("enter");
      getPackageData(filter);
    }
  }

  const filteredColumns = [
    {
      placeholder: "",
      component: (
        <div className="w-[120px] flex items-center relative">
          <Input
            type="number"
            value={filter.waybill?.toString() || ""}
            onChange={(e) => {
              setFilter({ ...filter, waybill: Number(e.target.value) });
            }}
            style={{ width: "100%" }}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          />
          {filter.waybill && (
            <CiCircleRemove
              size={"20px"}
              className="absolute right-1 hover:cursor-pointer"
              onClick={() => {
                setFilter({ ...filter, waybill: null });
                getPackageData({ ...filter, waybill: null });
              }}
            />
          )}
        </div>
      ),
    },
    {
      placeholder: "",
      component: <></>,
    },
    {
      placeholder: "",
      component: (
        <div className="flex items-center relative">
          <Input
            type="text"
            value={filter.name?.toString() || ""}
            onChange={(e) => {
              setFilter({ ...filter, name: e.target.value });
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          />
          {filter.name && (
            <CiCircleRemove
              size={"20px"}
              className="absolute right-1 hover:cursor-pointer"
              onClick={() => {
                setFilter({ ...filter, name: null });
                getPackageData({ ...filter, name: null });
              }}
            />
          )}
        </div>
      ),
    },
    {
      placeholder: "",
      component: (
        <div className="flex items-center">
          <div className="flex items-center relative">
            <CustomDatePicker
              clear={filter.requestedDate ? false : true}
              onChange={(date) => {
                setFilter({
                  ...filter,
                  requestedDate: date ? new Date(date) : null,
                });
              }}
            />
            {filter.requestedDate && (
              <CiCircleRemove
                size={"20px"}
                className="absolute right-1 hover:cursor-pointer"
                onClick={() => {
                  setFilter({ ...filter, requestedDate: null });
                  getPackageData({ ...filter, requestedDate: null });
                }}
              />
            )}
          </div>
        </div>
      ),
    },
    {
      placeholder: "",
      component: (
        <div className="flex items-center relative">
          <Input
            type="text"
            value={filter.department?.toString() || ""}
            onChange={(e) => {
              setFilter({ ...filter, department: e.target.value });
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          />
          {filter.department && (
            <CiCircleRemove
              size={"20px"}
              className="absolute right-1 hover:cursor-pointer"
              onClick={() => {
                setFilter({ ...filter, department: null });
                getPackageData({ ...filter, department: null });
              }}
            />
          )}
        </div>
      ),
    },
    {
      placeholder: "",
      component: <></>,
    },
    {
      placeholder: "",
      component: (
        <div className="flex items-center relative">
          <CustomDropdownMenu
            title="Đo khẩn"
            value={filter.priority || ""}
            menuItem={[
              { title: "Bình thường", value: "BINH_THUONG" },
              { title: "Hỏa tốc", value: "HOA_TOC" },
              { title: "Khẩn", value: "KHAN" },
              { title: "Thượng khẩn", value: "THUONG_KHAN" },
            ]}
            onItemSelected={(value) => {
              setFilter({ ...filter, priority: value });
              getPackageData({ ...filter, priority: value });
            }}
          />
          {filter.priority && (
            <CiCircleRemove
              size={"20px"}
              className="absolute right-1 hover:cursor-pointer"
              onClick={() => {
                setFilter({ ...filter, priority: null });
                getPackageData({ ...filter, priority: null });
              }}
            />
          )}
        </div>
      ),
    },
    {
      placeholder: "",
      component: (
        <div className="flex items-center relative">
          <CustomDropdownMenu
            title="Cpn"
            value={filter.confidentiality || ""}
            menuItem={[
              { title: "Bình thường", value: "BINH_THUONG" },
              { title: "Mật", value: "MAT" },
            ]}
            onItemSelected={(value) => {
              setFilter({ ...filter, confidentiality: value });
              getPackageData({ ...filter, confidentiality: value });
            }}
          />
          {filter.confidentiality && (
            <CiCircleRemove
              size={"20px"}
              className="absolute right-1 hover:cursor-pointer"
              onClick={() => {
                setFilter({ ...filter, confidentiality: null });
                getPackageData({ ...filter, confidentiality: null });
              }}
            />
          )}
        </div>
      ),
    },
  ];

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
          <DataTable
            columns={columns}
            data={requestedPackage}
            filterRows={filteredColumns}
          />
        </div>
      )}
    </div>
  );
}
