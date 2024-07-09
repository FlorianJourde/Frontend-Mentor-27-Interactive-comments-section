import { NextRequest, NextResponse } from 'next/server';
// import { insertComment } from '../../../lib/queries';
import { getComments } from '@/lib/queries';

export async function POST() {
  console.log('route.ts');

  // try {
  //   const comments = await getComments();
  //   res.status(200).json(comments);
  // } catch (err: any) {
  //   res.status(500).json({ error: err.message });
  // }

  return NextResponse.json({
    hello: 'world'
  })

  // try {
  //   const { content, author } = await req.json();
  //   const comment = await insertComment(content, author);

  //   return NextResponse.json(comment);
  // } catch (err: any) {
  //   return NextResponse.json({ error: err.message }, { status: 500 });
  // }
}