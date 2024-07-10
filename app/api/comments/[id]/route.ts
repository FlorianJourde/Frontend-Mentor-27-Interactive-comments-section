import { NextRequest, NextResponse } from 'next/server';
import { deleteComment, updateCommentLikes } from '@/lib/queries';

export async function DELETE(req: NextRequest) {
  // console.log(req.json());
  try {
    const { commentId } = await req.json();
    // console.log('Test');
    console.log({ commentId });
    
    await deleteComment(commentId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}