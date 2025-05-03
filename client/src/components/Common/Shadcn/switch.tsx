'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { VariantProps, tv } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const switchVariants = tv({
  base: 'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      default: 'bg-gray-200 data-[state=checked]:bg-secondary',
      outline:
        'border border-gray-300 bg-transparent data-[state=checked]:border-secondary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const switchThumbVariants = tv({
  base: 'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-5',
});

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(switchVariants({ variant }), className)}
    {...props}
  >
    <SwitchPrimitives.Thumb className={switchThumbVariants()} />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
