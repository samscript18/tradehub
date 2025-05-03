import { ShippingStatus } from '@/lib/enums';
import { cn } from '@/lib/utils/cn';
import React, { FC } from 'react';

interface Props {
  status: ShippingStatus;
}

const ShippingStatusChip: FC<Props> = ({ status }) => {
  return (
    <span
      className={cn(
        'text-[.75rem] px-2 py-1 rounded-md',
        (status === ShippingStatus.DELIVERED ||
          status === ShippingStatus.PICKED_UP ||
          status === ShippingStatus.SHIPPED) &&
          'text-blue-700 bg-blue-50',
        status === ShippingStatus.AWAITING_SHIPPING &&
          'text-amber-700 bg-amber-50',
        status === ShippingStatus.RETURNED && 'text-red-700 bg-red-50'
      )}
    >
      {status}
    </span>
  );
};

export default ShippingStatusChip;
