import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// 🟩 GET — Liste des WHY
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const whys = await prisma.userWhy.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
    select: { id: true, content: true, createdAt: true },
  });

  return NextResponse.json(whys);
}

// 🟦 POST — Ajouter un WHY
export async function POST(req) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { content } = await req.json();
  if (!content || typeof content !== "string") {
    return NextResponse.json({ error: "Contenu invalide" }, { status: 400 });
  }

  const newWhy = await prisma.userWhy.create({
    data: {
      content,
      user: { connect: { email: session.user.email } },
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  return NextResponse.json(newWhy);
}

// 🟥 DELETE — Supprimer un WHY
export async function DELETE(req) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  // Vérifie que le WHY appartient bien à l'utilisateur
  const existing = await prisma.userWhy.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!existing || existing.user.email !== session.user.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  await prisma.userWhy.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
