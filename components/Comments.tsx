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
import CommentLikes from './CommentLikes';
import { AnimatePresence, delay, motion, useAnimation, useInView } from 'framer-motion';
import { CommentAnimation } from './Animations';
import { Limelight } from "next/font/google";

const limelight = Limelight({
  weight: '400',
  subsets: ['latin'],
})

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [commentId, setCommentId] = useState<number | null>(null);
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [updateComments, setUpdateComments] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)
  const sessionId = useContext(AuthContext);

  useEffect(() => {
    fetch('/api/comments')
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments)
      })
      .catch((error) => console.error('Error fetching comments:', error));

  }, [updateComments, isReplyFormVisible, isDeleteModalVisible]);

  useEffect(() => {
    let delay = 100

    if (comments.length > 0) {
      let totalDelay = delay * comments.length

      setTimeout(() => {
        setIsCommentsLoading(false)

      }, totalDelay);
    }
  }, [comments]);

  const handleDeleteClick = (id: number) => {
    setCommentId(id);
    setIsDeleteModalVisible(true);
    setActiveCommentId(id);
  };

  const handleReplyClick = (id: number) => {
    setCommentId(id);
    setIsReplyFormVisible(true);
    setIsEditing(false);
    setIsReplying(true)
    setActiveCommentId(id);
  };

  const handleEditClick = (id: number) => {
    setCommentId(id);
    setIsReplyFormVisible(true);
    setIsEditing(true);
    setIsReplying(true)
    setActiveCommentId(id);
  };

  const handleCommentsUpdated = () => {
    setIsReplyFormVisible(false)
    setUpdateComments((prev) => !prev);
  };


  const handleCloseModal = () => {
    setIsDeleteModalVisible(false);
  }

  const handleCloseForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsReplyFormVisible(false)
    setCommentId(null);
  };

  const getParentComment = (relatedCommentId: number) => {
    if (relatedCommentId === null) return null;
    const parentComment = comments.find(comment => comment.id === relatedCommentId)

    return parentComment?.author;
  };

  return (
    <>
      <header>
        <h1 className={`${limelight.className} + text-6xl sm:text-[80px] md:text-[150px] leading-none font-bold text-[#305f53] text-center`}>Webask</h1>
        <h2 className='text-2xl font-semibold text-[#37967f] text-center'>Ask questions about web development !</h2>
      </header>
      <ul className='flex flex-col gap-5'>
        {comments.map((comment, index) => (
          <AnimatePresence mode='wait' key={`${comment.id}-${comment.author}`}>
            <motion.li {...CommentAnimation(isCommentsLoading ? index * .1 : 0)} className={`bg-white p-5 rounded-2xl grid grid-cols-[minmax(0,_50px),_minmax(0,_1fr)] gap-5 shadow-sm  + ${comment.related_comment ? 'reply ml-5 md:ml-20 relative before:content-[""] before:absolute before:-top-10 before:bottom-0 before:bg-[#37967f] before:w-1 before:-left-5 md:before:-left-10 before:rounded-sm z-10' : 'z-20'}`}>

              <CommentLikes comment={comment} comments={comments} setComments={setComments} />

              <div className='content flex flex-col gap-1'>
                <div className="header flex gap-5 items-center flex-wrap">

                  <Image src={avatarsPath[comment.avatar_id]} alt="" className='rounded-full w-8' />

                  <div className="author-date flex flex-col sm:flex-row gap-1 md:gap-3 grow">
                    <p>{comment.author}</p>
                    <p className='grow text-gray-500'>{formatDate(comment.created_at)}</p>
                  </div>
                  <div className="actions flex flex-col sm:flex-row gap-5">
                    {sessionId !== comment.session_id && (
                      <button className='flex gap-2 items-center text-[#305f53] font-bold' onClick={() => handleReplyClick(comment.id)}>
                        <IconReply />
                        <span className='hidden md:block'>
                          Reply
                        </span>
                      </button>
                    )}
                    {sessionId === comment.session_id && (
                      <button className='flex gap-2 items-center text-[#ed6368] font-bold' onClick={() => handleDeleteClick(comment.id)}>
                        <IconDelete />
                        <span className='hidden md:block'>
                          Delete
                        </span>
                      </button>
                    )}
                    {sessionId === comment.session_id && (
                      <button className='flex gap-2 items-center text-[#305f53] font-bold' onClick={() => handleEditClick(comment.id)}>
                        <IconEdit />
                        <span className='hidden md:block'>
                          Edit
                        </span>
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

            </motion.li>

            {isReplyFormVisible && activeCommentId === comment.id && (
              <CommentForm comment={comment} onUpdate={handleCommentsUpdated} isEditing={isEditing} isReplying={isReplying} closeForm={handleCloseForm} sessionId={sessionId} />
            )}

            {isDeleteModalVisible && activeCommentId === comment.id && (
              <DeleteForm commentId={comment.id} handleCloseModal={handleCloseModal} onUpdate={handleCommentsUpdated} isDeleteModalVisible={isDeleteModalVisible} />
            )}
          </AnimatePresence>
        ))}
      </ul>

      <CommentForm onUpdate={handleCommentsUpdated} sessionId={sessionId} isReplying={false} />
    </>
  )
}
