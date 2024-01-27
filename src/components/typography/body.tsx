import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const bodyVariants = cva("font-jakata", {
  variants: {
    variant: {
      bold: "font-semibold",
      medium: "font-medium",
      regular: "font-normal",
    },
    size: {
      xl: "text-md",
      lg: "text-base",
      md: "text-sm",
      sm: "text-xs",
      xs: "text-xxs",
    },
  },
});

export const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof bodyVariants> & {}
>(({ className, variant = "regular", size = "lg", ...props }, ref) => (
  <p
    {...props}
    ref={ref}
    className={cn(bodyVariants({ variant, size }), className)}
  />
));
P.displayName = "P";
