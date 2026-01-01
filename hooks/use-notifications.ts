"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface NotificationPermission {
  status: "granted" | "denied" | "default"
  isSupported: boolean
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>({
    status: "default",
    isSupported: false,
  })
  const { toast } = useToast()

  useEffect(() => {
    const isSupported = "Notification" in window && "serviceWorker" in navigator
    setPermission((prev) => ({
      ...prev,
      isSupported,
      status: (Notification.permission as "granted" | "denied" | "default") || "default",
    }))
  }, [])

  const requestPermission = async () => {
    if (!permission.isSupported) {
      toast({
        title: "Notificações não suportadas",
        description: "Seu navegador não suporta notificações push",
        variant: "destructive",
      })
      return
    }

    try {
      const result = await Notification.requestPermission()
      setPermission((prev) => ({
        ...prev,
        status: result as "granted" | "denied" | "default",
      }))

      if (result === "granted") {
        toast({
          title: "Notificações ativadas!",
          description: "Você receberá alertas em tempo real de desastres",
        })

        // Register service worker
        if ("serviceWorker" in navigator) {
          try {
            await navigator.serviceWorker.register("/sw.js")
          } catch (err) {
            console.error("[v0] Service Worker registration failed:", err)
          }
        }
      }
    } catch (err) {
      console.error("[v0] Error requesting notification permission:", err)
    }
  }

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (permission.status === "granted") {
      new Notification(title, {
        icon: "/icon.svg",
        badge: "/icon.svg",
        ...options,
      })
    }
  }

  return {
    permission,
    requestPermission,
    sendNotification,
    isGranted: permission.status === "granted",
  }
}
