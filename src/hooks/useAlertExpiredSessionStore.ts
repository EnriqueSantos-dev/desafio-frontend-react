import { create } from "zustand";

type AlertExpiredSessionStoreState = {
  isExpired: boolean;
  setIsExpired: (state: boolean) => void;
};

export const useAlertExpiredSessionStore =
  create<AlertExpiredSessionStoreState>((set) => ({
    isExpired: false,
    setIsExpired: (state: boolean) => set({ isExpired: state }),
  }));
