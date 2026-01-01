"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { EvacuationChecklist } from "@/components/evacuation-checklist"
import { ThemeToggle } from "@/components/theme-toggle"

export default function EvacuationPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-border dark:border-slate-800 bg-card dark:bg-slate-900 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="rounded-lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground dark:text-white">Checklist de Evacuação</h1>
                <p className="text-xs text-muted-foreground dark:text-slate-400">Prepare-se para qualquer emergência</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <EvacuationChecklist />
      </main>
    </div>
  )
}
