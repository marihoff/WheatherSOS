"use client"

import { useState } from "react"
import { ArrowLeft, Layers, MapPin, AlertTriangle, Droplets, Wind, Flame, ThermometerSun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MapView } from "@/components/map-view"
import { RiskLegend } from "@/components/risk-legend"
import { MapFilters } from "@/components/map-filters"
import { ThemeToggle } from "@/components/theme-toggle"

export default function MapPage() {
  const [selectedLayer, setSelectedLayer] = useState<string>("all")
  const [selectedSeverity, setSelectedSeverity] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [radiusKm, setRadiusKm] = useState<number>(10)
  const [dateRange, setDateRange] = useState<"today" | "week" | "month">("week")

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-border dark:border-slate-800 bg-card dark:bg-slate-900 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="rounded-lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground dark:text-white">Mapa de Risco</h1>
                <p className="text-xs text-muted-foreground dark:text-slate-400">Zonas de desastres interativas</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                <MapPin className="w-4 h-4 mr-2" />
                São Paulo, BR
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          {/* Map Section */}
          <div className="space-y-4">
            {/* Filters */}
            <MapFilters
              selectedSeverity={selectedSeverity}
              selectedType={selectedType}
              radiusKm={radiusKm}
              dateRange={dateRange}
              onSeverityChange={setSelectedSeverity}
              onTypeChange={setSelectedType}
              onRadiusChange={setRadiusKm}
              onDateRangeChange={setDateRange}
            />

            {/* Layer Controls */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">Camadas do Mapa</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedLayer === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLayer("all")}
                    className="rounded-lg"
                  >
                    Todos os Riscos
                  </Button>
                  <Button
                    variant={selectedLayer === "flood" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLayer("flood")}
                    className="rounded-lg"
                  >
                    <Droplets className="w-3 h-3 mr-1" />
                    Alagamentos
                  </Button>
                  <Button
                    variant={selectedLayer === "storm" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLayer("storm")}
                    className="rounded-lg"
                  >
                    <Wind className="w-3 h-3 mr-1" />
                    Tempestades
                  </Button>
                  <Button
                    variant={selectedLayer === "fire" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLayer("fire")}
                    className="rounded-lg"
                  >
                    <Flame className="w-3 h-3 mr-1" />
                    Incêndios
                  </Button>
                  <Button
                    variant={selectedLayer === "heat" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLayer("heat")}
                    className="rounded-lg"
                  >
                    <ThermometerSun className="w-3 h-3 mr-1" />
                    Onda de Calor
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map Display */}
            <MapView selectedLayer={selectedLayer} />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Risk Legend */}
            <RiskLegend />

            {/* Active Incidents */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  Incidentes Ativos
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50 dark:bg-slate-800 space-y-1 border border-border dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Alagamento no Centro</span>
                      <Badge className="bg-destructive text-destructive-foreground text-xs">ALTO</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">Centro, São Paulo</p>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">há 15 minutos</p>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 dark:bg-slate-800 space-y-1 border border-border dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Alerta de Tempestade</span>
                      <Badge className="bg-chart-2 text-white text-xs">MÉDIO</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">Zona Norte</p>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">há 1 hora</p>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 dark:bg-slate-800 space-y-1 border border-border dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Risco de Deslizamento</span>
                      <Badge className="bg-accent text-accent-foreground text-xs">BAIXO</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">Zona Sul</p>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">há 3 horas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Historical Data */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Dados Históricos</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alagamentos (2024)</span>
                    <span className="font-semibold text-foreground">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tempestades (2024)</span>
                    <span className="font-semibold text-foreground">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deslizamentos (2024)</span>
                    <span className="font-semibold text-foreground">34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Incêndios (2024)</span>
                    <span className="font-semibold text-foreground">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
