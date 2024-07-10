import db from './db';

// export function getComments() {
//   return new Promise((resolve, reject) => {
//     db.query('SELECT * FROM comments', (err, results) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(results);
//     });
//   });
// };

export function getComments() {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT *
      FROM comments
      ORDER BY 
          CASE WHEN related_comment IS NOT NULL THEN related_comment ELSE id END,
          id;
      `, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export function insertComment(content: string, author: string, related_comment: number | null): Promise<Comment> {
  return new Promise((resolve, reject) => {
    related_comment ? related_comment === undefined : related_comment
    console.log(related_comment);

    db.query(
      'INSERT INTO comments (description, author, created_at, related_comment) VALUES (?, ?, NOW(), ?)',
      [content, author, related_comment],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

export function editComment(content: string, author: string, id: number | null): Promise<Comment> {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE comments SET description = ?, author = ?, updated_at = NOW() WHERE id = ?',
      [content, author, id],
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

export async function deleteComment(id: number): Promise<void> {
  await db.query(
    'DELETE FROM comments WHERE id = ?',
    [id]
  );
}