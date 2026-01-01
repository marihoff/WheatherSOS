"use client"
import { MapPin, Clock, Users, Phone, Navigation } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ShelterList() {
  const [shelters, setShelters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/shelters")
      .then((res) => res.json())
      .then((data) => {
        setShelters(data.shelters || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Error fetching shelters:", err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading shelters...</div>
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search shelters by location..."
              className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button variant="outline">
              <Navigation className="w-4 h-4 mr-2" />
              Nearest
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shelter Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {shelters.map((shelter) => (
          <Card key={shelter.id} className={shelter.status === "full" ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-lg text-foreground">{shelter.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {shelter.address}, {shelter.city}
                  </p>
                </div>
                <Badge
                  className={
                    shelter.status === "open" ? "bg-chart-4 text-white" : "bg-destructive text-destructive-foreground"
                  }
                >
                  {shelter.status === "open" ? "OPEN" : "FULL"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">
                      {shelter.available}/{shelter.capacity}
                    </p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Navigation className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{shelter.distance} km</p>
                    <p className="text-xs text-muted-foreground">Distance</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-center gap-4 text-sm pt-2 border-t border-border">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Phone className="w-3 h-3" />
                  <span>{shelter.contact}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>24/7</span>
                </div>
              </div>

              {/* Amenities */}
              {shelter.amenities && shelter.amenities.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {shelter.amenities.map((amenity: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  disabled={shelter.status === "full"}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <MapPin className="w-3 h-3 mr-1" />
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
