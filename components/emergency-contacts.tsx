"use client"

import { Phone, Mail, Globe, MessageSquare, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function EmergencyContacts() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [messageText, setMessageText] = useState("")
  const { toast } = useToast()

  const contacts = [
    {
      category: "Serviços de Emergência",
      items: [
        { name: "Bombeiros", number: "193", description: "Incêndios, resgate e hazmat" },
        { name: "Polícia Militar", number: "190", description: "Criminalidade e segurança pública" },
        { name: "Ambulância", number: "192", description: "Emergências médicas" },
        { name: "Defesa Civil", number: "199", description: "Resposta a desastres" },
      ],
    },
    {
      category: "Serviços de Apoio",
      items: [
        { name: "Cruz Vermelha", number: "(11) 3123-4567", description: "Ajuda humanitária" },
        { name: "Linha de Desastres", number: "0800-123-4567", description: "Suporte 24/7" },
        { name: "Crise de Saúde Mental", number: "188", description: "Apoio psicológico" },
      ],
    },
    {
      category: "Utilidades Públicas",
      items: [
        { name: "Companhia de Energia", number: "0800-701-0102", description: "Emergências elétricas" },
        { name: "Companhia de Água", number: "0800-055-0195", description: "Problemas de abastecimento" },
        { name: "Companhia de Gás", number: "0800-011-4040", description: "Vazamento de gás" },
      ],
    },
  ]

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  const sendMessage = () => {
    if (!messageText.trim()) {
      toast({
        title: "Mensagem vazia",
        description: "Digite uma mensagem antes de enviar",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada para as autoridades de emergência",
    })
    setMessageText("")
    setSelectedContact(null)
  }

  return (
    <div className="space-y-6">
      {contacts.map((section) => (
        <div key={section.category} className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">{section.category}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {section.items.map((contact) => (
              <Card
                key={contact.name}
                className={`transition-all cursor-pointer ${
                  selectedContact === contact.name ? "ring-2 ring-primary" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-foreground">{contact.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-lg font-bold text-foreground">{contact.number}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="default" size="sm" className="flex-1" onClick={() => handleCall(contact.number)}>
                      <Phone className="w-3 h-3 mr-2" />
                      Ligar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedContact(selectedContact === contact.name ? null : contact.name)}
                    >
                      <MessageSquare className="w-3 h-3 mr-2" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Chat Modal for Authority Communication */}
      {selectedContact && (
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat com {selectedContact}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedContact(null)}
                className="text-muted-foreground"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 dark:bg-slate-800/50 rounded-lg p-4 h-48 overflow-y-auto mb-4 flex items-end">
              <div className="space-y-2 w-full">
                <div className="flex gap-2">
                  <div className="bg-primary/20 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-foreground">Olá! Como podemos ajudar?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={sendMessage} size="sm" className="gap-1">
                <Send className="w-4 h-4" />
                Enviar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Resources */}
      <Card className="bg-muted/50 dark:bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-base text-foreground flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Recursos Adicionais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a
            href="https://www.defesacivil.sp.gov.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Globe className="w-4 h-4" />
            Site da Defesa Civil de São Paulo
          </a>
          <a
            href="mailto:emergencia@sp.gov.br"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Mail className="w-4 h-4" />
            emergencia@sp.gov.br
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
