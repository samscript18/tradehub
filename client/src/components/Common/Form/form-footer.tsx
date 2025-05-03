'use client';
import React, { FC, ReactNode } from 'react';
import Button from '../Button';
import { useRouter } from 'next/navigation';

interface Props {
  onCancel?(): void;
  onReset?(): void;
  submitButton: ReactNode;
}

const FormFooter: FC<Props> = ({ onCancel, onReset, submitButton }) => {
  const router = useRouter();

  return (
    <footer className="sticky bottom-0 left-0 w-full max-md:p-2 py-3 px-6 shadow-md border-t-[1.5px] bg-primary text-white flex items-center justify-between">
      <Button
        type="button"
        size="medium"
        variant="outline"
        className="text-white border-white"
        onClick={() => {
          router.back();
          onCancel?.();
        }}
      >
        Cancel
      </Button>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="medium"
          variant="filled"
          className="bg-white text-primary hover:bg-white"
          onClick={onReset}
        >
          Clear fields
        </Button>

        {submitButton}
      </div>
    </footer>
  );
};

export default FormFooter;
