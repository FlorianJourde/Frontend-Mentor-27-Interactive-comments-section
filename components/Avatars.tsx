import React from 'react'
import Image from 'next/image'
import avatarsPath from './AvatarsPath';
// import * as Avatars from '@/public/assets/avatars'

// import Image from 'next/image'

// const images = require.context('../../images', true);
// const imageList = images.keys().map(image => images(image));

export default function Avatars({ avatarId, setAvatarId }: { avatarId: number, setAvatarId: React.Dispatch<React.SetStateAction<number>> }) {

  // function importAll(r) {
  //   return r.keys().map(r);
  // }

  // const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));
  // const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

  const handleAvatarChange = () => {
    // let currentAvatarId = avatarId;
    // console.log('');
    // let newAvatarId = currentAvatarId++
    // currentAvatarId++
    // setAvatarId(currentAvatarId)
    // console.log(avatarId);

    // setAvatarId((prevNumber: number) => prevNumber + 1);

    // if (e.type === 'click') {
    //   console.log('Left click');
    // } else if (e.type === 'contextmenu') {
    //   console.log('Right click');
    // }

    // setAvatarId((prevNumber) => (prevNumber + 1) % Object.keys(avatarsPath).length);
    if (avatarId === 24) {
      setAvatarId(1)
    } else {
      setAvatarId((prevNumber) => (prevNumber + 1) % Object.keys(avatarsPath).length);
    }
    // console.log(avatarId);
  }

  return (
    <>
      {/* <div>Avatars</div> */}
      {/* <img src="" alt="" /> */}
      {/* <Image src={Avatar1} onClick={handleAvatarChange} alt="" className='rounded-full absolute top-0 left-0 w-full h-full cursor-pointer' /> */}
      <Image src={avatarsPath[avatarId]} onClick={handleAvatarChange} alt="" className='rounded-full absolute top-0 left-0 w-full h-full cursor-pointer' />
    </>
  )
}
