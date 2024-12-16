import { NextResponse } from "next/server";
import pool, { withConnection } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await withConnection(async (connection) => {
      let query = `
        SELECT b.*, p.title as property_title, u.full_name as buyer_name, a.full_name as agent_name
        FROM Bookings b
        JOIN Properties p ON b.property_id = p.property_id
        JOIN Users u ON b.buyer_id = u.user_id
        JOIN Users a ON b.agent_id = a.user_id
      `;

      if (auth.role === 2) { // Agent
        query += ' WHERE b.agent_id = ?';
      } else if (auth.role === 3) { // Buyer
        query += ' WHERE b.buyer_id = ?';
      }

      const [rows] = await connection.execute(query, 
        auth.role !== 1 ? [auth.userId] : []
      );
      return rows;
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { propertyId, agentId } = await req.json();

    const result = await withConnection(async (connection) => {
      const [result] = await connection.execute(
        'INSERT INTO Bookings (property_id, buyer_id, agent_id) VALUES (?, ?, ?)',
        [propertyId, auth.userId, agentId]
      );
      return result;
    });

    return NextResponse.json({ message: "Booking created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
} 