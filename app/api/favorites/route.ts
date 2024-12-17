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
      // Check if already favorited
      const [existing] = await connection.execute(
        'SELECT * FROM Favorites WHERE user_id = ? AND property_id = ?',
        [auth.userId, propertyId]
      );

      if (Array.isArray(existing) && existing.length > 0) {
        // Remove favorite if it exists
        await connection.execute(
          'DELETE FROM Favorites WHERE user_id = ? AND property_id = ?',
          [auth.userId, propertyId]
        );
        return { action: 'removed' };
      } else {
        // Add new favorite
        await connection.execute(
          'INSERT INTO Favorites (user_id, property_id) VALUES (?, ?)',
          [auth.userId, propertyId]
        );
        return { action: 'added' };
      }
    });

    return NextResponse.json({ 
      message: result.action === 'added' ? "Added to favorites" : "Removed from favorites" 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update favorites" },
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