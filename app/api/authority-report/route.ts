import { NextResponse } from "next/server"

// Mock storage for authority reports
const authorityReports: any[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const report = {
      id: Date.now().toString(),
      ...body,
      status: "received",
      sentTo: ["Defesa Civil", "Bombeiros", "Polícia Militar"],
    }

    authorityReports.push(report)

    // Simulate sending to authorities
    console.log("[v0] Report sent to authorities:", report)

    return NextResponse.json({
      success: true,
      message: "Relatório enviado com sucesso",
      report: report,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Falha ao enviar relatório" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ reports: authorityReports })
}
