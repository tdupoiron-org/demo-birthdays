import { NextResponse } from 'next/server'
import { getBirthdays, createBirthday, updateBirthday, deleteBirthday } from '@/app/lib/db'

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

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.id || !data.name || !data.birthDate) {
      return NextResponse.json({ error: 'Id, name, and birthDate are required' }, { status: 400 });
    }

    const birthday = await updateBirthday(data.id, data.name, new Date(data.birthDate));
    if (!birthday) {
      return NextResponse.json({ error: 'Birthday not found' }, { status: 404 });
    }
    
    return NextResponse.json(birthday);
  } catch (error) {
    console.error('Error updating birthday:', error);
    return NextResponse.json({ error: 'Failed to update birthday' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Id is required' }, { status: 400 });
    }

    const success = await deleteBirthday(Number(id));
    if (!success) {
      return NextResponse.json({ error: 'Birthday not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting birthday:', error);
    return NextResponse.json({ error: 'Failed to delete birthday' }, { status: 500 });
  }
}