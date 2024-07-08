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