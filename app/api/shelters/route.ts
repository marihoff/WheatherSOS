import { NextResponse } from "next/server"

// Mock shelters database
const shelters = [
  {
    id: "1",
    name: "Ginásio Municipal Central",
    address: "Rua das Flores, 123 - Centro",
    city: "São Paulo",
    capacity: 500,
    available: 342,
    distance: 2.3,
    amenities: ["Água", "Alimentação", "Banheiros", "Enfermaria"],
    contact: "(11) 3000-0001",
    status: "open",
  },
  {
    id: "2",
    name: "Escola Estadual Santos Dumont",
    address: "Av. Paulista, 1000 - Bela Vista",
    city: "São Paulo",
    capacity: 300,
    available: 89,
    distance: 4.7,
    amenities: ["Água", "Alimentação", "Banheiros"],
    contact: "(11) 3000-0002",
    status: "open",
  },
  {
    id: "3",
    name: "Centro Comunitário Vila Nova",
    address: "Rua Esperança, 456 - Vila Nova",
    city: "São Paulo",
    capacity: 200,
    available: 0,
    distance: 5.2,
    amenities: ["Água", "Banheiros"],
    contact: "(11) 3000-0003",
    status: "full",
  },
  {
    id: "4",
    name: "Clube Recreativo Municipal",
    address: "Av. dos Trabalhadores, 789 - Zona Norte",
    city: "São Paulo",
    capacity: 400,
    available: 400,
    distance: 8.1,
    amenities: ["Água", "Alimentação", "Banheiros", "Enfermaria", "Segurança"],
    contact: "(11) 3000-0004",
    status: "open",
  },
]

export async function GET() {
  return NextResponse.json({ shelters })
}
