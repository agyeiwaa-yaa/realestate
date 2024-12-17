import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import pool, { withConnection } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName, roleId } = await req.json();

    // Hash password
    const hashedPassword = await hash(password, 10);

    const result = await withConnection(async (connection) => {
      // Check if email exists
      const [existingUsers] = await connection.execute(
        'SELECT email FROM Users WHERE email = ?',
        [email]
      );

      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        throw new Error('Email already exists');
      }

      // Insert new user
      const [result] = await connection.execute(
        'INSERT INTO Users (full_name, email, password_hash, role_id) VALUES (?, ?, ?, ?)',
        [fullName, email, hashedPassword, roleId]
      );

      return result;
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Registration failed" },
      { status: 400 }
    );
  }
} 