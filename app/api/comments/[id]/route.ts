import { NextRequest, NextResponse } from 'next/server';
import { deleteComment, getComment } from '@/lib/queries';

export async function DELETE(req: NextRequest) {
  try {
    const { commentId } = await req.json();  
    await deleteComment(commentId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// export async function GET(req: NextRequest) {
//   try {
//     const comment = await req.json();  
//     // getComment(comment);
//     // console.log(comment);
//     console.log('test');
    
//     return NextResponse.json({
//       comment
//     })
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }