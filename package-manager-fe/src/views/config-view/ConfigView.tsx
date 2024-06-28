import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserService from "@/services/UserService";
import React from "react";
import { GrConfigure } from "react-icons/gr";
import LoginSetup from "./LoginSetup";
export default function ConfigView({
  isMinimized,
  defaultOpen = false,
  disableTrigger = false,
}: {
  isMinimized?: boolean;
  defaultOpen?: boolean;
  disableTrigger?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [value, setValue] = React.useState("");
  const [clear, setClear] = React.useState(false);
  const { updateUser } = UserService();
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {!disableTrigger && (
          <DialogTrigger asChild className={""}>
            <div
              className={`w-full h-10 text-white
             font-bold rounded-sm flex gap-2 items-center ${
               !isMinimized && "pl-2"
             } mb-2 hover:cursor-pointer hover:opacity-90 hover:bg-primary-foreground hover:text-primary ${
                isMinimized && "justify-center"
              } transition-all`}
            >
              <GrConfigure />
              {!isMinimized && "Cài đặt"}
            </div>
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-[600px] p-8">
          <LoginSetup onChange={setValue} clear={clear} setClear={setClear} />
          {!disableTrigger &&
            !clear &&
            value !== "" &&
            value !== localStorage.getItem("department") && (
              <div className="flex justify-end">
                <Button
                  className="mr-2"
                  variant={"destructive"}
                  onClick={() => {
                    setClear(true);
                    setValue("");
                  }}
                >
                  Hủy bỏ
                </Button>
                <Button
                  onClick={() => {
                    updateUser(
                      localStorage?.getItem("username") || "",
                      value
                    ).then((res) => {
                      if (res && res.status === 200) setOpen(false);
                    });
                  }}
                >
                  Xác nhận
                </Button>
              </div>
            )}
          {disableTrigger ? (
            <Button
              onClick={() => {
                updateUser(localStorage?.getItem("username") || "", value).then(
                  (res) => {
                    if (res && res.status === 200) setOpen(false);
                  }
                );
              }}
            >
              Xác nhận
            </Button>
          ) : (
            <div>
              <div className="text-lg font-bold">Đăng xuất tài khoản</div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" variant={"destructive"}>
                    Đăng xuất
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có muốn đăng xuất?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Hành động này sẽ đăng xuất bạn khỏi tài khoản hiện tại
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        const idToken = localStorage.getItem("id_token");
                        const urlLogout =
                          "?id_token_hint=" +
                          idToken +
                          "&post_logout_redirect_uri=" +
                          encodeURIComponent("http://localhost:5173/");
                        localStorage.clear();
                        sessionStorage.clear();
                        window.location.replace(
                          "http://localhost:8081/realms/package/protocol/openid-connect/logout" +
                            urlLogout
                        );
                        setOpen(false);
                      }}
                    >
                      Xác nhận
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
