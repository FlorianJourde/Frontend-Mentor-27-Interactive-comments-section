import { getComments, insertComment } from '../../../lib/queries';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const comments = await getComments()

  return NextResponse.json({
    comments
  })
}

export async function POST(request: NextRequest) {
  const comment = await request.json();
  insertComment(comment.content, comment.author);

  return NextResponse.json(comment);
}