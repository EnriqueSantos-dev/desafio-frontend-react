import { create } from "zustand";

type AlertUnauthorizedStore = {
  isAlertUnauthorized: boolean;
  descriptionAlertMessage: string;
  setIsAlertUnauthorized: (isAlertUnauthorized: boolean) => void;
  setDescriptionAlertMessage: (descriptionAlertMessage: string) => void;
};

export const useAlertUnauthorizedStore = create<AlertUnauthorizedStore>(
  (set) => ({
    isAlertUnauthorized: false,
    setIsAlertUnauthorized: (isAlertUnauthorized) =>
      set({ isAlertUnauthorized }),
    descriptionAlertMessage: "",
    setDescriptionAlertMessage: (descriptionAlertMessage) =>
      set({ descriptionAlertMessage }),
  })
);
