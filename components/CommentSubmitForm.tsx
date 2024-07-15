import React, { useState } from 'react'

export default function CommentSubmitForm({ onUpdate, sessionId }: { onUpdate: () => void, sessionId: string | null }) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [session, setsession] = useState(sessionId);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    console.log(sessionId);
    console.log(session);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, author, sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      setContent('');
      setAuthor('');
      setSuccess('Comment added successfully!');
      onUpdate();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form className='bg-white rounded-2xl p-5 flex gap-5 items-start' onSubmit={handleSubmit}>
      <div className="content flex flex-col gap-5 grow">
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
      <button type="submit" className='bg-[#305f53] p-5 rounded-lg text-white font-bold'>Submit</button>
    </form>
  )
}
