'use client';
import BackButton from '@/components/Common/Button/back-button';
import React from 'react';

const Skeleton = () => {
  return (
    <section className="space-y-8 p-4 md:p-6">
      <div className="flex items-center gap-2">
        <BackButton />
        <div className="col-span-3 rounded-md shadow-md animate-pulse h-[40px] bg-gray-50 border flex-1"></div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 rounded-md shadow-md animate-pulse h-[350px] bg-gray-50 border"></div>
        <div className="col-span-1 rounded-md shadow-md animate-pulse h-[350px] bg-gray-50 border"></div>
        <div className="col-span-2 rounded-md shadow-md animate-pulse h-[350px] bg-gray-50 border"></div>
        <div className="col-span-1 rounded-md shadow-md animate-pulse h-[350px] bg-gray-50 border"></div>
        <div className="col-span-1 rounded-md shadow-md animate-pulse h-[350px] bg-gray-50 border"></div>
      </div>
    </section>
  );
};

export default Skeleton;
