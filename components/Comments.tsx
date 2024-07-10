import React from 'react'

import { useEffect, useState } from 'react';
import { Comment } from '@/interfaces/comment';
import { formatDate } from '@/lib/formatDate'
import Delete from '@/components/DeleteForm';
// import Textarea from './CommentSubmitForm';
import CommentSubmitForm from './CommentSubmitForm';
import CommentReplyForm from './CommentReplyForm';
import DeleteForm from '@/components/DeleteForm';
// import Delete from './Delete';

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isDeleteFormVisible, setIsDeleteFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [commentId, setCommentId] = useState<number | null>(null);
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [updateComments, setUpdateComments] = useState(false);

  useEffect(() => {
    fetch('/api/comments')
      .then((response) => response.json())
      .then((data) => setComments(data.comments))
      .catch((error) => console.error('Error fetching comments:', error));
  }, [updateComments]);

  const handleDeleteClick = (id: number) => {
    setCommentId(id);
    setIsDeleteFormVisible(true);
    setActiveCommentId(id);
  };

  const handleReplyClick = (id: number) => {
    setCommentId(id);
    setIsUpdateFormVisible(true);
    // setActiveCommentId(null);
    setActiveCommentId(id);
  };

  // const handleCommentsUpdated = (id: number) => {
  const handleCommentsUpdated = () => {
    setUpdateComments((prev) => !prev);
    // setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    // setComments((prevComments) => prevComments.filter((comment) => comment.id));
    // setIsFormVisible(false);
    // setCommentId(null);
  };


  const handleCommentDeleted = (id: number) => {
    // setUpdateComments((prev) => !prev);
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));

  }

  const handleCloseForm = () => {
    setIsDeleteFormVisible(false);
    setCommentId(null);
  };

  const updateLikes = async (commentId: number, currentLikes: number, buttonPressed: string) => {
    if (buttonPressed === '+') {
      currentLikes++
    } else {
      currentLikes--
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
      <h1>Comments</h1>
      <ul className='flex flex-col gap-5'>
        {comments.map((comment) => (
          <>
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
                  <div className="actions flex gap-3">
                    {/* <button>Reply</button> */}
                    <button onClick={() => handleReplyClick(comment.id)}>Reply</button>
                    {/* {isUpdateFormVisible && <CommentReplyForm commentId={comment.id} onUpdate={handleCommentsUpdated} />} */}
                    {/* <button>Delete</button> */}
                    {/* <Delete /> */}
                    <button onClick={() => handleDeleteClick(comment.id)}>Delete</button>
                    {/* {isDeleteFormVisible && <DeleteForm commentId={comment.id} onClose={handleCloseForm} onUpdate={handleCommentDeleted} />} */}
                    {isDeleteFormVisible && activeCommentId === comment.id && (
                      <DeleteForm commentId={comment.id} onClose={handleCloseForm} onUpdate={handleCommentsUpdated} />
                    )}

                    <button>Edit</button>
                  </div>
                </div>
                <div className='description'></div>
                <p>{comment.description}</p>
              </div>
            </li>
            {isUpdateFormVisible && activeCommentId === comment.id && ( 
              <CommentReplyForm commentId={comment.id} onUpdate={handleCommentsUpdated} />
              )}
          </>
        ))}
      </ul>
      <CommentSubmitForm onUpdate={handleCommentsUpdated} />
    </>
  )
}
