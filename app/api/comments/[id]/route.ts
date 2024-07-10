import { NextRequest, NextResponse } from 'next/server';
import { deleteComment } from '@/lib/queries';

export async function DELETE(req: NextRequest) {
  try {
    const { commentId } = await req.json();  
    await deleteComment(commentId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}