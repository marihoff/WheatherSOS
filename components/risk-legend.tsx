import { Card, CardContent } from "@/components/ui/card"

export function RiskLegend() {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Risk Levels</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">High Risk</p>
              <p className="text-xs text-muted-foreground">Immediate danger</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-chart-2" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Medium Risk</p>
              <p className="text-xs text-muted-foreground">Monitor closely</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-accent" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Low Risk</p>
              <p className="text-xs text-muted-foreground">Stay informed</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
