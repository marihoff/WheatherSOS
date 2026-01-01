"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Trash2, FileText, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

interface Document {
  id: string
  name: string
  type: string
  uploadedAt: string
  dataUrl: string
}

export function DocumentUpload() {
  const { user, updateUserProfile } = useAuth()
  const [documents, setDocuments] = useState<Document[]>(user?.documents || [])
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files) return

    setUploading(true)
    const newDocuments: Document[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()

      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string
        const doc: Document = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type,
          uploadedAt: new Date().toISOString(),
          dataUrl,
        }
        newDocuments.push(doc)

        if (newDocuments.length === files.length) {
          const updatedDocs = [...documents, ...newDocuments]
          setDocuments(updatedDocs)
          await updateUserProfile({ documents: updatedDocs })
          setUploading(false)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const deleteDocument = async (id: string) => {
    const updatedDocs = documents.filter((doc) => doc.id !== id)
    setDocuments(updatedDocs)
    await updateUserProfile({ documents: updatedDocs })
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Documentos Importantes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="file-upload"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <label htmlFor="file-upload" className="cursor-pointer block">
            <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium text-foreground">
              {uploading ? "Enviando..." : "Arraste documentos ou clique para enviar"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Suporte: PDF, JPG, PNG, DOC (máx. 5MB cada)</p>
          </label>
        </div>

        {documents.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Documentos Salvos ({documents.length})</p>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(doc.uploadedAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <a
                      href={doc.dataUrl}
                      download={doc.name}
                      className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                      title="Baixar documento"
                    >
                      <Check className="w-4 h-4 text-primary" />
                    </a>
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Deletar documento"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
