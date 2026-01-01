"use client"

import { Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface AutoReportProps {
  incidentData?: {
    type: string
    location: string
    description: string
  }
}

export function AutoReportAuthority({ incidentData }: AutoReportProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmitToAuthority = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call to authority system
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Send to simulated authority endpoint
      const response = await fetch("/api/authority-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incident: incidentData,
          timestamp: new Date().toISOString(),
          priority: "high",
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        toast({
          title: "Relatório enviado com sucesso!",
          description: "As autoridades competentes foram notificadas sobre o incidente",
        })
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar relatório",
        description: "Tente novamente em alguns momentos",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Relatório para Autoridades
        </CardTitle>
        <CardDescription>Envie seu relatório automaticamente para órgãos de emergência</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {submitted ? (
          <div className="p-4 rounded-lg bg-chart-4/10 border border-chart-4/30 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-chart-4" />
              <span className="font-semibold text-foreground">Relatório enviado</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Seu relatório foi enviado para: Defesa Civil, Bombeiros e Polícia Militar
            </p>
            <div className="flex gap-2 pt-2">
              <Badge className="bg-chart-4 text-white">Bombeiros (193)</Badge>
              <Badge className="bg-primary text-primary-foreground">Defesa Civil (199)</Badge>
              <Badge className="bg-secondary text-secondary-foreground">Polícia (190)</Badge>
            </div>
          </div>
        ) : (
          <>
            {incidentData && (
              <div className="p-4 rounded-lg bg-muted/50 dark:bg-slate-800/50 space-y-2">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground">TIPO DE INCIDENTE</p>
                  <p className="text-sm font-medium text-foreground">{incidentData.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground">LOCALIZAÇÃO</p>
                  <p className="text-sm font-medium text-foreground">{incidentData.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground">DESCRIÇÃO</p>
                  <p className="text-sm text-foreground">{incidentData.description}</p>
                </div>
              </div>
            )}

            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
              <p className="text-xs text-destructive">
                <span className="font-semibold">Aviso:</span> Enviar um relatório falso às autoridades é crime. Apenas
                reporte incidentes reais.
              </p>
            </div>

            <Button
              onClick={handleSubmitToAuthority}
              disabled={isSubmitting}
              className="w-full bg-destructive hover:bg-destructive/90 gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar para Autoridades
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
