"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Check user preference from localStorage or system preference
    const stored = localStorage.getItem("weathersos_theme")
    const isDarkMode = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setIsDark(isDarkMode)
    applyTheme(isDarkMode)
  }, [])

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement
    if (dark) {
      html.classList.add("dark")
      localStorage.setItem("weathersos_theme", "dark")
    } else {
      html.classList.remove("dark")
      localStorage.setItem("weathersos_theme", "light")
    }
  }

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    applyTheme(newIsDark)
  }

  if (!isMounted) return null

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-lg">
      {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
    </Button>
  )
}
