"use client"

import { Bell, BellOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { Badge } from "@/components/ui/badge"
import { useNotifications } from "@/hooks/use-notifications"
import { useState } from "react"

export function NotificationSettings() {
  const { permission, requestPermission, isGranted } = useNotifications()
  const [notificationTypes, setNotificationTypes] = useState({
    highSeverity: true,
    mediumSeverity: true,
    nearby: true,
    reportUpdates: true,
  })

  const handleTypeChange = (key: keyof typeof notificationTypes) => {
    setNotificationTypes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2 justify-between">
          <CardTitle className="flex items-center gap-2">
            {isGranted ? (
              <Bell className="w-5 h-5 text-accent" />
            ) : (
              <BellOff className="w-5 h-5 text-muted-foreground" />
            )}
            Notificações Push
          </CardTitle>
          <Badge variant={isGranted ? "default" : "outline"}>{isGranted ? "Ativas" : "Inativas"}</Badge>
        </div>
        <CardDescription>Receba alertas em tempo real de desastres próximos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isGranted && (
          <Button onClick={requestPermission} className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            Ativar Notificações
          </Button>
        )}

        {isGranted && (
          <>
            <div className="space-y-3 border-t border-border pt-4">
              <div className="text-sm font-medium text-foreground">Tipos de alerta:</div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <label className="text-sm font-medium text-foreground cursor-pointer">
                    Alertas de Alta Severidade
                  </label>
                  <Toggle
                    pressed={notificationTypes.highSeverity}
                    onPressedChange={() => handleTypeChange("highSeverity")}
                  />
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <label className="text-sm font-medium text-foreground cursor-pointer">Alertas Médios</label>
                  <Toggle
                    pressed={notificationTypes.mediumSeverity}
                    onPressedChange={() => handleTypeChange("mediumSeverity")}
                  />
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <label className="text-sm font-medium text-foreground cursor-pointer">Eventos Próximos (5 km)</label>
                  <Toggle pressed={notificationTypes.nearby} onPressedChange={() => handleTypeChange("nearby")} />
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <label className="text-sm font-medium text-foreground cursor-pointer">
                    Atualizações de Relatórios
                  </label>
                  <Toggle
                    pressed={notificationTypes.reportUpdates}
                    onPressedChange={() => handleTypeChange("reportUpdates")}
                  />
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Desativar Notificações
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
