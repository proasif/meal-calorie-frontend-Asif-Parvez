import { NextRequest, NextResponse } from 'next/server';
import { users } from '../../../lib/mockDB';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

const user = users.find(u => u.email === email);
  if (!user) {
    return new NextResponse('Unregistered user, please register.', { status: 401 });
  }

  if (user.password !== password) {
    return new NextResponse('Invalid credentials', { status: 401 });
  }

  const token = Math.random().toString(36).slice(2);
  return NextResponse.json({ token, user: { first_name: user.first_name, last_name: user.last_name, email: user.email } });
}
