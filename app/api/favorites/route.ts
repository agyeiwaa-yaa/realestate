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

    const favorites = await withConnection(async (connection) => {
      const [rows] = await connection.execute(
        `SELECT f.*, p.* 
         FROM Favorites f 
         JOIN Properties p ON f.property_id = p.property_id 
         WHERE f.user_id = ?`,
        [auth.userId]
      );
      return rows;
    });

    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
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

    const { propertyId } = await req.json();

    const result = await withConnection(async (connection) => {
      const [result] = await connection.execute(
        'INSERT INTO Favorites (user_id, property_id) VALUES (?, ?)',
        [auth.userId, propertyId]
      );
      return result;
    });

    return NextResponse.json({ message: "Property added to favorites" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add to favorites" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { propertyId } = await req.json();

    await withConnection(async (connection) => {
      await connection.execute(
        'DELETE FROM Favorites WHERE user_id = ? AND property_id = ?',
        [auth.userId, propertyId]
      );
    });

    return NextResponse.json({ message: "Property removed from favorites" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove from favorites" },
      { status: 500 }
    );
  }
} 