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
  console.log(comment);
  
  insertComment(comment.content, comment.author, comment.commentId);

  return NextResponse.json(comment);
}