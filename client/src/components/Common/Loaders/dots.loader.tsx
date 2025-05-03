'use client';

import { cn } from '@/lib/utils/cn';

type Props = {
  size?: 'small' | 'medium' | 'large';
  color?: string;
};

const ThreeDotsLoader = ({ size = 'medium', color = 'bg-primary' }: Props) => {
  let sub = 'size-3';
  if (size === 'small') {
    sub = 'size-2';
  } else if (size === 'medium') {
    sub = 'size-3';
  } else {
    sub = 'size-4';
  }

  return (
    <div className="flex items-center gap-1">
      <div
        className={cn(sub, color, 'rounded-full animate-bounce ease-out')}
        style={{ backgroundColor: color ?? '#05BC68' }}
      ></div>
      <div
        className={cn(
          sub,
          color,
          'rounded-full animate-bounce ease-out [animation-delay:0.1s]'
        )}
        style={{ backgroundColor: color ?? '#05BC68' }}
      ></div>
      <div
        className={cn(
          sub,
          color,
          'rounded-full animate-bounce ease-out [animation-delay:0.3s]'
        )}
        style={{ backgroundColor: color ?? '#05BC68' }}
      ></div>
    </div>
  );
};

export default ThreeDotsLoader;
