import { CommentForm } from '@/interfaces/CommentForm';
import React, { useEffect, useState } from 'react'
import Avatars from './Avatars';
import { AnimatePresence, motion } from 'framer-motion';
import { AvatarAnimation, FormAnimation } from './Animations';
import IconClose from '@/public/assets/icons/icon-close.svg'
import IconReplyWhite from '@/public/assets/icons/icon-reply-white.svg'
import IconUpdate from '@/public/assets/icons/icon-update.svg'

export default function CommentReplyForm(
  props: CommentForm
) {
  const [content, setContent] = useState<string | undefined>('');
  const [author, setAuthor] = useState<string | undefined>('');
  const [avatarId, setAvatarId] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { onUpdate, sessionId, comment, isEditing, isReplying, closeForm } = props;

  useEffect(() => {
    if (isEditing) {
      setAuthor(comment?.author);
      setContent(comment?.description);
    } else {
      setAuthor('');
      setContent('');
      setAvatarId(1)
    }

  }, [isEditing, isReplying, comment?.description, comment?.author]);

  useEffect(() => {
    if (comment?.avatar_id) {
      setAvatarId(comment?.avatar_id)
    }

  }, [isEditing, comment?.avatar_id])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

      setAuthor('');
      setContent('');
      setAvatarId(1)

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
    }

    onUpdate();
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.form  {...FormAnimation()} className={`bg-white rounded-2xl p-5 flex gap-5 items-start relative + ${isReplying && 'ml-5 md:ml-20 before:content-[""] before:absolute before:-top-10 before:bottom-0 before:bg-[#37967f] before:w-1 before:-left-5 md:before:-left-10 before:rounded-sm z-10'}`} onSubmit={handleSubmit}>
        <div className="content grid grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] gap-5 grow">

          {error && <p className='text-red-700 col-span-2'>{error}</p>}
          {success && <p className='text-green-700 col-span-2'>{success}</p>}

          <AnimatePresence mode='popLayout'>
            <motion.div {...AvatarAnimation()} className='relative aspect-square' key={avatarId}>
              <Avatars avatarId={avatarId} setAvatarId={setAvatarId} />
            </motion.div>
          </AnimatePresence>

          <div className={`${!isReplying && 'col-span-2'}`}>
            <input
              placeholder='Auteur'
              className='w-full border border-solid p-4 rounded-lg'
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          {isReplying && (
            <button onClick={closeForm} className='rounded-lg text-[#ee6368] text-sm font-bold flex gap-2 justify-center items-center'>
              <IconClose className='w-3' />
              <span className='hidden md:block'>Fermer</span>
            </button>
          )}

          <div className='col-span-2'>
            <textarea
              placeholder='Commentaire'
              className='w-full border border-solid p-4 rounded-lg'
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button type="submit" className='bg-[#305f53] p-4 rounded-lg text-white text-sm self-start font-bold flex gap-2 justify-center items-center'>
            {isEditing ? (
              <>
                <IconUpdate className='w-3' />
                <span className='hidden md:block'>Actualiser</span>
              </>
            ) : (
              <>
                <IconReplyWhite className='w-3' />
                <span className='hidden md:block'>{isReplying ? 'Répondre' : 'Envoyer'}</span>
              </>
            )}
          </button>
        </div>
      </motion.form>
    </AnimatePresence>
  )
}
