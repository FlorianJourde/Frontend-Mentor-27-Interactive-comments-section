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

export async function updateCommentLikes(likes: number, id: number): Promise<void> {
  await db.query(
    'UPDATE comments SET likes = ? WHERE id = ?',
    [likes, id]
  );
}