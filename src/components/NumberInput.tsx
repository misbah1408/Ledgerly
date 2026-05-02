import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NumberInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        {...props}
        ref={ref}
        type="number"
        className={cn("no-spinner", className)}
        onWheel={(e) => {
          e.currentTarget.blur();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
          }
          props.onKeyDown?.(e);
        }}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";
