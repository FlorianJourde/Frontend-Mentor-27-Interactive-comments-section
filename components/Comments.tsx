import React from 'react'

import { useEffect, useState } from 'react';
import { Comment } from '@/interfaces/comment';
import { formatDate } from '@/lib/formatDate'

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch('/api/comments')
      .then((response) => response.json())
      .then((data) => setComments(data.comments))
      .catch((error) => console.error('Error fetching comments:', error));
  }, []);

  const updateLikes = async (commentId: number, currentLikes: number, buttonPressed: string) => {
    if (buttonPressed === '+') {
      currentLikes++
    } else {
      currentLikes--
    }

    console.log(currentLikes);

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
      <h1>Comments</h1>
      <ul className='flex flex-col gap-5'>
        {comments.map((comment) => (
          <li key={comment.id} className='bg-white p-5 rounded-2xl grid grid-cols-[minmax(0,_50px),_minmax(0,_1fr)] gap-5'>
            <div className='likes flex flex-col bg-[#f5f6fa] rounded-xl justify-center items-center p-3'>
              <button onClick={() => updateLikes(comment.id, comment.likes, '+')}>+</button>
              <p>{comment.likes}</p>
              <button onClick={() => updateLikes(comment.id, comment.likes, '-')}>-</button>
            </div>
            <div className='content'>
              <div className="header flex gap-5">
                <p>{comment.author}</p>
                {/* <p>{comment.createdAt}</p> */}
                {/* <p>{comment.createdAt}</p> */}
                <p className='grow'>{formatDate(comment.created_at)}</p>

                <button>Edit</button>
              </div>
              <div className='description'></div>
              <p>{comment.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
