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

// export async function DELETE(req: NextRequest) {
//   try {
//     const { commentId } = await req.json();
//     console.log('Test');
    
//     // await updateCommentLikes(currentLikes, commentId);

//     return NextResponse.json({ success: true });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }