'use client'

import Background from '@/components/Background';
import Comments from '@/components/Comments';
import { AuthProvider } from '@/contexts/AuthorContext';

export default function Home() {
  return (
    <>
      <Background />
      <main className='flex flex-col gap-12 break-words'>
        <div className='wrapper'>
          <AuthProvider>
            <Comments />
          </AuthProvider>
        </div>
      </main>
    </>
  );
}
