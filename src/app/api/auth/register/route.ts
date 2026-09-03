import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Укажите корректный адрес электронной почты' }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Пароль должен содержать не менее 6 символов' }, { status: 400 });
    }

    const existing = await db.getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'Пользователь с таким email уже зарегистрирован' }, { status: 409 });
    }

    const passwordHash = hashPassword(password);
    const newUser = await db.createUser(email, passwordHash);
    const token = createToken(newUser.id, newUser.email);

    const response = NextResponse.json({ success: true, user: newUser }, { status: 201 });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
