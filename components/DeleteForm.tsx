import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'
import { ModalAnimation } from './Animations';
import IconDelete from '@/public/assets/icons/icon-delete-white.svg'
import IconClose from '@/public/assets/icons/icon-close-white.svg'


export default function DeleteForm({ commentId, handleCloseModal, onUpdate }: { commentId: number, handleCloseModal: () => void, onUpdate: () => void, isDeleteModalVisible: boolean }) {

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

      onUpdate();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to delete comment');
    }
  };

  return (
    <>
      <AnimatePresence mode='wait'>
        <motion.div {...ModalAnimation()} className='overlay z-50 fixed top-0 left-0 w-full h-full bg-[hsl(0deg_0%_0%_/_50%)]'>
          <div className={`absolute w-[calc(100%-40px)] md:w-full max-w-[400px] bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-8 flex flex-col gap-5`}>
            <h2 className='font-bold text-xl'>Supprimer le commentaire ?</h2>
            <p>Êtes-vous sûr de vouloir supprimer ce commentaire ? Cette opération est irréversible.</p>
            <div className="delete-action flex gap-5">

              <button onClick={handleCloseModal} className='grow p-3 rounded-md bg-[#68717e] text-white flex gap-2 justify-center items-center'>
                <IconClose className='w-3' />
                <span>Annuler</span>
              </button>

              <button onClick={handleDelete} className='grow p-3 rounded-md bg-[#ee6368] text-white flex gap-2 justify-center items-center'>

                <IconDelete className='w-3' />
                <span>Supprimer</span>

              </button>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
