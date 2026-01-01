"use client"

import { Phone, MapPin, AlertCircle, Info, Backpack } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function QuickActions() {
  const handleEmergencyCall = () => {
    window.location.href = "tel:193"
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-6">Ações Rápidas</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Button
          variant="outline"
          className="h-auto py-4 flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-all shadow-sm hover:shadow-md rounded-xl border-2 bg-transparent dark:bg-slate-800"
          onClick={handleEmergencyCall}
        >
          <Phone className="w-6 h-6" />
          <span className="text-sm font-semibold">Emergência</span>
          <span className="text-xs opacity-70">193 / 190</span>
        </Button>

        <Link href="/resources" className="block">
          <Button
            variant="outline"
            className="w-full h-auto py-4 flex-col gap-2 hover:bg-accent hover:text-accent-foreground transition-all shadow-sm hover:shadow-md rounded-xl border-2 bg-transparent dark:bg-slate-800"
          >
            <MapPin className="w-6 h-6" />
            <span className="text-sm font-semibold">Abrigos</span>
            <span className="text-xs opacity-70">Localizações</span>
          </Button>
        </Link>

        <Link href="/report" className="block">
          <Button
            variant="outline"
            className="w-full h-auto py-4 flex-col gap-2 hover:bg-secondary hover:text-secondary-foreground transition-all shadow-sm hover:shadow-md rounded-xl border-2 bg-transparent dark:bg-slate-800"
          >
            <AlertCircle className="w-6 h-6" />
            <span className="text-sm font-semibold">Reportar</span>
            <span className="text-xs opacity-70">Incidente</span>
          </Button>
        </Link>

        <Link href="/resources" className="block">
          <Button
            variant="outline"
            className="w-full h-auto py-4 flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-all shadow-sm hover:shadow-md rounded-xl border-2 bg-transparent dark:bg-slate-800"
          >
            <Info className="w-6 h-6" />
            <span className="text-sm font-semibold">Segurança</span>
            <span className="text-xs opacity-70">Instruções</span>
          </Button>
        </Link>

        <Link href="/evacuation" className="block">
          <Button
            variant="outline"
            className="w-full h-auto py-4 flex-col gap-2 hover:bg-chart-2 hover:text-white transition-all shadow-sm hover:shadow-md rounded-xl border-2 bg-transparent dark:bg-slate-800"
          >
            <Backpack className="w-6 h-6" />
            <span className="text-sm font-semibold">Evacuação</span>
            <span className="text-xs opacity-70">Checklist</span>
          </Button>
        </Link>
      </div>
    </section>
  )
}
