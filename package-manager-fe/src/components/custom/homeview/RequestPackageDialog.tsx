import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RequestWaybillInterface } from "@/interface/packageInterface";
import TableService from "@/services/TableService";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { CustomDialog } from "../custom-dialog/CustomDialog";
import { CustomDropdownMenu } from "../custom-dropdown-menu/CustomDropdownMenu";

const column = [
  "Tên đăng nhập",
  "Tên người gửi",
  "Phòng ban",
  "Công ty",
  "Cpn",
  "Độ khẩn",
  "Độ mật",
];

export default function RequestPackageDialog() {
  const [user, setUser] = useState("os.khoint");
  const [userFullName, setUserFullName] = useState("nguyen the khoi");
  const [department, setDepartment] = useState("");
  const [company, setCompany] = useState("");
  const [priority, setPriority] = useState("NORMAL");
  const [confidentiality, setConfidentiality] = useState("NORMAL");
  const [cpn, setCpn] = useState("");

  const { requestWaybill } = TableService();

  function standardizeName(name: string) {
    switch (name) {
      case "Tên đăng nhập":
        return userFullName;
      case "Tên người gửi":
        return user;
      case "Phòng ban":
        return department;
      case "Công ty":
        return company;
      case "Cpn":
        return cpn;
      case "Độ khẩn":
        return priority;
      case "Độ mật":
        return confidentiality;
    }
    return user;
  }

  function standardizeSetName(name: string, value: string) {
    switch (name) {
      case "Tên đăng nhập":
        return setUser(value);
      case "Tên người gửi":
        return setUserFullName(value);
      case "Phòng ban":
        return setDepartment(value);
      case "Công ty":
        return setCompany(value);
      case "Cpn":
        return setCpn(value);
      case "Độ khẩn":
        return setPriority(value);
      case "Độ mật":
        return setConfidentiality(value);
    }
    return setUser(value);
  }

  function handleReturnComponent(col: string) {
    switch (col) {
      case "Cpn":
        return (
          <CustomDropdownMenu
            title="Cpn"
            value={standardizeName(col)}
            menuItem={[{ title: "khoi", value: "khoi" }]}
            onItemSelected={(value) => setCpn(value)}
          />
        );
      case "Độ khẩn":
        return (
          <CustomDropdownMenu
            title="Cpn"
            value={standardizeName(col)}
            menuItem={[{ title: "khoi", value: "khoi" }]}
            onItemSelected={(value) => setPriority(value)}
          />
        );
      case "Độ mật":
        return (
          <CustomDropdownMenu
            title="Cpn"
            value={standardizeName(col)}
            menuItem={[{ title: "khoi", value: "khoi" }]}
            onItemSelected={(value) => setConfidentiality(value)}
          />
        );
      default:
        return (
          <Input
            id="name"
            value={standardizeName(col)}
            className="col-span-3"
            onChange={(e) => {
              standardizeSetName(col, e.target.value);
            }}
            disabled={col === "Tên đăng nhập" || col === "Tên người gửi"}
          />
        );
    }
  }

  function handleSubmit() {
    const requestedDate= new Date();
    console.log({
      user,
      userFullName,
      requestedDate,
      department,
      company,
      cpn,
      priority,
      confidentiality,
    })
    const data:RequestWaybillInterface={
      user,
      userFullName,
      requestedDate,
      department,
      company,
      cpn,
      priority,
      confidentiality,
    }
    requestWaybill(data)
  }
  return (
    <CustomDialog
      title="Yêu cầu mã"
      style="mb-2"
      dialogContent={
        <div>
          <DialogHeader>
            <DialogTitle>Đơn xin mã vận đơn</DialogTitle>
            <DialogDescription>Điền đầy đủ thông tin.</DialogDescription>
          </DialogHeader>
          <form>
            {column.slice(0, 4).map((col) => {
              return (
                <div key={col} className="mt-2">
                  <div className="mb-1">
                    <Label htmlFor="name">{col}</Label>
                  </div>
                  {handleReturnComponent(col)}
                </div>
              );
            })}
          </form>
          <div className="flex gap-2">
            {column.slice(4).map((col) => {
              return (
                <div key={col} className="mt-2 flex-1">
                  <div className="mb-1">
                    <Label htmlFor="name">{col}</Label>
                  </div>
                  <div className="w-full"> {handleReturnComponent(col)}</div>
                </div>
              );
            })}
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" className="bg-destructive">
              Hủy
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Xác nhận
            </Button>
          </DialogFooter>
        </div>
      }
    />
  );
}
