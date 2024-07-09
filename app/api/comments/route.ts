import { getComments } from '../../../lib/queries';

import { NextRequest, NextResponse } from 'next/server';
import { insertComment } from '../../../lib/queries';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(request: Request) {

    // const res = await fetch('https://data.mongodb-api.com/...', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'API-Key': process.env.DATA_API_KEY,
    //   },
    // })
    // const data = await res.json()
  
    // return Response.json({ data })
    // console.log(req.method);
  // if (req.method === 'GET') {
    // console.log('API GET');
    // try {
    //   const comments = await getComments();
    //   console.log(comments);
      
    //   // res.status(200).json(comments);
    // } catch (err: any) {
    //   // res.status(500).json({ error: err.message });
    // }

    const comments = await getComments()

      // try {
      //   const comments = await getComments();
      //   // res.status(200).json(comments);
      //   console.log(comments);
        
      //   // return comments

      // } catch (err: any) {
      //   // res.status(500).json({ error: err.message });

      // }

    return NextResponse.json({
      // comments: comments      
      comments      
    })
  // } else if (req.method === 'POST') {
  //   console.log('API POST');
  //   try {
  //     const { content, author } = await req.json();
  //     const comment = await insertComment(content, author);

  //     return NextResponse.json(comment);
  //   } catch (err: any) {
  //     return NextResponse.json({ error: err.message }, { status: 500 });
  //   }
  // }
}


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log(req.method);
//   // if (req.method === 'GET') {
//     // console.log('API GET');
//     try {
//       const comments = await getComments();
//       res.status(200).json(comments);
//     } catch (err: any) {
//       res.status(500).json({ error: err.message });
//     }
//   // } else if (req.method === 'POST') {
//   //   console.log('API POST');
//   //   try {
//   //     const { content, author } = await req.json();
//   //     const comment = await insertComment(content, author);

//   //     return NextResponse.json(comment);
//   //   } catch (err: any) {
//   //     return NextResponse.json({ error: err.message }, { status: 500 });
//   //   }
//   // }
// }


// import { NextRequest, NextResponse } from 'next/server';
// import { insertComment } from '../../../lib/queries';

// export async function POST(req: NextRequest) {
//   // console.log('test');
//     console.log('API called');
  
//   try {
//     const { content, author } = await req.json();
//     const comment = await insertComment(content, author);

//     return NextResponse.json(comment);
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }