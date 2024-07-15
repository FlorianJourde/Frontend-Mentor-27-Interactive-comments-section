import React from 'react'

import { useEffect, useState } from 'react';
import { Comment } from '@/interfaces/comment';
import { formatDate } from '@/lib/formatDate'
import Delete from '@/components/DeleteForm';
import CommentSubmitForm from './CommentSubmitForm';
import CommentReplyForm from './CommentReplyForm';
import DeleteForm from '@/components/DeleteForm';

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [parentComments, setParentComments] = useState<Comment[]>([]);
  const [isDeleteFormVisible, setIsDeleteFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentId, setCommentId] = useState<number | null>(null);
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [updateComments, setUpdateComments] = useState(false);

  useEffect(() => {
    fetch('/api/comments')
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments)
        // setParentComments(data.comments.id)
      })
      .catch((error) => console.error('Error fetching comments:', error));

    // console.log(comments);
    // fetch('/api/comments/[id]')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // setParentComments(data.comments)
    //     console.log(data);

    //   })
    //   .catch((error) => console.error('Error fetching comments:', error));

    // }, [updateComments]);
  }, [updateComments]);

  // useEffect(() => {
  //   // console.log(comments);

  //   // getParentComment(comment.related_comment)}</p>
  //   // comments.find(x => x.id === '45').foo;
  //   // fetch(`/api/comments/${commentId}`)
  //   //   .then((response) => response.json())
  //   //   .then((data) => {
  //   //     // console.log(data);
  //   //     // setParentComments(data.comments)
  //   //     // console.log(data);

  //   //   })
  //   //   .catch((error) => console.error('Error fetching comments:', error));


  //   async function getParentComment(id: number) {
  //     if (commentId === null) return;

  //     try {
  //       const response = await fetch(`/api/comments/${commentId}`, {
  //         method: 'GET',
  //         body: JSON.stringify({ commentId }),
  //       });

  //       // if (!response.ok) {
  //       //   throw new Error('Failed to delete comment');
  //       // }

  //       // console.log('Comment deleted');
  //       // onUpdate();
  //       // onClose();
  //     } catch (error: any) {
  //       console.error('Error:', error);
  //     }
  //   };

  // }, [comments]);

  const handleDeleteClick = (id: number) => {
    setCommentId(id);
    setIsDeleteFormVisible(true);
    setActiveCommentId(id);
  };

  const handleReplyClick = (id: number) => {
    setCommentId(id);
    setIsUpdateFormVisible(true);
    setIsEditing(false);
    setActiveCommentId(id);
  };

  const handleEditClick = (id: number) => {
    setCommentId(id);
    setIsUpdateFormVisible(true);
    setIsEditing(true);
    setActiveCommentId(id);
  };

  const handleCommentsUpdated = () => {
    setUpdateComments((prev) => !prev);
    // handleToggleFormVisibility()
  };

  function handleToggleFormVisibility() {
    setIsUpdateFormVisible((prev) => !prev);
  }

  const handleCloseForm = () => {
    setIsDeleteFormVisible(false);
    setCommentId(null);
  };

  // function findParentComment(id: number | null) {
  //   // console.log(id);
  //   console.log('test');


  //   // setParentComments(id)
  // }


  const getParentComment = (relatedCommentId: number) => {
    if (relatedCommentId === null) return null;
    // console.log(comments);
    const parentComment = comments.find(comment => comment.id === relatedCommentId)
    // console.log(comments.find(comment => comment.id === relatedCommentId));

    console.log(parentComment?.author);

    return parentComment?.author;
    // return parentComments[relatedCommentId] || 'Loading...';
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
      <header>
        <h1 className='text-[100px] leading-none font-bold text-[#305f53]'>Webask</h1>
        <h2 className='text-2xl font-semibold text-[#37967f]'>Ask questions about web development !</h2>
      </header>
      <ul className='flex flex-col gap-5'>
        {comments.map((comment) => (
          <>
            <li key={`${comment.id}-${comment.author}`} className={`bg-white p-5 rounded-2xl grid grid-cols-[minmax(0,_50px),_minmax(0,_1fr)] gap-5 shadow-sm  + ${comment.related_comment ? 'reply ml-20 relative before:content-[""] before:absolute before:-top-10 before:bottom-0 before:bg-[#37967f] before:w-1 before:-left-10 before:rounded-sm z-10' : 'z-20'}`}>
              <div className='likes flex flex-col bg-[#f5faf5] rounded-xl justify-center items-center p-3'>
                <button className='font-bold text-[#37967f]' onClick={() => updateLikes(comment.id, comment.likes, '+')}>+</button>
                <p className='font-bold text-[#305f53]'>{comment.likes}</p>
                <button className='font-bold text-[#37967f]' onClick={() => updateLikes(comment.id, comment.likes, '-')}>-</button>
              </div>
              <div className='content'>
                <div className="header flex gap-5">
                  <p>{comment.author}</p>
                  <p className='grow text-gray-500'>{formatDate(comment.created_at)}</p>
                  <div className="actions flex gap-3">
                    <button onClick={() => handleReplyClick(comment.id)}>Reply</button>
                    <button onClick={() => handleDeleteClick(comment.id)}>Delete</button>
                    <button onClick={() => handleEditClick(comment.id)}>Edit</button>
                  </div>
                </div>
                <div className='description'></div>
                {/* <p>{getParentComment(comment.related_comment)}</p> */}
                {/* <p>{comment.related_comment}</p> */}
                {/* <p getParentComment={getParentComment(0)}>{comment.related_comment}</p> */}
                {/* {comment.related_comment && (
                <p>{getParentComment(comment.related_comment)}</p>
                )} */}
                {/* {comment.related_comment && (
                  <p>{comment[comment.related_comment].description}</p>
                )} */}
                {/* <div findParentComment={(0)}>Bonjour</div> */}
                {/* <p findParentComment={() => findParentComment(comment.related_comment)}></p> */}
                <p>
                  {comment.related_comment && (
                    <span className='font-bold text-[#305f53]'>@{getParentComment(comment.related_comment)} </span>
                  )}
                  {comment.description}</p>
              </div>
            </li>
            {isUpdateFormVisible && activeCommentId === comment.id && (
              <CommentReplyForm comment={comment} onUpdate={handleCommentsUpdated} isEditing={isEditing} toggleFormVisibility={handleToggleFormVisibility} />
            )}
            {isDeleteFormVisible && activeCommentId === comment.id && (
              <DeleteForm commentId={comment.id} onClose={handleCloseForm} onUpdate={handleCommentsUpdated} />
            )}
          </>
        ))}
      </ul>
      <CommentSubmitForm onUpdate={handleCommentsUpdated} />
    </>
  )
}
