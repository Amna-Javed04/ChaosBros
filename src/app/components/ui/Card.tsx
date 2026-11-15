import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  "rounded-lg border transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: 
          "bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-900/70 backdrop-blur-sm",
        elevated: 
          "bg-gray-900 border-gray-700 shadow-lg hover:shadow-xl hover:shadow-gray-900/20 hover:border-gray-600",
        neon: 
          "bg-gray-900/30 border-emerald-500/30 hover:border-emerald-500/60 hover:bg-gray-900/50 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]",
        glass: 
          "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md",
        team: 
          "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:from-gray-800 hover:to-gray-700 hover:border-emerald-500/30 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10",
      },
      hover: {
        none: "",
        lift: "hover:transform hover:-translate-y-1",
        scale: "hover:scale-105",
        glow: "hover:shadow-2xl hover:shadow-emerald-500/20",
        rotate: "hover:rotate-1",
      },
      padding: {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "lift",
      padding: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, hover, padding, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  cardVariants 
}; 