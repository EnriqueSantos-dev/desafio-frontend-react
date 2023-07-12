import { create } from "zustand";

type DeleteAccountState = {
  isDeleteAccountModalOpen: boolean;
  setIsDeleteAccountModalOpen: (value: boolean) => void;
};

export const useAlertDeleteAccountStore = create<DeleteAccountState>((set) => ({
  isDeleteAccountModalOpen: false,
  setIsDeleteAccountModalOpen: (value) =>
    set({ isDeleteAccountModalOpen: value }),
}));
