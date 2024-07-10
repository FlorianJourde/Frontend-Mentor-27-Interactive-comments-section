import { NextRequest, NextResponse } from 'next/server';
import { updateCommentLikes } from '@/lib/queries';

export async function PUT(req: NextRequest) {
  try {
    const { currentLikes, commentId } = await req.json();
    await updateCommentLikes(currentLikes, commentId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
