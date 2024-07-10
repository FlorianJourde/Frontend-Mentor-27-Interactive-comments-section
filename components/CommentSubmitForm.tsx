import React, { useState } from 'react'

export default function CommentSubmitForm({ onUpdate }: { onUpdate: () => void }) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
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
        body: JSON.stringify({ content, author }),
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
        <div>
          {/* <label htmlFor="author">Author</label> */}
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
          {/* <label htmlFor="content">Comment</label> */}
          <textarea
                    placeholder='Comment'

            className='w-full border border-solid p-4 rounded-lg'
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className='bg-[#5358b6] p-5 rounded-lg text-white uppercase'>Submit</button>
    </form>
  )
}
