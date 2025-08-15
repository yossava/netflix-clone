import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { action, email, password, name } = await request.json();

    if (action === 'login') {
      // Mock login validation
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
      }

      // Simulate authentication
      const user = {
        id: 1,
        name: 'John Doe',
        email: email,
        avatar: '/avatars/avatar1.png',
        plan: 'Premium'
      };

      return NextResponse.json({ user, token: 'mock-jwt-token' });
    }

    if (action === 'signup') {
      // Mock signup validation
      if (!name || !email || !password) {
        return NextResponse.json({ error: 'Name, email and password required' }, { status: 400 });
      }

      const user = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: '/avatars/avatar1.png',
        plan: 'Basic'
      };

      return NextResponse.json({ user, token: 'mock-jwt-token' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}