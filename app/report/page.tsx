"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Camera, MapPin, Upload, AlertTriangle, Droplets, Wind, Flame, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { AutoReportAuthority } from "@/components/auto-report-authority"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ReportPage() {
  const [incidentType, setIncidentType] = useState<string>("flood")
  const [description, setDescription] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const { toast } = useToast()

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
          toast({
            title: "Localização capturada",
            description: "Sua localização foi adicionada ao relatório",
          })
        },
        (error) => {
          toast({
            title: "Erro de localização",
            description: "Não foi possível obter sua localização. Digite manualmente.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Localização não suportada",
        description: "Seu navegador não suporta geolocalização.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Parse coordinates from location string
      const coords = location.includes(",")
        ? location.split(",").map((c) => Number.parseFloat(c.trim()))
        : [-23.5505, -46.6333] // Default to São Paulo

      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: incidentType,
          location: location,
          coordinates: { lat: coords[0], lng: coords[1] },
          description: description,
          photos: photoPreview ? [photoPreview] : [],
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Relatório enviado com sucesso",
          description: "Os serviços de emergência foram notificados. Obrigado por reportar.",
        })

        setSubmitSuccess(true)
        setIncidentType("flood")
        setDescription("")
        setLocation("")
        setPhoto(null)
        setPhotoPreview("")
      } else {
        toast({
          title: "Falha no envio",
          description: "Por favor, tente novamente mais tarde.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error submitting incident:", error)
      toast({
        title: "Falha no envio",
        description: "Verifique sua conexão e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const incidentTypes = [
    { value: "flood", label: "Alagamento", icon: Droplets },
    { value: "storm", label: "Tempestade", icon: Wind },
    { value: "fire", label: "Incêndio", icon: Flame },
    { value: "landslide", label: "Deslizamento", icon: Mountain },
  ]

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-border dark:border-slate-800 bg-card dark:bg-slate-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground dark:text-white">Reportar Incidente</h1>
              <p className="text-xs text-muted-foreground dark:text-slate-400">Ajude-nos a responder mais rápido</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {submitSuccess ? (
          <div className="space-y-6">
            <Card className="bg-chart-4/10 border-chart-4/30">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-chart-4/20 mx-auto">
                    <AlertTriangle className="w-8 h-8 text-chart-4" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Relatório Enviado!</h2>
                  <p className="text-muted-foreground">
                    Seu relatório foi recebido e será processado pelas autoridades competentes
                  </p>
                </div>
              </CardContent>
            </Card>

            <AutoReportAuthority
              incidentData={{
                type: incidentTypes.find((t) => t.value === incidentType)?.label || incidentType,
                location: location,
                description: description,
              }}
            />

            <Button onClick={() => setSubmitSuccess(false)} variant="outline" className="w-full bg-transparent">
              Reportar Outro Incidente
            </Button>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Detalhes do Incidente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Incident Type */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-foreground">Tipo de Incidente</Label>
                  <RadioGroup value={incidentType} onValueChange={setIncidentType} className="grid grid-cols-2 gap-3">
                    {incidentTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <div key={type.value}>
                          <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                          <Label
                            htmlFor={type.value}
                            className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-colors"
                          >
                            <Icon className="w-6 h-6" />
                            <span className="text-sm font-medium">{type.label}</span>
                          </Label>
                        </div>
                      )
                    })}
                  </RadioGroup>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-semibold text-foreground">
                    Localização
                  </Label>
                  <div className="flex gap-2">
                    <input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Digite a localização ou use GPS"
                      className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                    <Button type="button" variant="outline" onClick={handleGetLocation}>
                      <MapPin className="w-4 h-4 mr-2" />
                      GPS
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold text-foreground">
                    Descrição
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva o que está vendo... (ex: nível de água, danos, pessoas afetadas)"
                    className="min-h-[120px] resize-none"
                    required
                  />
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-foreground">Foto (Opcional)</Label>
                  {photoPreview ? (
                    <div className="relative">
                      <img
                        src={photoPreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setPhoto(null)
                          setPhotoPreview("")
                        }}
                      >
                        Remover
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                      <Label htmlFor="photo" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <Camera className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Enviar foto</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Clique para procurar ou arraste e solte
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Enviando Relatório...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Enviar Relatório
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Safety Notice */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Segurança em Primeiro Lugar</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Se estiver em perigo imediato, ligue para emergência (193/190) primeiro. Apenas reporte incidentes
                  quando for seguro fazer isso.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Toaster />
    </div>
  )
}
