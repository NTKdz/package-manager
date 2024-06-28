import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { CustomDropdownMenu } from "../../custom-dropdown-menu/CustomDropdownMenu";
import { CiCircleRemove } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import CustomDatePicker from "../../custom-date-picker/CustomDatePicker";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import TableService from "@/services/TableService";
import { columns } from "../Columns";
import { useLocation } from "react-router-dom";
import { setQuery } from "@/redux/slices/packageSlice";

export default function PackageTable() {
  const location = useLocation();
  const { requestedPackage, query } = useSelector(
    (state: RootState) => state.package
  );
  const { getPackageData } = TableService();
  const [filter, setFilter] = useState<{
    waybill: null | number;
    name: null | string;
    username: null | string;
    requestedDate: null | Date;
    department: null | string;
    priority: null | string;
    confidentiality: null | string;
  }>({
    waybill: null,
    name: null,
    username: null,
    requestedDate: null,
    department: null,
    priority: null,
    confidentiality: null,
  });

  useEffect(() => {
    if (location.pathname.includes("/order"))
      setQuery({
        ...query,
        username: localStorage.getItem("username") || "",
      });

      console.log(localStorage.getItem("username") )
  }, []);

  useEffect(() => {}, [filter]);

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
      component: (
        <div className="flex items-center relative">
          {!location.pathname.includes("/order") && (
            <Input
              type="text"
              value={filter.username?.toString() || ""}
              onChange={(e) => {
                setFilter({ ...filter, username: e.target.value });
              }}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
            />
          )}
          {filter.username && (
            <CiCircleRemove
              size={"20px"}
              className="absolute right-1 hover:cursor-pointer"
              onClick={() => {
                setFilter({ ...filter, username: null });
                getPackageData({ ...filter, username: null });
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
    <div>
      <DataTable
        columns={columns}
        data={requestedPackage}
        filterRows={filteredColumns}
      />
    </div>
  );
}
