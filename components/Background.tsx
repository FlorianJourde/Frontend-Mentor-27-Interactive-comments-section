import React from 'react'
import Abstract1 from '@/public/assets/abstract/abstract-1.svg';
import Abstract2 from '@/public/assets/abstract/abstract-2.svg';
import Abstract3 from '@/public/assets/abstract/abstract-3.svg';
import Leaf1 from '@/public/assets/leaves/leaf-1.svg';
import Leaf4 from '@/public/assets/leaves/leaf-4.svg';
import Leaf6 from '@/public/assets/leaves/leaf-6.svg';
import Leaf7 from '@/public/assets/leaves/leaf-7.svg';

export default function Background() {
  return (
    <>
      <div className="background absolute w-full h-full top-0 left-0 overflow-hidden bg-[url('/assets/patterns/dot-pattern.png')] bg-[length:100px_100px] bg-repeat bg-center">
        <Abstract1 className='absolute w-[1000px] top-12 left-[calc(50%-500px)]  fill-[#ddf3ec]' />
        <Abstract2 className='absolute w-[900px] -bottom-12 left-[calc(50%-500px)]   fill-[#ddf3ec]' />
        <Abstract3 className='absolute w-[400px] top-[calc(40%)] left-[calc(50%-600px)]  fill-[#ddf3ec]' />
        <Leaf1 className='absolute w-[400px] -bottom-12 right-[calc(50%+300px)]  fill-[#9fdfce]' />
        <Leaf7 className='absolute w-[400px] top-12 right-[calc(50%+300px)]  fill-[#9fdfce]' />
        <Leaf4 className='absolute h-[600px] top-10 left-[calc(50%+300px)] fill-[#9fdfce]' />
        <Leaf6 className='absolute h-[700px] bottom-24 left-[calc(50%+200px)] fill-[#9fdfce]' />
      </div>
    </>
  )
}
