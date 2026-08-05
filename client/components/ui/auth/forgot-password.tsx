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
import { motion, AnimatePresence } from 'framer-motion';

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
    <main className="flex items-center justify-center min-h-screen bg-[#090d12] px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-primary/10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none z-0" />

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[480px] p-6 md:p-8 bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Top subtle glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <header>
          <div className="max-w-fit mb-6 flex items-center gap-3">
            <BackButton />
            <Logo />
          </div>

          <AnimatePresence mode="wait">
            {!linkSent ? (
              <motion.div
                key="request-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl md:text-2xl font-bold text-white">Forgot Password</h1>
                <p className="text-xs md:text-sm text-slate-400 mt-2 leading-relaxed">
                  Enter your email or phone number to receive a password reset link.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="sent-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  Link sent <span className="text-green-500">✓</span>
                </h1>
                <p className="text-xs md:text-sm text-slate-400 mt-2 leading-relaxed">
                  We have sent a password reset link to your registered email address.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <AnimatePresence mode="wait">
          {!linkSent ? (
            <motion.form
              key="request-form"
              onSubmit={handleSubmit(submit)}
              className="space-y-6 mt-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <TextField
                label="Email or phone number"
                InputProps={{
                  placeholder: 'e.g. johndoe@gmail.com / 08023720580',
                  disabled: _loading,
                  ...register('credential', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  }),
                  className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
                }}
                helperText={errors?.credential?.message}
              />

              <Button
                variant="filled"
                size="medium"
                fullWidth
                loading={_loading}
                className="bg-primary hover:bg-primary/95 text-white py-3 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-300"
              >
                Request password reset link
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="sent-confirmation"
              className="mt-8 space-y-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <p
                className="cursor-pointer text-primary hover:text-primary/95 text-sm font-semibold hover:underline inline-block transition-colors"
                onClick={handleSubmit(submit)}
              >
                Resend link
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </main>
  );
};

export default ForgotPasswordPage;
