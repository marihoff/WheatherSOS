"use client"

import { Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface MapFiltersProps {
  selectedSeverity: string[]
  selectedType: string[]
  radiusKm: number
  dateRange: "today" | "week" | "month"
  onSeverityChange: (severity: string[]) => void
  onTypeChange: (type: string[]) => void
  onRadiusChange: (radius: number) => void
  onDateRangeChange: (range: "today" | "week" | "month") => void
}

export function MapFilters({
  selectedSeverity,
  selectedType,
  radiusKm,
  dateRange,
  onSeverityChange,
  onTypeChange,
  onRadiusChange,
  onDateRangeChange,
}: MapFiltersProps) {
  const severityOptions = ["Baixo", "Médio", "Alto"]
  const typeOptions = ["Alagamento", "Tempestade", "Incêndio", "Deslizamento"]
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleSeverity = (severity: string) => {
    if (selectedSeverity.includes(severity)) {
      onSeverityChange(selectedSeverity.filter((s) => s !== severity))
    } else {
      onSeverityChange([...selectedSeverity, severity])
    }
  }

  const toggleType = (type: string) => {
    if (selectedType.includes(type)) {
      onTypeChange(selectedType.filter((t) => t !== type))
    } else {
      onTypeChange([...selectedType, type])
    }
  }

  return (
    <Card className="shadow-lg w-full">
      <CardContent className="p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center gap-2 font-semibold text-foreground mb-4 hover:text-primary transition-colors"
        >
          <Sliders className="w-4 h-4" />
          Filtros Avançados
          <Badge variant="secondary" className="ml-auto">
            {selectedSeverity.length + selectedType.length}
          </Badge>
        </button>

        {isExpanded && (
          <div className="space-y-4 border-t border-border pt-4">
            {/* Severity Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Severidade</label>
              <div className="flex flex-wrap gap-2">
                {severityOptions.map((severity) => (
                  <Badge
                    key={severity}
                    variant={selectedSeverity.includes(severity) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleSeverity(severity)}
                  >
                    {severity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Incident Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tipo de Desastre</label>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((type) => (
                  <Badge
                    key={type}
                    variant={selectedType.includes(type) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Radius Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Raio de Alerta</label>
                <span className="text-sm font-semibold text-primary">{radiusKm} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={radiusKm}
                onChange={(e) => onRadiusChange(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Período</label>
              <div className="grid grid-cols-3 gap-2">
                {["today", "week", "month"].map((range) => (
                  <Button
                    key={range}
                    variant={dateRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => onDateRangeChange(range as "today" | "week" | "month")}
                    className="text-xs"
                  >
                    {range === "today" ? "Hoje" : range === "week" ? "Esta semana" : "Este mês"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                onSeverityChange([])
                onTypeChange([])
                onRadiusChange(10)
                onDateRangeChange("week")
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
