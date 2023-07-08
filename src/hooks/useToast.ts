import { useMemo } from "react";

import { ReactHotToastAdapter } from "@/adapters/react-hot-toast-adapter";
import { ToastAdapter } from "@/adapters/toast";

export const useToastAbstraction = (
  toastInstance: ToastAdapter
): ToastAdapter => {
  return useMemo(
    () => ({
      success: (message: string) => toastInstance.success(message),
      error: (message: string) => toastInstance.error(message),
    }),
    [toastInstance]
  );
};

export const useToast = () => {
  return useToastAbstraction(new ReactHotToastAdapter());
};
