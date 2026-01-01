"use client"

import { Card } from "@/components/ui/card"
import { MapPin, Droplets, Wind, Flame, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

interface MapViewProps {
  selectedLayer: string
}

export function MapView({ selectedLayer }: MapViewProps) {
  const [incidents, setIncidents] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/incidents")
      .then((res) => res.json())
      .then((data) => {
        setIncidents(data.incidents || [])
      })
      .catch((err) => {
        console.error("[v0] Error fetching incidents:", err)
      })
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "flood":
        return <Droplets className="w-4 h-4" />
      case "storm":
        return <Wind className="w-4 h-4" />
      case "fire":
        return <Flame className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-primary text-primary-foreground"
      case "medium":
        return "bg-chart-2 text-white"
      case "low":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const riskZones = incidents.map((incident) => ({
    id: incident.id,
    type: incident.type,
    severity: incident.status === "verified" ? "high" : "medium",
    x: (((incident.coordinates.lng + 46.6333) * 10) % 80) + 10, // Convert lng to x position
    y: (((incident.coordinates.lat + 23.5505) * 10) % 80) + 10, // Convert lat to y position
    name: incident.location,
  }))

  const filteredZones = selectedLayer === "all" ? riskZones : riskZones.filter((zone) => zone.type === selectedLayer)

  return (
    <Card className="relative overflow-hidden">
      {/* Map Background */}
      <div className="relative w-full h-[600px] bg-muted/30">
        {/* Grid overlay for map effect */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, oklch(0.5 0 0) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(0.5 0 0) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Map placeholder with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20" />

        {/* Center marker for São Paulo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <div className="w-12 h-12 rounded-full bg-primary/30" />
            </div>
            <div className="relative w-12 h-12 rounded-full bg-primary/50 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Risk Zone Markers */}
        {filteredZones.map((zone) => (
          <div
            key={zone.id}
            className="absolute group cursor-pointer"
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Pulsing circle */}
            <div className="absolute inset-0 animate-pulse">
              <div className={`w-16 h-16 rounded-full ${getSeverityColor(zone.severity)} opacity-20`} />
            </div>

            {/* Marker */}
            <div
              className={`relative w-10 h-10 rounded-full ${getSeverityColor(zone.severity)} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}
            >
              {getIcon(zone.type)}
            </div>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-card border border-border rounded-lg shadow-lg p-2 whitespace-nowrap">
                <p className="text-xs font-medium text-foreground">{zone.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {zone.type} - {zone.severity}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Map Label */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
          <p className="text-sm font-medium text-foreground">São Paulo Metropolitan Area</p>
          <p className="text-xs text-muted-foreground">Real-time risk zones</p>
        </div>
      </div>
    </Card>
  )
}
