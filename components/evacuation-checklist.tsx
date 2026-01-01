"use client"

import { Backpack, Heart, Home, AlertTriangle, CheckCircle2, Circle, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface ChecklistItem {
  id: string
  category: "essential" | "documents" | "supplies" | "planning"
  title: string
  description: string
  completed: boolean
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Essencial
  {
    id: "1",
    category: "essential",
    title: "Documentos importantes",
    description: "CPF, RG, certidão de nascimento, documentação médica",
    completed: false,
  },
  {
    id: "2",
    category: "essential",
    title: "Medicamentos",
    description: "Remédios prescritos e genéricos de emergência",
    completed: false,
  },
  {
    id: "3",
    category: "essential",
    title: "Dinheiro e cartões",
    description: "Dinheiro em espécie, cartão de crédito/débito, extratos",
    completed: false,
  },

  // Documentos
  {
    id: "4",
    category: "documents",
    title: "Documentos de residência",
    description: "Comprovante de endereço, escritura, contrato de aluguel",
    completed: false,
  },
  {
    id: "5",
    category: "documents",
    title: "Fotos de família",
    description: "Fotos em versão digital ou impressa",
    completed: false,
  },
  {
    id: "6",
    category: "documents",
    title: "Registros médicos",
    description: "Histórico médico, alergias, tipo sanguíneo",
    completed: false,
  },

  // Suprimentos
  {
    id: "7",
    category: "supplies",
    title: "Água e alimentos",
    description: "Água (1 litro por pessoa/dia x 3 dias), lanches não perecíveis",
    completed: false,
  },
  {
    id: "8",
    category: "supplies",
    title: "Kit de primeiros socorros",
    description: "Bandagens, desinfetante, gaze, analgésico, antidiarreico",
    completed: false,
  },
  {
    id: "9",
    category: "supplies",
    title: "Iluminação e baterias",
    description: "Lanterna, velas, pilhas, carregador portátil",
    completed: false,
  },
  {
    id: "10",
    category: "supplies",
    title: "Roupas e cobertores",
    description: "Roupas de reserva, cobertores, sacos de dormir",
    completed: false,
  },
  {
    id: "11",
    category: "supplies",
    title: "Ferramentas básicas",
    description: "Faca multiuso, corda, fita adesiva, tesoura",
    completed: false,
  },
  {
    id: "12",
    category: "supplies",
    title: "Higiene pessoal",
    description: "Sabão, papel higiênico, desinfetante para mãos, lenços",
    completed: false,
  },

  // Planejamento
  {
    id: "13",
    category: "planning",
    title: "Plano de reunião",
    description: "Local de encontro definido com a família",
    completed: false,
  },
  {
    id: "14",
    category: "planning",
    title: "Contatos de emergência",
    description: "Lista atualizada de números importantes anotados",
    completed: false,
  },
  {
    id: "15",
    category: "planning",
    title: "Rota de evacuação",
    description: "Saídas alternativas mapeadas de sua casa/local de trabalho",
    completed: false,
  },
  {
    id: "16",
    category: "planning",
    title: "Mochila de emergência",
    description: "Mochila preparada e acessível para evacuação rápida",
    completed: false,
  },
]

const CATEGORIES = {
  essential: { label: "Essencial", icon: Heart, color: "text-destructive" },
  documents: { label: "Documentos", icon: Home, color: "text-primary" },
  supplies: { label: "Suprimentos", icon: Backpack, color: "text-accent" },
  planning: { label: "Planejamento", icon: AlertTriangle, color: "text-chart-2" },
}

export function EvacuationChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(CHECKLIST_ITEMS)
  const { toast } = useToast()

  const toggleItem = (id: string) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const getCompletionPercentage = () => {
    const completed = checklist.filter((item) => item.completed).length
    return Math.round((completed / checklist.length) * 100)
  }

  const getCategoryItems = (category: keyof typeof CATEGORIES) => {
    return checklist.filter((item) => item.category === category)
  }

  const getCategoryCompletion = (category: keyof typeof CATEGORIES) => {
    const items = getCategoryItems(category)
    const completed = items.filter((item) => item.completed).length
    return items.length > 0 ? Math.round((completed / items.length) * 100) : 0
  }

  const downloadChecklist = () => {
    const text = checklist
      .map((item) => `${item.completed ? "[✓]" : "[ ]"} ${item.title} - ${item.description}`)
      .join("\n")

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text))
    element.setAttribute("download", "checklist_evacuacao.txt")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Download realizado",
      description: "Checklist salvo como arquivo de texto",
    })
  }

  const shareChecklist = () => {
    const text = `Meu progresso de preparação para emergência: ${getCompletionPercentage()}%\n\nVerifique o WeatherSOS para mais informações sobre segurança!`
    if (navigator.share) {
      navigator.share({
        title: "WeatherSOS - Checklist de Evacuação",
        text: text,
      })
    } else {
      toast({
        title: "Compartilhamento não suportado",
        description: "Use copiar para compartilhar manualmente",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Section */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Seu Progresso</CardTitle>
          <CardDescription>Prepare-se para emergências seguindo este checklist</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">{getCompletionPercentage()}%</span>
              <span className="text-sm text-muted-foreground">
                {checklist.filter((i) => i.completed).length} de {checklist.length} itens
              </span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((category) => {
              const categoryConfig = CATEGORIES[category]
              const Icon = categoryConfig.icon
              return (
                <div key={category} className="p-3 rounded-lg bg-muted/50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${categoryConfig.color}`} />
                    <span className="text-xs font-semibold text-foreground">{categoryConfig.label}</span>
                  </div>
                  <Progress value={getCategoryCompletion(category)} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{getCategoryCompletion(category)}%</p>
                </div>
              )
            })}
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={downloadChecklist} variant="outline" size="sm" className="flex-1 bg-transparent gap-1">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button onClick={shareChecklist} variant="outline" size="sm" className="flex-1 bg-transparent gap-1">
              <Share2 className="w-4 h-4" />
              Compartilhar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Checklist by Category */}
      {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((category) => {
        const categoryConfig = CATEGORIES[category]
        const Icon = categoryConfig.icon
        const items = getCategoryItems(category)

        return (
          <Card key={category} className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon className={`w-5 h-5 ${categoryConfig.color}`} />
                {categoryConfig.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  onClick={() => toggleItem(item.id)}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-chart-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4
                      className={`text-sm font-medium ${item.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )
      })}

      {/* Emergency Tips */}
      <Card className="bg-accent/10 border-accent/30 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-accent" />
            Dicas de Emergência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground">
          <div className="flex gap-3">
            <span className="text-accent font-bold flex-shrink-0">1.</span>
            <span>Pratique sua rota de evacuação com a família mensalmente</span>
          </div>
          <div className="flex gap-3">
            <span className="text-accent font-bold flex-shrink-0">2.</span>
            <span>Atualize sua mochila de emergência a cada 6 meses</span>
          </div>
          <div className="flex gap-3">
            <span className="text-accent font-bold flex-shrink-0">3.</span>
            <span>Tenha um ponto de encontro definido com sua família</span>
          </div>
          <div className="flex gap-3">
            <span className="text-accent font-bold flex-shrink-0">4.</span>
            <span>Mantenha documentos importantes em local seguro e acessível</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
