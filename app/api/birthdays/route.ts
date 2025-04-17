import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET() {
  const birthdays = await prisma.birthday.findMany({
    orderBy: { birthDate: 'asc' }
  })
  return NextResponse.json(birthdays)
}

export async function POST(request: Request) {
  const data = await request.json()
  const birthday = await prisma.birthday.create({
    data: {
      name: data.name,
      birthDate: new Date(data.birthDate)
    }
  })
  return NextResponse.json(birthday)
}