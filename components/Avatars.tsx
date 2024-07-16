import React, { useEffect } from 'react'
import Image from 'next/image'
import avatarsPath from './AvatarsPath';

export default function Avatars({ avatarId, setAvatarId }: { avatarId: number, setAvatarId: React.Dispatch<React.SetStateAction<number>> }) {

  const handleAvatarChange = () => {
    if (avatarId === 24) {
      setAvatarId(1)
    } else {
      setAvatarId((prevNumber) => (prevNumber + 1) % Object.keys(avatarsPath).length);
    }
  }

  return (
    <>
      <Image src={avatarsPath[avatarId]} onClick={handleAvatarChange} alt="" className='rounded-full absolute top-0 left-0 w-full h-full cursor-pointer' />
    </>
  )
}
