import React from "react";
import { Toaster } from "sonner-native";

type ToastProviderProps = {
  children: React.ReactNode;
};

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster position="bottom-center" duration={10000} />
    </>
  );
};

export default ToastProvider;
