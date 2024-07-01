import { Input } from "@/components/ui/input";
import { setQuery } from "@/redux/slices/packageSlice";
import { RootState } from "@/redux/store";
import TableService from "@/services/TableService";
import { formatDate } from "date-fns";
import React, { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import CustomDatePicker from "../../custom-date-picker/CustomDatePicker";
import { CustomDropdownMenu } from "../../custom-dropdown-menu/CustomDropdownMenu";
import { columns } from "../Columns";
import { DataTable } from "../DataTable";

type FilterType = Partial<{
  waybill: number;
  name: string;
  username: string;
  requestedDate: string;
  department: string;
  priority: string;
  confidentiality: string;
}>;

export default function PackageTable() {
  const dispatch = useDispatch();
  const { requestedPackage, query } = useSelector(
    (state: RootState) => state.package
  );
  const { getPackageData } = TableService();
  const [filter, setFilter] = useState<FilterType>({
    waybill: undefined,
    name: undefined,
    username: undefined,
    requestedDate: undefined,
    department: undefined,
    priority: undefined,
    confidentiality: undefined,
  });

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      console.log("enter");
      getPackageData(filter);
    }
  }

  const removeNullValues = (
    obj: { [s: string]: unknown } | ArrayLike<unknown>
  ) => {
    return Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(obj).filter(([_, v]) => v !== undefined)
    );
  };

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
                setFilter({ ...filter, waybill: undefined });
                getPackageData({ ...filter, waybill: undefined });
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
                setFilter({ ...filter, username: undefined });
                getPackageData({ ...filter, username: undefined });
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
              value={filter.name?.toString() || ""}
              onChange={(e) => {
                setFilter({ ...filter, name: e.target.value });
              }}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
            />
          )}
          {filter.name && (
            <CiCircleRemove
              size={"20px"}
              className="absolute right-1 hover:cursor-pointer"
              onClick={() => {
                setFilter({ ...filter, name: undefined });
                getPackageData({ ...filter, name: undefined });
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
                console.log({ ...removeNullValues(filter) }, "test");
                setFilter({
                  ...filter,
                  requestedDate: formatDate(
                    date !== undefined ? date : "",
                    "yyyy-MM-dd"
                  ),
                });

                dispatch(
                  setQuery({
                    name: filter.name || "",
                    username: filter.username || "",
                    department: filter.department || "",
                    priority: filter.priority || "",
                    confidentiality: filter.confidentiality || "",
                    page: query.page,
                    size: query.size,
                    ...removeNullValues(filter),
                    requestedDate: date ? formatDate(date, "yyyy-MM-dd") : "",
                  })
                );
              }}
            />
            {filter.requestedDate && (
              <CiCircleRemove
                size={"20px"}
                className="absolute right-1 hover:cursor-pointer"
                onClick={() => {
                  setFilter({ ...filter, requestedDate: undefined });
                  getPackageData({ ...filter, requestedDate: undefined });
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
                setFilter({ ...filter, department: undefined });
                getPackageData({ ...filter, department: undefined });
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
                setFilter({ ...filter, priority: undefined });
                getPackageData({ ...filter, priority: undefined });
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
                setFilter({ ...filter, confidentiality: undefined });
                getPackageData({ ...filter, confidentiality: undefined });
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
