import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const ProgressContext = React.createContext<{ value?: number | null }>({
  value: null,
});

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressContext.Provider value={{ value }}>
    <ProgressPrimitive.Root
      {...props}
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800",
        className
      )}
    />
  </ProgressContext.Provider>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

const ProgressIndicator = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator>
>(({ className, ...props }, ref) => {
  const { value } = React.useContext(ProgressContext);
  return (
    <ProgressPrimitive.Indicator
      {...props}
      ref={ref}
      className={cn(
        "h-full w-full flex-1 transition-all dark:bg-slate-50",
        className
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  );
});

export { Progress, ProgressIndicator };
