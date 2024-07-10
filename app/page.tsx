'use client'

import Comments from '@/components/Comments';

export default function Home() {
  return (
    <main className='flex flex-col gap-5'>
      <div className='wrapper'>
        <Comments />
      </div>
    </main>
  );
}
