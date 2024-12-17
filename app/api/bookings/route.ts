import { NextResponse } from "next/server";
import pool, { withConnection } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const bookings = await withConnection(async (connection) => {
      let query = `
        SELECT b.*, p.title as property_title, u.full_name as buyer_name, a.full_name as agent_name
        FROM Bookings b
        JOIN Properties p ON b.property_id = p.property_id
        JOIN Users u ON b.buyer_id = u.user_id
        JOIN Users a ON b.agent_id = a.user_id
      `;

      const [rows] = await connection.execute(query, 
        []
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
    const { propertyId, agentId, buyerId } = await req.json();

    const result = await withConnection(async (connection) => {
      const [result] = await connection.execute(
        'INSERT INTO Bookings (property_id, buyer_id, agent_id) VALUES (?, ?, ?)',
        [propertyId, buyerId, agentId]
      );
      return result;
    });

    return NextResponse.json({ message: "Booking created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Failed to create booking", status: 500} }
    );
  }
} 