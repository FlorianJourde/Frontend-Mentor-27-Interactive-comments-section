import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import { Comment } from '@/interfaces/Comment';
import { formatDate } from '@/lib/formatDate'
import CommentForm from './CommentForm';
import DeleteForm from '@/components/DeleteForm';
import { AuthContext } from '@/contexts/AuthorContext';
import IconDelete from '@/public/assets/icons/icon-delete.svg'
import IconEdit from '@/public/assets/icons/icon-edit.svg'
import IconReply from '@/public/assets/icons/icon-reply.svg'
import Image from 'next/image';
import avatarsPath from './AvatarsPath';

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [likedComments, setLikedComments] = useState<{ [key: string]: any }[]>([]);
  const [isDeleteFormVisible, setIsDeleteFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [commentId, setCommentId] = useState<number | null>(null);
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [updateComments, setUpdateComments] = useState(false);
  const sessionId = useContext(AuthContext);

  useEffect(() => {
    fetch('/api/comments')
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments)
      })
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
    setIsEditing(false);
    setIsReplying(true)
    setActiveCommentId(id);
  };

  const handleEditClick = (id: number) => {
    setCommentId(id);
    setIsUpdateFormVisible(true);
    setIsEditing(true);
    setIsReplying(true)
    setActiveCommentId(id);
  };

  const handleCommentsUpdated = () => {
    setUpdateComments((prev) => !prev);
  };

  function handleToggleFormVisibility() {
    setIsUpdateFormVisible((prev) => !prev);
    setIsReplying(true)
  }

  const handleCloseForm = () => {
    setIsDeleteFormVisible(false);
    setCommentId(null);
  };

  const getParentComment = (relatedCommentId: number) => {
    if (relatedCommentId === null) return null;
    const parentComment = comments.find(comment => comment.id === relatedCommentId)

    return parentComment?.author;
  };

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
              <div className='content flex flex-col gap-1'>
                <div className="header flex gap-5 items-center">

                  <Image src={avatarsPath[comment.avatar_id]} alt="" className='rounded-full w-8' />

                  <p>{comment.author}</p>
                  <p className='grow text-gray-500'>{formatDate(comment.created_at)}</p>
                  <div className="actions flex gap-3">
                    {sessionId !== comment.session_id && (
                      <button className='flex gap-2 items-center text-[#305f53] font-bold' onClick={() => handleReplyClick(comment.id)}>
                        <IconReply />
                        Reply
                      </button>
                    )}
                    {sessionId === comment.session_id && (
                      <button className='flex gap-2 items-center text-[#ed6368] font-bold' onClick={() => handleDeleteClick(comment.id)}>
                        <IconDelete />
                        Delete
                      </button>
                    )}
                    {sessionId === comment.session_id && (
                      <button className='flex gap-2 items-center text-[#305f53] font-bold' onClick={() => handleEditClick(comment.id)}>
                        <IconEdit />
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                <div className='description'></div>
                <p>
                  {comment.related_comment && (
                    <span className='font-bold text-[#305f53]'>@{getParentComment(comment.related_comment)} </span>
                  )}
                  {comment.description}</p>
              </div>
            </li>
            {isUpdateFormVisible && activeCommentId === comment.id && (
              <CommentForm comment={comment} onUpdate={handleCommentsUpdated} isEditing={isEditing} isReplying={isReplying} toggleFormVisibility={handleToggleFormVisibility} sessionId={sessionId} />
            )}
            {isDeleteFormVisible && activeCommentId === comment.id && (
              <DeleteForm commentId={comment.id} onClose={handleCloseForm} onUpdate={handleCommentsUpdated} />
            )}
          </>
        ))}
      </ul>

      <CommentForm onUpdate={handleCommentsUpdated} sessionId={sessionId} isReplying={false} />
    </>
  )
}
