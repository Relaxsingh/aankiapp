import type * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  gradientFrom?: string
  gradientTo?: string
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  gradientFrom = "from-blue-500",
  gradientTo = "to-indigo-600",
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} p-1`} />
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          </div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        {trend && (
          <div className="mt-2">
            <span
              className={cn(
                "text-xs font-medium inline-flex items-center",
                trend.isPositive ? "text-green-500" : "text-red-500",
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
