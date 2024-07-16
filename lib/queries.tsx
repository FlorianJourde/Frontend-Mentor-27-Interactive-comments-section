import db from './db';

export async function getComments() {
  try {
    const [results] = await db.query(`
      SELECT *
      FROM comments
      ORDER BY 
        CASE WHEN related_comment IS NOT NULL THEN related_comment ELSE id END,
        id;
    `);

    return results;
  } catch (error) {
    console.error("Error in getComments:", error);
    throw new Error(`Error fetching comments`);
  }
}

export async function insertComment(content: string, author: string, related_comment: number | null, session_id: string | null, avatar_id: number): Promise<void> {
  try {
    if (related_comment === undefined) {
      related_comment = null;
    }

    await db.query(
      'INSERT INTO comments (description, author, created_at, related_comment, session_id, avatar_id) VALUES (?, ?, NOW(), ?, ?, ?)',
      [content, author, related_comment, session_id, avatar_id]
    );
  } catch (error) {
    let errorMessage = "Error inserting comment";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
}

export async function editComment(content: string, author: string, id: number | null): Promise<void> {
  try {
    await db.query(
      'UPDATE comments SET description = ?, author = ?, updated_at = NOW() WHERE id = ?',
      [content, author, id]
    );
  } catch (error) {
    let errorMessage = "Error updating comment";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
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

export async function getComment(id: number) {
  const [result] = await db.query(`
      SELECT *
      FROM comments
      WHERE 
      id = ?
    `,
    [id]
  )

  return result;
}