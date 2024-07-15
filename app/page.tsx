'use client'

import Background from '@/components/Background';
import Comments from '@/components/Comments';

export default function Home() {
  return (
    <>
      <Background />
      <main className='flex flex-col gap-12'>
        <div className='wrapper'>
          <Comments />
        </div>
      </main>
    </>
  );
}
