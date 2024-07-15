import React from 'react'

export default function DeleteForm({ commentId, onClose, onUpdate }: { commentId: number, onClose: () => void, onUpdate: () => void }) {

  const handleDelete = async () => {
    if (commentId === null) return;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        body: JSON.stringify({ commentId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      console.log('Comment deleted');
      onUpdate();
      onClose();
    } catch (error: any) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='overlay z-50 fixed top-0 left-0 w-full h-full bg-[hsl(0deg_0%_0%_/_25%)]'>
        <div className=' absolute w-full max-w-[400px] bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-8 flex flex-col gap-5'>
          <h1>Delete comment ?</h1>
          <p>Are you sure you want to delete this comment ? This will remove and can't be undone</p>
          <div className="delete-action flex gap-5">
            <button onClick={onClose} className='grow p-3 rounded-md bg-[#68717e] text-white'>No, cancel</button>
            <button onClick={handleDelete} className='grow p-3 rounded-md bg-[#ee6368] text-white'>Yes, delete</button>
          </div>
        </div>
      </div>
    </>
  )
}
