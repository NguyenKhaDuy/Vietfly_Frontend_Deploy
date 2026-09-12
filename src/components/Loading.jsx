import React from "react";
import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle className="h-12 w-12 animate-spin text-cyan-500" />

        <p className="text-sm font-medium text-white">Đang tải...</p>
      </div>
    </div>
  );
};

export default Loading;
