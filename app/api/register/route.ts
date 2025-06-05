import { NextRequest, NextResponse } from 'next/server';
import { users, UserRecord } from '../../../lib/mockDB';

export async function POST(req: NextRequest) {
  const { first_name, last_name, email, password } = await req.json();

  if (!first_name || !last_name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if (users.some(u => u.email === email)) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
  }

  const user: UserRecord = { first_name, last_name, email, password };
  users.push(user);
  const token = Math.random().toString(36).slice(2);
  return NextResponse.json({ token, user: { first_name, last_name, email } });
}
