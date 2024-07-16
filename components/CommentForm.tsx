import { CommentForm } from '@/interfaces/CommentForm';
import React, { useEffect, useState } from 'react'
import Avatars from './Avatars';

export default function CommentReplyForm(
  props: CommentForm
) {
  const [content, setContent] = useState<string | undefined>('');
  const [author, setAuthor] = useState<string | undefined>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [avatarId, setAvatarId] = useState<number>(1);
  const { onUpdate, sessionId, comment, isEditing, isReplying, toggleFormVisibility } = props;

  useEffect(() => {
    if (isEditing) {
      setAuthor(comment?.author);
      setContent(comment?.description);
    } else {
      setAuthor('');
      setContent('');
    }

  }, [isEditing, isReplying, comment?.description, comment?.author]);

  useEffect(() => {
    if (comment?.avatar_id) {
      setAvatarId(comment?.avatar_id)
    }

  }, [isEditing])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let commentId: number | undefined = comment?.id;

    if (isEditing) {
      const response = await fetch('/api/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, author, commentId, avatarId }),
      });

      if (!response.ok) {
        throw new Error('Failed to edit comment');
      }
    } else {
      comment?.related_comment ? commentId = comment.related_comment : commentId

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, author, commentId, sessionId, avatarId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
    }

    onUpdate();
    if (toggleFormVisibility) {
      toggleFormVisibility()
    }
  };

  return (
    <form className={`bg-white rounded-2xl p-5 flex gap-5 items-start relative  + ${isReplying && 'ml-20 before:content-[""] before:absolute before:-top-10 before:bottom-0 before:bg-[#37967f] before:w-1 before:-left-10 before:rounded-sm z-10'}`} onSubmit={handleSubmit}>
      <div className="content grid grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] gap-5 grow">

        {error && <p className='text-red-700 col-span-2'>{error}</p>}
        {success && <p className='text-green-700 col-span-2'>{success}</p>}

        <div className='relative aspect-square'>
          <Avatars avatarId={avatarId} setAvatarId={setAvatarId} />
        </div>

        <div className={`${!isReplying && 'col-span-2'}`}>
          <input
            placeholder='Author'
            className='w-full border border-solid p-4 rounded-lg'
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {isReplying && (
          <button onClick={toggleFormVisibility} className='p-4 rounded-lg text-[#ee6368] border-2 border-[#ee6368] text-sm font-bold '>Close</button>
        )}

        <div className='col-span-2'>
          <textarea
            placeholder='Comment'
            className='w-full border border-solid p-4 rounded-lg'
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button type="submit" className='bg-[#305f53] p-4 rounded-lg text-white  text-sm self-start font-bold'>
          {isEditing ? 'Update' : 'Reply'}
        </button>

      </div>
    </form>
  )
}
