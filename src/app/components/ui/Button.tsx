import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary: 
          "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg hover:shadow-emerald-500/25 hover:shadow-xl hover:from-emerald-400 hover:to-cyan-400 border border-emerald-500/20",
        secondary: 
          "bg-gray-800 text-gray-50 border border-gray-700 hover:bg-gray-700 hover:border-gray-600 shadow-md hover:shadow-lg",
        ghost: 
          "text-gray-300 hover:bg-gray-800/50 hover:text-emerald-500 border border-transparent hover:border-gray-700/50",
        outline: 
          "border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500 hover:text-emerald-400",
        destructive: 
          "bg-red-600 text-white hover:bg-red-700 border border-red-500/20 shadow-lg hover:shadow-red-500/25",
        neon: 
          "bg-transparent border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-gray-900 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] font-semibold tracking-wider",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 