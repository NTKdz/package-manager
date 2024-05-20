import React, { useState } from "react";
import { CustomDialog } from "../custom-dialog/CustomDialog";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RequestPackageDialog() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên
              </Label>
              <Input
                id="name"
                value={name}
                className="col-span-3"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Phòng ban
              </Label>
              <Input
                id="username"
                value={department}
                className="col-span-3"
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Xác nhận</Button>
          </DialogFooter>
        </div>
      }
    />
  );
}
