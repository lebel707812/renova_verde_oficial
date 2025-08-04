import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const article = await prisma.article.update({
      where: { slug: slug },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ likes: article.likes });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar likes' },
      { status: 500 }
    );
  }
}


