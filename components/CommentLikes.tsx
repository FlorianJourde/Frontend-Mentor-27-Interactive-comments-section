import { Comment } from '@/interfaces/Comment'
import React, { useState } from 'react'

export default function CommentLikes(
  { comment, comments, setComments }: { comment: Comment, comments: Comment[], setComments: React.Dispatch<React.SetStateAction<Comment[]>> }
) {
  const [likedComments, setLikedComments] = useState<{ [key: string]: any }[]>([]);


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
      } else {
        console.log('Vous avez déjà voté "+" pour ce commentaire !');
      }
    } else {
      if (currentLikes === 0) return false;
      if (!foundComment || currentLikes > foundComment.initialLikes - 1) {
        currentLikes--
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
      <div className='likes flex flex-col bg-[#f5faf5] rounded-xl justify-center items-center p-3'>
        <button className='font-bold text-[#37967f]' onClick={() => updateLikes(comment.id, comment.likes, '+')}>+</button>
        <p className='font-bold text-[#305f53]'>{comment.likes}</p>
        <button className='font-bold text-[#37967f]' onClick={() => updateLikes(comment.id, comment.likes, '-')}>-</button>
      </div>
    </>
  )
}
