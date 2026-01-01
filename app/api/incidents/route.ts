import { NextResponse } from "next/server"

// Mock database in memory
const incidents: Array<{
  id: string
  type: string
  location: string
  coordinates: { lat: number; lng: number }
  description: string
  photos: string[]
  timestamp: string
  status: "pending" | "verified" | "resolved"
}> = [
  {
    id: "1",
    type: "flood",
    location: "Centro, São Paulo",
    coordinates: { lat: -23.5505, lng: -46.6333 },
    description: "Alagamento na Avenida Paulista",
    photos: [],
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: "verified",
  },
  {
    id: "2",
    type: "landslide",
    location: "Zona Norte, Rio de Janeiro",
    coordinates: { lat: -22.9068, lng: -43.1729 },
    description: "Deslizamento de terra após chuvas fortes",
    photos: [],
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: "pending",
  },
]

export async function GET() {
  return NextResponse.json({ incidents })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const newIncident = {
      id: Date.now().toString(),
      type: body.type,
      location: body.location,
      coordinates: body.coordinates,
      description: body.description,
      photos: body.photos || [],
      timestamp: new Date().toISOString(),
      status: "pending" as const,
    }

    incidents.unshift(newIncident)

    return NextResponse.json({
      success: true,
      incident: newIncident,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create incident" }, { status: 500 })
  }
}
