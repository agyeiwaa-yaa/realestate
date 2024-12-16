import { NextResponse, NextRequest } from "next/server";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import pool, { withConnection } from "@/lib/db";
import mysql from 'mysql2/promise';

type User = {
  user_id: number;
  full_name: string;
  email: string;
  password_hash: string;
  role_id: number;
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await withConnection(async (connection) => {
      const [users] = await connection.execute<mysql.RowDataPacket[]>(
        'SELECT user_id, full_name, email, password_hash, role_id FROM Users WHERE email = ?',
        [email]
      );

      return Array.isArray(users) && users.length > 0 ? users[0] : null;
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT token
    const token = sign(
      { userId: user.user_id, role: user.role_id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    return NextResponse.json({ token, user: {
      id: user.user_id,
      fullName: user.full_name,
      email: user.email,
      roleId: user.role_id
    }});
  } catch (error) {
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
} 