'use client'

import Comments from '@/components/Comments';
// import Textarea from '@/components/Textarea';

export default function Home() {
  return (
    <main className='flex flex-col gap-5'>
      <div className='wrapper'>
        <Comments />
      </div>
    </main>
  );
}
