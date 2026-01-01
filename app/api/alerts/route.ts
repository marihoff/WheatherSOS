import { NextResponse } from "next/server"

// Mock alerts database
const alerts = [
  {
    id: "1",
    type: "flood",
    severity: "high",
    title: "Alerta de Enchente",
    description: "Risco elevado de enchentes nas próximas 6 horas",
    location: "São Paulo - Zona Sul",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    active: true,
  },
  {
    id: "2",
    type: "storm",
    severity: "medium",
    title: "Tempestade Severa",
    description: "Ventos fortes e chuva intensa esperados",
    location: "Rio de Janeiro - Centro",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    active: true,
  },
  {
    id: "3",
    type: "heat",
    severity: "low",
    title: "Onda de Calor",
    description: "Temperaturas acima de 35°C previstas",
    location: "Brasília - DF",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    active: true,
  },
]

export async function GET() {
  return NextResponse.json({ alerts: alerts.filter((a) => a.active) })
}
