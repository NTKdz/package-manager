import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";

export function CustomDialog({
  open,
  onOpenChange,
  title,
  style,
  dialogContent,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  style?: string;
  dialogContent: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className={style}>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-8" >
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
}
