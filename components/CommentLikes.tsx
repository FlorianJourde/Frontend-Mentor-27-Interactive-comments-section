import { Comment } from '@/interfaces/Comment'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'
import { LikesAnimation } from './Animations';

export default function CommentLikes(
  { comment, comments, setComments }: { comment: Comment, comments: Comment[], setComments: React.Dispatch<React.SetStateAction<Comment[]>> }
) {
  const [likedComments, setLikedComments] = useState<{ [key: string]: any }[]>([]);
  const [isLikeUpvote, setIsLikeUpvote] = useState(false)

  const updateLikes = async (commentId: number, currentLikes: number, buttonPressed: string) => {
    const exists = likedComments.some(item => item.id === commentId);
    const foundComments = comments.find(comment => comment.id === commentId);

    if (!exists) {
      const likedItems = {
        ...foundComments,
        initialLikes: currentLikes
      };

      setLikedComments([...likedComments, likedItems]);
    }

    const foundComment = likedComments.find(comment => comment.id === commentId);

    if (buttonPressed === '+') {
      if (!foundComment || currentLikes < foundComment.initialLikes + 1) {
        currentLikes++
        setIsLikeUpvote(true)
      } else {
        console.log('Vous avez déjà voté "+" pour ce commentaire !');
      }
    } else {
      if (currentLikes === 0) return false;
      if (!foundComment || currentLikes > foundComment.initialLikes - 1) {
        currentLikes--
        setIsLikeUpvote(false)
      } else {
        console.log('Vous avez déjà voté "-" pour ce commentaire !');
      }
    }

    const response = await fetch('/api/comments/[id]/likes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentLikes, commentId }),
    })

    if (response.ok) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, likes: currentLikes } : comment
        )
      );
    } else {
      console.error('Failed to update likes');
    }
  };

  return (
    <>
      <div className='likes flex flex-col bg-[#f8f3e9] rounded-xl justify-center items-center p-3'>
        <button className='font-bold text-[#37967f]' onClick={() => updateLikes(comment.id, comment.likes, '+')}>+</button>
        <AnimatePresence mode='wait'>
          <motion.p {...LikesAnimation(isLikeUpvote ? [-5, 5] : [5, -5])} className='font-bold text-[#305f53]' key={comment.likes}>{comment.likes}</motion.p>
        </AnimatePresence>
        <button className='font-bold text-[#37967f]' onClick={() => updateLikes(comment.id, comment.likes, '-')}>-</button>
      </div>
    </>
  )
}
