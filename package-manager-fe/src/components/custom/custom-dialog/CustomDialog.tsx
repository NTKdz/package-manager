import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";

export function CustomDialog({
  title,
  style,
  dialogContent,
}: {
  title: string;
  style?: string;
  dialogContent: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className={style}>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
}
