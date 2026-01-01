import { AlertTriangle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface AlertCardProps {
  severity: "high" | "medium" | "low"
  type: string
  location: string
  time: string
  description: string
}

export function AlertCard({ severity, type, location, time, description }: AlertCardProps) {
  const severityConfig = {
    high: {
      badge: "bg-destructive text-destructive-foreground",
      border: "border-l-4 border-destructive",
      icon: "text-destructive",
      label: "ALTO",
    },
    medium: {
      badge: "bg-chart-2 text-white",
      border: "border-l-4 border-chart-2",
      icon: "text-chart-2",
      label: "MÉDIO",
    },
    low: {
      badge: "bg-accent text-accent-foreground",
      border: "border-l-4 border-accent",
      icon: "text-accent",
      label: "BAIXO",
    },
  }

  const config = severityConfig[severity]

  return (
    <Card className={cn("shadow-md hover:shadow-lg transition-shadow", config.border)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <AlertTriangle className={cn("w-5 h-5 mt-0.5 flex-shrink-0", config.icon)} />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground">{type}</h3>
                <Badge className={cn("text-xs font-semibold", config.badge)}>{config.label}</Badge>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-foreground leading-relaxed">{description}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {time}
        </div>
      </CardContent>
    </Card>
  )
}

function MapPin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
