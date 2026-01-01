"use client"

import { useEffect, useState } from "react"

interface GeolocationCoordinates {
  latitude: number
  longitude: number
  accuracy: number
}

interface UseGeolocationReturn {
  coordinates: GeolocationCoordinates | null
  error: string | null
  loading: boolean
  requestLocation: () => void
}

export function useGeolocation(): UseGeolocationReturn {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocalização não suportada pelo seu navegador")
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        })
        setError(null)
        setLoading(false)
      },
      (err) => {
        setError(err.message || "Não foi possível obter sua localização")
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  }

  // Auto-request location on mount
  useEffect(() => {
    requestLocation()
  }, [])

  return { coordinates, error, loading, requestLocation }
}
