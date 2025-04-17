import { NextResponse } from 'next/server'
import { getBirthdays, createBirthday } from '@/app/lib/db'

export async function GET() {
  try {
    const birthdays = await getBirthdays();
    return NextResponse.json(birthdays);
  } catch (error) {
    console.error('Error fetching birthdays:', error);
    return NextResponse.json({ error: 'Failed to fetch birthdays' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.birthDate) {
      return NextResponse.json({ error: 'Name and birthDate are required' }, { status: 400 });
    }

    const birthday = await createBirthday(data.name, new Date(data.birthDate));
    return NextResponse.json(birthday);
  } catch (error) {
    console.error('Error creating birthday:', error);
    return NextResponse.json({ error: 'Failed to create birthday' }, { status: 500 });
  }
}