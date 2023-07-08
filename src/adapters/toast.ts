export interface ToastAdapter {
  success(message: string): void;
  error(message: string): void;
}
