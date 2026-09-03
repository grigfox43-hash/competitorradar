import crypto from 'crypto';
import { NextRequest } from 'next/server';

const AUTH_SECRET = process.env.AUTH_SECRET || 'competitorradar_super_secret_auth_key_2026';

export function hashPassword(password: string): string {
  const salt = 'cr_salt_987';
  return crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha256').toString('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export interface SessionPayload {
  userId: string;
  email: string;
  exp: number;
}

export function createToken(userId: string, email: string): string {
  const exp = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
  const payload: SessionPayload = { userId, email, exp };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    const [data, sig] = token.split('.');
    if (!data || !sig) return null;

    const expectedSig = crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('base64url');
    if (expectedSig !== sig) return null;

    const payload: SessionPayload = JSON.parse(Buffer.from(data, 'base64url').toString('utf-8'));
    if (payload.exp < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
}

export function getUserFromRequest(req: NextRequest): SessionPayload | null {
  const cookie = req.cookies.get('auth_token')?.value;
  if (!cookie) return null;
  return verifyToken(cookie);
}
