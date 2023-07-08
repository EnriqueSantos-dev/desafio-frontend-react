import { ReactHotToastAdapter } from "@/adapters/react-hot-toast-adapter";
import { ToastAdapter } from "@/adapters/toast";

export const toast = (toastInstance: ToastAdapter): ToastAdapter => {
  return {
    success: (message: string) => toastInstance.success(message),
    error: (message: string) => toastInstance.error(message),
  };
};

export const useToast = () => {
  return toast(new ReactHotToastAdapter());
};
