import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(request: NextRequest, { params }: { params: { issueID: string } }) {
  // only allowing authorized users
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // validation with zod  
  const body = await request.json();    
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

  const { title, description, assignedToUserID } = body;

  if (assignedToUserID) {
    
    const user = await prisma.user.findUnique({ where: { id: assignedToUserID } });
    if (!user) return NextResponse.json({ error: "Invalid user" }, { status: 404 });
  }

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.issueID) } });
  if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(params.issueID) },
      data: {
        title: title,
        description: description,
        assignedToUserID,
      },
    });
    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { issueID: string } }) {
  // only allowing authorized users
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.issueID) } });
  if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  try {
    await prisma.issue.delete({
      where: { id: issue.id },
    });
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
