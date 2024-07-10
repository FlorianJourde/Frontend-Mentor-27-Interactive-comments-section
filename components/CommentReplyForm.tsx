import { Comment } from '@/interfaces/comment';
import React, { useEffect, useState } from 'react'

export default function CommentReplyForm({
  onUpdate,
  comment,
  isEditing
}: {
  onUpdate: () => void,
  comment: Comment,
  isEditing: boolean
}) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      setAuthor(comment.author);
      setContent(comment.description);
    } else {
      setAuthor('');
      setContent('');
    }
  }, [isEditing, comment.description, comment.author]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let commentId: number = comment.id;

    if (isEditing) {
      console.log('editing');

      const response = await fetch('/api/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, author, commentId }),
      });

      if (!response.ok) {
        throw new Error('Failed to edit comment');
      }
    } else {
      console.log('not editing');
      comment.related_comment ? commentId = comment.related_comment : commentId

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, author, commentId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
    }

    onUpdate();

  };

  return (
    <form className='bg-white rounded-2xl p-5 flex gap-5 items-start ml-20' onSubmit={handleSubmit}>
      <div className="content flex flex-col gap-5 grow">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <div>
          <input
            placeholder='Author'
            className='w-full border border-solid p-4 rounded-lg'
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          {/* {isEditing ? 'Update' : 'Reply'} */}
        </div>
        <div>
          <textarea
            placeholder='Comment'
            className='w-full border border-solid p-4 rounded-lg'
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className='bg-[#5358b6] p-5 rounded-lg text-white uppercase'>
        {isEditing ? 'Update' : 'Reply'}
      </button>
    </form>
  )
}
