import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = registerSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (user)
    return NextResponse.json(
      { success: false, message: "Email address is already in use" },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        hashedPassword: hashedPassword,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    NextResponse.json(error, { status: 400 });
  }
}
