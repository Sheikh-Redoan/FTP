import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-4 text-gray-400" size={20} />}
        <input
          type={type}
          className={cn(
            "flex py-[16px] px-[22px] items-center gap-2 flex-1 rounded-md bg-white outline-[#010693] pl-[50px]", // Adjust padding for icon
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
