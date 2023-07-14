import { useEffect } from "react";
import { AlertCircle, Loader } from "lucide-react";

import { Button } from "@/components/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/shared/ui/dialog";

import { useAlertDeleteAccountStore } from "@/hooks/useAlertDeleteAccountStore";
import { useDeleteUserAccount } from "@/hooks/useDeleteUserAccount";
import { useToast } from "@/hooks/useToast";

export function AlertDeleteAccount() {
  const mutation = useDeleteUserAccount();
  const { success, error } = useToast();
  const { isDeleteAccountModalOpen, setIsDeleteAccountModalOpen } =
    useAlertDeleteAccountStore();

  useEffect(() => {
    if (mutation.isSuccess) {
      setIsDeleteAccountModalOpen(false);
      success("Account deleted successfully");
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess, setIsDeleteAccountModalOpen]);

  useEffect(() => {
    if (mutation.isError) {
      setIsDeleteAccountModalOpen(false);
      error(mutation.error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.error, mutation.isError]);

  return (
    <Dialog
      open={isDeleteAccountModalOpen}
      onOpenChange={() =>
        setIsDeleteAccountModalOpen(!isDeleteAccountModalOpen)
      }
    >
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle className="flex items-center justify-center space-x-3">
            <AlertCircle size={24} className="mb-px text-red-500" />
            <span>Delete Account</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete your account? This action is
            irreversible.
          </DialogDescription>
        </DialogHeader>

        <div className="mx-auto mt-4 flex justify-center gap-4">
          <Button
            variant="green"
            size="md"
            className="w-24"
            disabled={mutation.isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="red"
            size="md"
            className="w-24 text-white"
            disabled={mutation.isLoading}
            onClick={() => mutation.mutate({})}
          >
            {mutation.isLoading ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
