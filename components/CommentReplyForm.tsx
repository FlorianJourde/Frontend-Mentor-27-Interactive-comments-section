import { Comment } from '@/interfaces/comment';
import React, { useEffect, useState } from 'react'

export default function CommentReplyForm({
  onUpdate,
  comment,
  isEditing,
  toggleFormVisibility,
  sessionId
}: {
  onUpdate: () => void,
  comment: Comment,
  isEditing: boolean,
  toggleFormVisibility: () => void,
  sessionId: string | null
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
      comment.related_comment ? commentId = comment.related_comment : commentId

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, author, commentId, sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
    }

    onUpdate();
    toggleFormVisibility()
  };

  return (
    <form className='bg-white rounded-2xl p-5 flex gap-5 items-start ml-20 relative before:content-[""] before:absolute before:-top-10 before:bottom-0 before:bg-[#37967f] before:w-1 before:-left-10 before:rounded-sm z-10' onSubmit={handleSubmit}>
      <div className="content grid grid-cols-[minmax(0,1fr)_minmax(0,auto)] gap-5 grow">
        {error && <p className='text-red-700 col-span-2'>{error}</p>}
        {success && <p className='text-green-700 col-span-2'>{success}</p>}
        <div>
          <input
            placeholder='Author'
            className='w-full border border-solid p-4 rounded-lg'
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button onClick={toggleFormVisibility} className='p-4 rounded-lg text-[#ee6368] border-2 border-[#ee6368] uppercase text-sm '>Close</button>
        <div>
          <textarea
            placeholder='Comment'
            className='w-full border border-solid p-4 rounded-lg'
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className='bg-[#305f53] p-4 rounded-lg text-white uppercase  text-sm self-start'>
          {isEditing ? 'Update' : 'Reply'}
        </button>
      </div>
    </form>
  )
}
