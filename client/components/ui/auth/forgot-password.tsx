'use client';
import Button from '@/components/common/button';
import BackButton from '@/components/common/button/back-button';
import TextField from '@/components/common/inputs/text-field';
import Logo from '@/components/common/logo';
import { requestForgotPasswordLink } from '@/lib/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Input = {
  credential: string;
};

const ForgotPasswordPage = () => {
  const [linkSent, setLinkSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const { mutateAsync: _forgotPassword, isPending: _loading } = useMutation({
    mutationKey: ['auth', 'forgot-password'],
    mutationFn: requestForgotPasswordLink,
    onSuccess() {
      setLinkSent(true);
      toast.success('Password reset link sent successfully');
    },
  });

  const submit = async (e: Input) => {
    setLinkSent(false);
    _forgotPassword(e.credential);
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="md:rounded-md p-8 border bg-gray-50 w-screen max-w-[600px] mx-auto max-md:min-h-screen">
        <header>
          <div className="max-w-fit md:mb-4 mb-10 flex items-center gap-2">
            <BackButton />
            <Logo />
          </div>
          {!linkSent && (
            <>
              <h1 className="md:text-2xl text-xl font-bold">Forgot Password</h1>
              <p className="text-[.9rem] text-gray-600 mt-1">
                Enter your credential to receive a password reset link via
                email.
              </p>
            </>
          )}
        </header>

        {!linkSent ? (
          <form onSubmit={handleSubmit(submit)} className="space-y-8 mt-8">
            <TextField
              label="Email or phone number"
              InputProps={{
                placeholder: 'e.g adejaredaniel12@gmail.com/08023720580',
                disabled: _loading,
                ...register('credential', {
                  required: {
                    value: true,
                    message: 'This field is required',
                  },
                }),
              }}
              helperText={errors?.credential?.message}
            />

            <Button variant="filled" size="medium" fullWidth loading={_loading}>
              Request password reset link
            </Button>
          </form>
        ) : (
          <div className="mt-8 space-y-2">
            <h1 className="md:text-2xl text-xl font-bold ">Link sent ✅</h1>
            <p className="text-[.9rem] text-gray-600 mt-1">
              Password reset link has been sent successfully to your email
            </p>

            <p
              className="cursor-pointer text-primary text-[.9rem] font-semibold underline"
              onClick={handleSubmit(submit)}
            >
              Resend link
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
