"use client"
import { useEffect, useState } from "react"
import { AlertTriangle, Phone, Shield, Bell, Map, Search, Settings, Locate, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { AlertCard } from "@/components/alert-card"
import { QuickActions } from "@/components/quick-actions"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

function SafeStatusBadge({ isSafe, onToggle }: { isSafe: boolean; onToggle: () => void }) {
  return (
    <Button
      onClick={onToggle}
      size="sm"
      className={`rounded-full font-semibold transition-all ${
        isSafe
          ? "bg-accent text-accent-foreground hover:bg-accent/90"
          : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      }`}
    >
      <div className={`w-2 h-2 rounded-full mr-2 ${isSafe ? "bg-white" : "bg-white"} animate-pulse`} />
      {isSafe ? "Estou Seguro" : "Marcar como Seguro"}
    </Button>
  )
}

export default function HomePage() {
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { coordinates, error: geoError } = useGeolocation()
  const { user, signOut, updateUserProfile } = useAuth()
  const router = useRouter()
  const [userLocation, setUserLocation] = useState<string>("Carregando localização...")

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  useEffect(() => {
    if (coordinates) {
      setUserLocation(`${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}`)
    }
  }, [coordinates])

  useEffect(() => {
    fetch("/api/alerts")
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data.alerts || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Erro ao buscar alertas:", err)
        setLoading(false)
      })
  }, [])

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  const handleToggleSafe = async () => {
    if (user) {
      await updateUserProfile({
        isSafe: !user.isSafe,
        lastSafeCheck: new Date().toISOString(),
      })
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-border dark:border-slate-800 bg-card dark:bg-slate-900 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground dark:text-white">WeatherSOS</h1>
                <p className="text-xs text-muted-foreground dark:text-slate-400">Bem-vindo, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SafeStatusBadge isSafe={user.isSafe || false} onToggle={handleToggleSafe} />
              <ThemeToggle />
              <Button variant="ghost" size="sm" className="rounded-lg">
                <Search className="w-4 h-4" />
              </Button>
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="rounded-lg">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg text-destructive"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg bg-transparent dark:bg-slate-800 dark:border-slate-700 flex items-center gap-1"
              >
                <Locate className="w-3 h-3" />
                <span className="text-xs">{userLocation.split(",")[0]}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {user.isSafe && (
          <Card className="bg-accent/10 border-accent/30">
            <CardContent className="p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  ✓ Você marcou-se como seguro em {new Date(user.lastSafeCheck || "").toLocaleTimeString("pt-BR")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Sua família foi notificada automaticamente</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Location Info Card */}
        <Card className="bg-accent/10 border-accent/30">
          <CardContent className="p-4 flex items-start gap-3">
            <Locate className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {geoError ? (
                  <>
                    <span className="text-red-500">Erro na localização:</span> {geoError}
                  </>
                ) : (
                  <>Sua localização está ativa - recebendo alertas personalizados para sua região</>
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Coordenadas: {userLocation}</p>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Alertas Ativos</h2>
              <p className="text-sm text-muted-foreground">Notificações em tempo real de desastres na sua região</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
              <Bell className="w-4 h-4 mr-2" />
              Gerenciar
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Carregando alertas...</div>
          ) : alerts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {alerts.slice(0, 2).map((alert) => (
                <AlertCard
                  key={alert.id}
                  severity={alert.severity}
                  type={alert.title}
                  location={alert.location}
                  time={new Date(alert.timestamp).toLocaleString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "short",
                  })}
                  description={alert.description}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-accent/10 border-accent/30">
              <CardContent className="pt-6">
                <p className="text-center text-sm text-muted-foreground">
                  Nenhum alerta ativo no momento. Sua região está segura!
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Quick Actions */}
        <QuickActions />

        {/* Emergency Resources */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recursos de Emergência</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/map">
              <Card className="hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <Map className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Mapa de Risco</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Visualize mapas interativos com áreas de risco e dados históricos</CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/report">
              <Card className="hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10">
                      <AlertTriangle className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">Reportar Incidente</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Reporte incêndios, deslizamentos ou outros eventos com fotos e localização
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/resources">
              <Card className="hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg">Ajuda e Contatos</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Encontre abrigos, contatos emergenciais e instruções de segurança</CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Safety Tips */}
        <section>
          <Card className="bg-gradient-to-br from-accent/10 to-primary/5 border-accent/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Dica de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span>
                    Mantenha suprimentos de emergência prontos: água, alimentos, lanterna e kit de primeiros socorros
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span>Fique informado através de canais oficiais e alertas meteorológicos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span>Tenha um plano de evacuação e saiba a localização de abrigos próximos</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
