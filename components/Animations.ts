export const CommentAnimation = (delay: number) => ({
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { delay: delay }
});

export const FormAnimation = () => ({
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
})

export const AvatarAnimation = () => ({
  initial: { rotate: -360 },
  animate: { rotate: 0 },
  exit: { rotate: 360 },
})

export const ModalAnimation = () => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
})

export const LikesAnimation = (voteType: number[]) => ({
  initial: { opacity: 0, y: voteType[0] },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: voteType[1] },
})