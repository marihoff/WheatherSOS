"use client"

import { Users, Share2, Trash2, MapPin, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface FamilyMember {
  id: string
  name: string
  phone: string
  status: "safe" | "checking" | "unreachable"
  lastUpdate: string
  location?: string
}

export function FamilySharing() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "Maria Silva",
      phone: "+55 11 98765-4321",
      status: "safe",
      lastUpdate: "Há 5 minutos",
      location: "Casa - São Paulo",
    },
    {
      id: "2",
      name: "João Silva",
      phone: "+55 11 99876-5432",
      status: "checking",
      lastUpdate: "Há 15 minutos",
      location: "Trabalho - Zona Sul",
    },
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMemberName, setNewMemberName] = useState("")
  const [newMemberPhone, setNewMemberPhone] = useState("")
  const { toast } = useToast()

  const addFamilyMember = () => {
    if (!newMemberName || !newMemberPhone) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome e telefone",
        variant: "destructive",
      })
      return
    }

    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: newMemberName,
      phone: newMemberPhone,
      status: "checking",
      lastUpdate: "Agora",
    }

    setFamilyMembers([...familyMembers, newMember])
    setNewMemberName("")
    setNewMemberPhone("")
    setShowAddForm(false)

    toast({
      title: "Membro adicionado",
      description: `${newMemberName} foi adicionado à sua lista de família`,
    })
  }

  const removeFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter((m) => m.id !== id))
    toast({
      title: "Membro removido",
      description: "Contato removido da lista de família",
    })
  }

  const sendCheckIn = () => {
    toast({
      title: "Check-in enviado",
      description: "Seus familiares foram notificados que você está seguro",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-chart-4 text-white"
      case "checking":
        return "bg-chart-2 text-white"
      case "unreachable":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "safe":
        return "Seguro"
      case "checking":
        return "Verificando"
      case "unreachable":
        return "Sem contato"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2 justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Compartilhamento em Família
            </CardTitle>
            <Button size="sm" onClick={sendCheckIn} className="gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Check-in de Segurança
            </Button>
          </div>
          <CardDescription>Compartilhe sua localização e status com familiares</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Family Members List */}
          <div className="space-y-3">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="p-3 rounded-lg border border-border dark:border-slate-700 bg-muted/30 dark:bg-slate-800/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{member.name}</h4>
                      <Badge className={`text-xs ${getStatusColor(member.status)}`}>
                        {getStatusLabel(member.status)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{member.phone}</p>
                    {member.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {member.location}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">Última atualização: {member.lastUpdate}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeFamilyMember(member.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Member Form */}
          {showAddForm ? (
            <div className="p-3 rounded-lg border-2 border-dashed border-border dark:border-slate-700 space-y-3">
              <input
                type="text"
                placeholder="Nome do familiar"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                placeholder="Telefone (+55 11 98765-4321)"
                value={newMemberPhone}
                onChange={(e) => setNewMemberPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-2">
                <Button onClick={addFamilyMember} className="flex-1" size="sm">
                  Adicionar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-transparent"
                  size="sm"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setShowAddForm(true)} variant="outline" className="w-full bg-transparent gap-2">
              <Users className="w-4 h-4" />
              Adicionar Familiar
            </Button>
          )}

          {/* Share Location Feature */}
          <div className="pt-4 border-t border-border dark:border-slate-700">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Compartilhar Localização
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Compartilhe sua localização em tempo real com seus familiares durante emergências.</p>
              <Button className="w-full gap-2 mt-3">
                <MapPin className="w-4 h-4" />
                Compartilhar Minha Localização
              </Button>
            </div>
          </div>

          {/* Emergency Notification */}
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <div className="text-xs text-destructive space-y-1">
              <p className="font-semibold">Alerta de Emergência</p>
              <p>Se selecionar uma situação de emergência, seus familiares serão notificados imediatamente</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Emergency Button */}
      <Button className="w-full h-12 text-lg font-semibold gap-2 bg-destructive hover:bg-destructive/90">
        <AlertCircle className="w-5 h-5" />
        SOS - Notificar Família
      </Button>
    </div>
  )
}
