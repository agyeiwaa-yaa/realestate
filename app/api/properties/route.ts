import { NextResponse } from "next/server";
import pool, { withConnection } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const properties = await withConnection(async (connection) => {
      const [rows] = await connection.execute(
        `SELECT p.*, u.full_name as agent_name 
         FROM Properties p 
         JOIN Users u ON p.agent_id = u.user_id`
      );
      return rows;
    });

    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);
    if (!auth || (auth.role !== 1 && auth.role !== 2)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, price, location, imageUrl } = await req.json();

    const result = await withConnection(async (connection) => {
      const [result] = await connection.execute(
        'INSERT INTO Properties (title, description, price, location, image_url, agent_id) VALUES (?, ?, ?, ?, ?, ?)',
        [title, description, price, location, imageUrl, auth.userId]
      );
      return result;
    });

    return NextResponse.json({ message: "Property created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
} 