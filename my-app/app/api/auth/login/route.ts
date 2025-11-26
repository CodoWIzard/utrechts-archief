import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, generateToken } from '../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const isValid = await authenticateUser(username, password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken('admin');
    
    const response = NextResponse.json({ success: true });
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 86400,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}