import { DiscountStatus } from '@/lib/enums';
import { cn } from '@/lib/utils/cn';
import React, { FC } from 'react';

interface Props {
  status: DiscountStatus;
}

const DiscountStatusChip: FC<Props> = ({ status }) => {
  return (
    <span
      className={cn(
        'text-[.75rem] px-2 py-1 rounded-md',
        status === DiscountStatus.ACTIVE && 'text-green-700 bg-green-50',
        status === DiscountStatus.INACTIVE && 'text-red-700 bg-red-50',
        status === DiscountStatus.EXPIRED && 'text-red-700 bg-red-50'
      )}
    >
      {status}
    </span>
  );
};

export default DiscountStatusChip;
