import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-6 py-12'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute -top-24 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-200/45 to-violet-200/35 blur-3xl' />
        <div className='absolute inset-0 dot-grid opacity-40' />
      </div>

      <div className='w-full max-w-md text-center reveal'>
        <div className='mb-6 inline-flex brand-tile h-16 w-16'>
          <GraduationCap className='h-8 w-8' strokeWidth={2.2} />
        </div>
        <p className='text-6xl font-semibold tracking-tight text-slate-900'>404</p>
        <h1 className='mt-4 text-2xl font-semibold tracking-tight text-slate-900'>
          Page not found
        </h1>
        <p className='mt-2 text-sm text-slate-500'>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link to='/' className='btn btn-primary btn-lg mt-8'>
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
