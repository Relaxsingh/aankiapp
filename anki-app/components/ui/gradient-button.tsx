import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  asChild?: boolean
}

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    return (
      <Button
        className={cn(
          "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
GradientButton.displayName = "GradientButton"
