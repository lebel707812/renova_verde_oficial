import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from './supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export interface AuthUser {
  id: number;
  email: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch {
    return null;
  }
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error('Error fetching user:', error);
    return null;
  }

  if (!data) {
    return null;
  }

  const isValid = await verifyPassword(password, data.passwordHash);
  if (!isValid) {
    return null;
  }

  return {
    id: data.id,
    email: data.email
  };
}

export async function createUser(email: string, password: string): Promise<AuthUser> {
  const hashedPassword = await hashPassword(password);
  
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert([
      {
        email,
        passwordHash: hashedPassword
      }
    ])
    .select();

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return {
    id: data[0].id,
    email: data[0].email
  };
}

