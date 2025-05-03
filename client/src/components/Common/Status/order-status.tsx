import { OrderStatus } from '@/lib/enums';
import { cn } from '@/lib/utils/cn';
import React, { FC } from 'react';

interface Props {
  status: OrderStatus;
}

const OrderStatusChip: FC<Props> = ({ status }) => {
  return (
    <span
      className={cn(
        'text-[.75rem] px-2 py-1 rounded-md',
        status === OrderStatus.COMPLETED && 'text-green-700 bg-green-50',
        status === OrderStatus.OPEN && 'text-blue-700 bg-blue-50',
        status === OrderStatus.PROCESSING && 'text-amber-700 bg-amber-50',
        status === OrderStatus.CANCELLED && 'text-red-700 bg-red-50'
      )}
    >
      {status}
    </span>
  );
};

export default OrderStatusChip;
