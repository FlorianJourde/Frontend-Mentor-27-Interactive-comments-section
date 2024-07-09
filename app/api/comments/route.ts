import { getComments, insertComment } from '../../../lib/queries';

import { NextRequest, NextResponse } from 'next/server';
// import { insertComment } from '../../../lib/queries';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';


export async function GET() {
    const comments = await getComments()

    return NextResponse.json({
      comments      
    })
}

// export async function POST(request: NextRequest) {
  // const comment = request.body
  // const result = await db.query(
  //   'INSERT INTO comments (content, author, created_at) VALUES (?, ?, NOW())',
  //   [comment.content, comment.author]
  // );
  // console.log(comment);
  
  // const [rows] = await db.query('SELECT * FROM comments WHERE id = ?', [result.insertId]);
  // return rows[0];
  
  // return NextResponse.json(result);
// }

// import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const comment = await request.json();
  console.log(comment.content);
  console.log(comment.author);
  
  // db.query(
  //   'INSERT INTO comments (content, author, created_at) VALUES (?, ?, NOW())',
  //   [comment.content, comment.author]
  // );

  insertComment(comment.content, comment.author)

  // const insert = insertComment(comment.content, comment.author);
  // console.log(comment.content);
  // console.log(comment.author);
  // console.log(insert);
  


  // return new Response('Ok')
  // return insert
  // return NextResponse.json(insert);
  return NextResponse.json(comment);

}


// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   // const comment = insertComment(body.content, body.author);

//   console.log(body.author);
//   console.log(body.content);
//   // console.log(comment);
  
//   return NextResponse.json(body);
// };

// export async function POST(req: NextRequest) {
//   try {
//     const { content, author } = await req.json();
//     const comment = await insertComment(content, author);

//     return NextResponse.json(comment);
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// export async function POST(request: any, response: any) {
  // const requestData = request.json()
  // const requestData = insertComment(request.content, request.author)
  // console.log('request is :', request.body);
  // console.log('request is :', request.body.content);
  // console.log('response is :', response);
  // console.log('request is :', NextApiRequest);
  // console.log('request is :', NextApiResponse);
  // console.log('request is :', requestData);

  // const comment = await insertComment()

  // const res = await fetch('/api/comments', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY!,
  //   },
  //   body: JSON.stringify({ time: new Date().toISOString() }),
  // })
 
  // const data = await res.json()
 
  // return Response.json(data)
  // return  Response.json(request)
  // return  request.body.content
// }