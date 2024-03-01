import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: { name: true, id: true, email: true },
  });

  return NextResponse.json(users);
}
