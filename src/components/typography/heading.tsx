import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const headingVariants = cva("font-jakata font-semibold", {
  variants: {
    variant: {
      h1: "text-6xl",
      h2: "text-5xl",
      h3: "text-4xl",
      h4: "text-2xl",
      h5: "text-xl",
    },
  },
});

export const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof headingVariants> & {}
>(({ className, variant = "h1", ...props }, ref) => (
  <h1
    {...props}
    ref={ref}
    className={cn(headingVariants({ variant }), className)}
  />
));
H1.displayName = "H1";

export const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof headingVariants> & {}
>(({ className, variant = "h2", ...props }, ref) => (
  <h2
    {...props}
    ref={ref}
    className={cn(headingVariants({ variant }), className)}
  />
));
H2.displayName = "H2";

export const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof headingVariants> & {}
>(({ className, variant = "h3", ...props }, ref) => (
  <h3
    {...props}
    ref={ref}
    className={cn(headingVariants({ variant }), className)}
  />
));
H3.displayName = "H3";

export const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof headingVariants> & {}
>(({ className, variant = "h4", ...props }, ref) => (
  <h4
    {...props}
    ref={ref}
    className={cn(headingVariants({ variant }), className)}
  />
));
H4.displayName = "H4";

export const H5 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof headingVariants> & {}
>(({ className, variant = "h5", ...props }, ref) => (
  <h5
    {...props}
    ref={ref}
    className={cn(headingVariants({ variant }), className)}
  />
));
H5.displayName = "H5";
