import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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

const column = ["Tên đăng nhập", "Tên người gửi", "Độ khẩn", "Độ mật"];

export default function RequestPackageDialog() {
  const [user, setUser] = useState(localStorage.getItem("username") || "");
  const [userFullName, setUserFullName] = useState(
    localStorage.getItem("displayName") || ""
  );
  const [department, setDepartment] = useState("");
  const [company, setCompany] = useState("");
  const [priority, setPriority] = useState("");
  const [confidentiality, setConfidentiality] = useState("");
  const [cpn, setCpn] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { requestWaybill } = TableService();

  function standardizeName(name: string) {
    switch (name) {
      case "Tên đăng nhập":
        return user;
      case "Tên người gửi":
        return userFullName;
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
      case "Độ khẩn":
        return (
          <CustomDropdownMenu
            title="Đo khẩn"
            value={standardizeName(col)}
            menuItem={[
              { title: "Bình thường", value: "BINH_THUONG" },
              { title: "Hỏa tốc", value: "HOA_TOC" },
              { title: "Khẩn", value: "KHAN" },
              { title: "Thượng khẩn", value: "THUONG_KHAN" },
            ]}
            onItemSelected={(value) => setPriority(value)}
          />
        );
      case "Độ mật":
        return (
          <CustomDropdownMenu
            title="Cpn"
            value={standardizeName(col)}
            menuItem={[
              { title: "Bình thường", value: "BINH_THUONG" },
              { title: "Mật", value: "MAT" },
            ]}
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
    const requestedDate = new Date();
    requestedDate.setHours(requestedDate.getHours() + 7);
    
    const data: RequestWaybillInterface = {
      user,
      userFullName,
      requestedDate,
      priority,
      confidentiality,
    };
    requestWaybill(data).then((res) => {
      setAlertOpen(true);
      setDialogOpen(false);
      setAlertContent(res.waybill);
    });
  }

  return (
    <div>
      <CustomDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Yêu cầu mã"
        style="mb-2"
        dialogContent={
          <div>
            <DialogHeader>
              <DialogTitle>Đơn xin mã vận đơn</DialogTitle>
              <DialogDescription>Điền đầy đủ thông tin.</DialogDescription>
            </DialogHeader>
            <form>
              {column.slice(0, 2).map((col) => {
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
              {column.slice(2).map((col) => {
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
              <Button
                type="submit"
                className="bg-destructive"
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Hủy
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                Xác nhận
              </Button>
            </DialogFooter>
          </div>
        }
      />

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex justify-center ">Mã vận đơn của bạn</div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span className="flex justify-center items-center font-bold text-6xl mt-4 mb-4">
                {alertContent}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
