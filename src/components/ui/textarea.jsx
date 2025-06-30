import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(
  ({ className, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative flex ">
        {Icon && (
          <Icon className="absolute left-4 mt-[22px] text-gray-400" size={20} />
        )}
        <textarea
          className={cn(
            "flex items-center w-full rounded-md border border-input bg-transparent px-14   ",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
