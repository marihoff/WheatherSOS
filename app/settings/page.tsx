"use client"

import { ArrowLeft, Shield, Bell, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationSettings } from "@/components/notification-settings"
import { FamilySharing } from "@/components/family-sharing"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect } from "react"
import { DocumentUpload } from "@/components/document-upload"

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-border dark:border-slate-800 bg-card dark:bg-slate-900 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="rounded-lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground dark:text-white">Configurações</h1>
              <p className="text-xs text-muted-foreground dark:text-slate-400">Personalize sua conta</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 rounded-lg">
            <TabsTrigger value="notifications" className="rounded-md">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="family" className="rounded-md">
              <Users className="w-4 h-4 mr-2" />
              Família
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-md">
              <Shield className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="family" className="space-y-4">
            <FamilySharing />
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Informações de Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nome</label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="w-full px-3 py-2 rounded-lg border border-input bg-muted text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full px-3 py-2 rounded-lg border border-input bg-muted text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Localização Padrão</label>
                  <input
                    type="text"
                    placeholder="Digite sua localização"
                    defaultValue={user.location}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground"
                  />
                </div>
              </CardContent>
            </Card>

            <DocumentUpload />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
