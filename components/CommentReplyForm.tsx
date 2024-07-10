import React, { useEffect, useState } from 'react'

export default function CommentReplyForm({ commentId, commentRelatedId, onUpdate }: { commentId: number, commentRelatedId: number | null, onUpdate: () => void }) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    commentRelatedId ? commentId = commentRelatedId : commentId

    try {
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

      onUpdate();
    } catch (error: any) {
    }
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
      <button type="submit" className='bg-[#5358b6] p-5 rounded-lg text-white uppercase'>Reply</button>
    </form>
  )
}
