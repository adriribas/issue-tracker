import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import authOptions from '@/app/_auth/authOptions';
import { commentSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const validation = commentSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 400 });
  }

  const newComment = await prisma.comment.create({
    data: { text: body.text, authorId: session.user.id, issueId: issue.id },
  });

  return NextResponse.json(newComment, { status: 201 });
}
