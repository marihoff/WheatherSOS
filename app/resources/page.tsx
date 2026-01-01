"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { EmergencyContacts } from "@/components/emergency-contacts"
import { ShelterList } from "@/components/shelter-list"
import { SafetyGuide } from "@/components/safety-guide"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="rounded-lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Recursos de Emergência</h1>
              <p className="text-xs text-muted-foreground">Ajuda e informações de suporte</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="shelters" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 rounded-lg">
            <TabsTrigger value="shelters" className="rounded-md">
              Abrigos
            </TabsTrigger>
            <TabsTrigger value="contacts" className="rounded-md">
              Contatos
            </TabsTrigger>
            <TabsTrigger value="safety" className="rounded-md">
              Segurança
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shelters" className="space-y-4">
            <ShelterList />
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <EmergencyContacts />
          </TabsContent>

          <TabsContent value="safety" className="space-y-4">
            <SafetyGuide />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
