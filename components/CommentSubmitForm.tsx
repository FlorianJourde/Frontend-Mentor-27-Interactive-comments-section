import React, { useEffect, useState } from 'react'
import Avatars from './Avatars';

export default function CommentSubmitForm({ onUpdate, sessionId }: { onUpdate: () => void, sessionId: string | null }) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [avatarId, setAvatarId] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, author, sessionId, avatarId }),
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
      <div className="content grid grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] gap-5 grow">

        {error && <p className='text-red-700 col-span-3'>{error}</p>}
        {success && <p className='text-green-700 col-span-3'>{success}</p>}

        <div className='relative aspect-square'>
          <Avatars avatarId={avatarId} setAvatarId={setAvatarId} />
        </div>
        <div className='col-span-2'>
          <input
            placeholder='Author'
            className='w-full border border-solid p-4 rounded-lg'
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className='col-span-2'>
          <textarea
            placeholder='Comment'
            className='w-full border border-solid p-4 rounded-lg'
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className='bg-[#305f53] p-4 rounded-lg text-white  text-sm self-start font-bold'>Submit</button>
      </div>
    </form>
  )
}
