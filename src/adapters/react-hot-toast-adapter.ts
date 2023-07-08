import { ToastAdapter } from "@/adapters/toast";
import { toast } from "react-hot-toast";

export class ReactHotToastAdapter implements ToastAdapter {
  success(message: string): void {
    toast.success(message);
  }

  error(message: string): void {
    toast.error(message);
  }
}
