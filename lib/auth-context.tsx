"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface Document {
  id: string
  name: string
  type: string
  uploadedAt: string
  dataUrl: string
}

interface User {
  id: string
  email: string
  name: string
  location: string
  emergencyContact: string
  documents: Document[]
  isSafe: boolean
  lastSafeCheck?: string
}

interface StoredUser extends User {
  passwordHash: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string, rememberMe: boolean) => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simulated password hashing (in production, use bcrypt on backend)
function hashPassword(password: string): string {
  return btoa(password) // Simple encoding for demo
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      // Primeiro tenta sessionStorage (sessão atual)
      const sessionUser = sessionStorage.getItem("weathersos_user")
      if (sessionUser) {
        setUser(JSON.parse(sessionUser))
        setIsLoading(false)
        return
      }

      // Depois tenta localStorage (remember me)
      const rememberMe = localStorage.getItem("weathersos_remember_me")
      if (rememberMe === "true") {
        const savedUser = localStorage.getItem("weathersos_user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    if (password.length < 6) {
      throw new Error("Senha deve ter no mínimo 6 caracteres")
    }

    const allUsers: StoredUser[] = JSON.parse(localStorage.getItem("weathersos_users") || "[]")

    if (allUsers.some((u) => u.email === email)) {
      throw new Error("Email já cadastrado")
    }

    const newUser: StoredUser = {
      id: Date.now().toString(),
      email,
      name,
      location: "",
      emergencyContact: "",
      documents: [],
      isSafe: false,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    }

    allUsers.push(newUser)
    localStorage.setItem("weathersos_users", JSON.stringify(allUsers))

    const { passwordHash, createdAt, ...userWithoutSensitive } = newUser
    sessionStorage.setItem("weathersos_user", JSON.stringify(userWithoutSensitive))
    setUser(userWithoutSensitive)
  }

  const signIn = async (email: string, password: string, rememberMe = false) => {
    const allUsers: StoredUser[] = JSON.parse(localStorage.getItem("weathersos_users") || "[]")
    const existingUser = allUsers.find((u) => u.email === email)

    if (!existingUser || !verifyPassword(password, existingUser.passwordHash)) {
      throw new Error("Email ou senha incorretos")
    }

    const { passwordHash, createdAt, ...userWithoutSensitive } = existingUser

    sessionStorage.setItem("weathersos_user", JSON.stringify(userWithoutSensitive))

    if (rememberMe) {
      localStorage.setItem("weathersos_user", JSON.stringify(userWithoutSensitive))
      localStorage.setItem("weathersos_remember_me", "true")
    } else {
      localStorage.removeItem("weathersos_remember_me")
      localStorage.removeItem("weathersos_user")
    }

    setUser(userWithoutSensitive)
  }

  const signOut = async () => {
    sessionStorage.removeItem("weathersos_user")
    localStorage.removeItem("weathersos_remember_me")
    setUser(null)
  }

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error("Usuário não autenticado")

    const updatedUser = { ...user, ...updates }
    const allUsers: StoredUser[] = JSON.parse(localStorage.getItem("weathersos_users") || "[]")

    const userIndex = allUsers.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      allUsers[userIndex] = {
        ...allUsers[userIndex],
        ...updates,
        documents: updates.documents ?? allUsers[userIndex].documents,
        isSafe: updates.isSafe ?? allUsers[userIndex].isSafe,
      }
      localStorage.setItem("weathersos_users", JSON.stringify(allUsers))
    }

    sessionStorage.setItem("weathersos_user", JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}
