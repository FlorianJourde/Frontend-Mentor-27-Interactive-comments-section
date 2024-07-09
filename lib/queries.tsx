import { NextRequest, NextResponse } from 'next/server';
import db from './db';

export const getComments = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM comments', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const updateComment = (id: any, content: any) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE comments SET content = ? WHERE id = ?',
      [content, id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};

export function insertComment(content: string, author: string): Promise<Comment> {
  // const [result] = await db.execute<any>(
  //   'INSERT INTO comments (content, author, created_at) VALUES (?, ?, NOW())',
  //   [content, author]
  // );

  // const insertId = (result as any).insertId;
  // const [rows] = await db.execute<Comment[]>('SELECT * FROM comments WHERE id = ?', [insertId]);
  // return rows[0];

  // const [result] = db.query(
  //   'INSERT INTO comments (content, author, created_at) VALUES (?, ?, NOW())',
  //   [content, author]
  // );

  // const [rows] = db.query('SELECT * FROM comments WHERE id = ?', [result.insertId]);
  // return rows[0];



  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO comments (description, author, created_at) VALUES (?, ?, NOW())',
      [content, author],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

// export async function insertComment(content: string, author: string): Promise<Comment> {
//   const [result] = await db.query(
//     'INSERT INTO comments (content, author, created_at) VALUES (?, ?, NOW())',
//     [content, author]
//   );

//   const [rows] = await db.query('SELECT * FROM comments WHERE id = ?', [result.insertId]);
//   return rows[0];
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { content, author } = await req.json();
//     const [result] = await db.query(
//       'INSERT INTO comments (content, author, created_at) VALUES (?, ?, NOW())',
//       [content, author]
//     );

//     return NextResponse.json({ id: result.insertId, content, author, created_at: new Date() });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }