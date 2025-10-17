import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const goals = await prisma.goal.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(goals);
}

export async function POST(req) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const data = await req.json();

  const goal = await prisma.goal.create({
    data: {
      text: data.text,
      term: data.term,
      user: { connect: { email: session.user.email } },
    },
  });

  return NextResponse.json(goal);
}

export async function PUT(req) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const data = await req.json();
  const goal = await prisma.goal.update({
    where: { id: data.id },
    data: { done: data.done, completedAt: data.done ? new Date() : null },
  });

  return NextResponse.json(goal);
}

export async function DELETE(req) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await req.json();

  await prisma.goal.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
