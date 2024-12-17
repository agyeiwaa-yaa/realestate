import { verify } from "jsonwebtoken";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function verifyAuth(req: NextRequest) {
  const headersList = await headers();
  const authHeader = headersList.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    console.log("Token decoded:", decoded);
    return decoded as { userId: number; role: number };
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}