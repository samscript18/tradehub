"use client";
import { RegisterType } from "@/lib/@types/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowLeft, FaEyeSlash, FaRegEye } from "react-icons/fa";
import AccountReviews from "./reviews";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import {
  setupPassword,
  signUp,
  verifyEmail,
} from "@/lib/services/auth.service";
import { LuShoppingBag } from "react-icons/lu";

const MAX_STEPS = 4;

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterType>({
    defaultValues: {
      phoneNumber: "+234",
    },
  });

  const [code, setCode] = useState("");
  const [codeConfirmed, setCodeConfirmed] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const email = watch("email");

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const router = useRouter();

  const { mutate: signUpMutate, isPending: signingUp } = useMutation({
    mutationFn: signUp,
    mutationKey: ["signUp"],
  });

  const { mutate: verifyEmailMutate, isPending: verifyingEmail } = useMutation({
    mutationFn: verifyEmail,
    mutationKey: ["verifyEmail"],
  });

  const { mutate: setupPasswordMutate, isPending: settingUpPassword } =
    useMutation({
      mutationFn: setupPassword,
      mutationKey: ["setupPassword"],
    });


  const submit: SubmitHandler<RegisterType> = async (data) => {
    signUpMutate(data, {
      onSuccess: () => {
        setStep((prev) => prev + 1);
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
  };

  const handleCodeConfirmation = () => {
    verifyEmailMutate(
      { email, token: code },
      {
        onSuccess: (data) => {
          toast.success("Email confirmed successfully");
          setCodeConfirmed(true);

          // setOnboardingData({ data });
          setStep((prev) => prev + 1);
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleCreatePassword = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setupPasswordMutate(
      // { password, token: `${data?.accessToken}` },
      { password, token:`` },
      {
        onSuccess: () => {
          toast.success("Password created successfully");
          setStep((prev) => prev + 1);
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      }
    );
  };

  const renderRegisterForm = () => {
    switch (step) {
      case 1:
        return (
          <motion.form
            className="space-y-3"
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(submit)}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm" htmlFor="email">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-4 rounded-lg border  ${
                    errors.firstName ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="John"
                  {...register("firstName", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm" htmlFor="email">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-4 rounded-lg border  ${
                    errors.lastName ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Doe"
                  {...register("lastName", { required: true })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-4 rounded-lg border  ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="johndoe@gmail.com"
                  {...register("email", { required: true })}
                />
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-sm" htmlFor="email">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex items-center rounded-lg focus-within:ring ring-gray-200 px-4 border ${
                    errors?.phoneNumber ? "border-red-500" : "border-gray-200"
                  } duration-300`}
                >
                  <div className="cursor-none flex items-center gap-2 text-gray-400">
                    <Image
                      src={"/svgs/nigeria-flag.svg"}
                      width={24}
                      height={24}
                      alt="flag"
                    />

                    <p>|</p>
                  </div>

                  <input
                    type="text"
                    placeholder="+234..."
                    className="w-full bg-transparent py-4 px-3"
                    {...register("phoneNumber", {
                      required: true,
                      pattern: {
                        value: /^\+234\d{10}$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                </div>
              </div>
            </div>
            <button
              className="bg-accent text-black hover:text-white hover:bg-primary duration-200 w-full rounded-md py-3 disabled:bg-gray-200 disabled:text-gray-400"
              disabled={!isValid || signingUp}
            >
              {signingUp ? "Creating account..." : "Continue"}
            </button>
          </motion.form>
        );
      case 2:
        return (
          <motion.div
            className="space-y-5"
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid gap-3">
              <div className="space-y-2">
                <label className="text-sm" htmlFor="email">
                  Enter Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-4 rounded-lg border  ${
                    errors.lastName ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="000000"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setCode(value);
                      return;
                    }

                    if (!/^\d+$/i.test(value)) return;
                    setCode(value);
                  }}
                  maxLength={6}
                />
              </div>
            </div>
            <button
              className="bg-accent text-black hover:text-white hover:bg-primary duration-200 w-full rounded-md py-3 disabled:bg-gray-200 disabled:text-gray-400"
              disabled={code.length !== 6 || verifyingEmail}
              onClick={handleCodeConfirmation}
            >
              {verifyingEmail ? "Verifying code..." : "Continue"}
            </button>

            <p className="text-sm text-gray-500">
              Didn&apos;t get the code?{" "}
              <span className="text-secondary">Resend code</span>
            </p>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            className="space-y-5"
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid gap-3">
              <div className="select-none space-y-2">
                <label className="text-sm" htmlFor="email">
                  Password <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex items-center rounded-lg focus-within:ring ring-gray-200 px-3 border border-gray-200 duration-300`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-transparent py-3"
                    placeholder="**********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div
                    onClick={togglePassword}
                    className="cursor-pointer text-gray-400"
                  >
                    {!showPassword ? <FaRegEye /> : <FaEyeSlash />}
                  </div>
                </div>
              </div>
              <div className="select-none space-y-2">
                <label className="text-sm" htmlFor="email">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex items-center rounded-lg focus-within:ring ring-gray-200 px-3 border border-gray-200 duration-300`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-transparent py-3"
                    placeholder="**********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <div
                    onClick={togglePassword}
                    className="cursor-pointer text-gray-400"
                  >
                    {!showPassword ? <FaRegEye /> : <FaEyeSlash />}
                  </div>
                </div>
              </div>
            </div>
            <button
              className="bg-accent text-black hover:text-white hover:bg-primary duration-200 w-full rounded-md py-3 disabled:bg-gray-200 disabled:text-gray-400"
              onClick={handleCreatePassword}
              disabled={settingUpPassword || !password || !confirmPassword}
            >
              {settingUpPassword ? "..." : "Continue"}
            </button>

            <p className="text-sm text-gray-500">
              Didn&apos;t get the code?{" "}
              <span className="text-secondary">Resend code</span>
            </p>
          </motion.div>
        );
    }
  };

  return (
    <main className="py-4 px-12 min-h-screen fixed top-0 left-0 w-screen h-screen flex items-center min-w-screen overflow-hidden">
      {step < 4 ? (
        <div className="grid xl:grid-cols-3 grid-cols-2 gap-7 w-full">
          <div className="sticky top-0">
            <AccountReviews />
          </div>

          <div className="xl:col-span-2 px-4 space-y-10 pb-8 2xl:space-y-16 max-h-[98vh] overflow-y-auto scrollbar-none">
            <div className="space-y-8">
              <button
                className="size-12 flex items-center justify-center rounded-full border bg-white cursor-pointer disabled:opacity-45 duration-300 disabled:cursor-not-allowed"
                onClick={() => setStep((prev) => (prev > 0 ? prev - 1 : prev))}
                disabled={step === 1 || codeConfirmed}
              >
                <FaArrowLeft />
              </button>

              <div className="bg-gray-100 rounded-full h-1 max-w-2xl relative overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / MAX_STEPS) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 top-0 rounded-full bg-accent h-full"
                ></motion.div>
              </div>
            </div>

            <div className="space-y-8 max-w-2xl">
              <AnimatePresence mode="wait" initial={false}>
                {step === 1 ? (
                  <motion.div key={step} className="space-y-2">
                    <h1 className="text-4xl font-bold">
                      Create a Stockly account
                    </h1>
                    <p className="text-sm text-gray-500">
                      Start your stress free business management journey here.
                    </p>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div key={step} className="space-y-2">
                    <h1 className="text-4xl font-bold">
                      Confirm email address
                    </h1>
                    <p className="text-sm text-gray-500">
                      We&apos;ve sent a six digit code to{" "}
                      <span className="text-gray-700">{email}</span>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key={step} className="space-y-2">
                    <h1 className="text-4xl font-bold">Create Password</h1>
                    <p className="text-sm text-gray-500">
                      Secure your account with a strong password
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>
                {renderRegisterForm()}
              </AnimatePresence>

              {step === 1 && (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-400 justify-between">
                    <div className="flex-grow border"></div>
                    <p>or</p>
                    <div className="flex-grow border"></div>
                  </div>

                  <p className="text-center text-gray-400 text-sm">
                    Already have a stockly account?{" "}
                    <Link
                      href="/login"
                      className="text-secondary border-b pb-[1px] border-secondary"
                    >
                      Login
                    </Link>
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-4 py-2 w-full border flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition duration-300">
                      <Image
                        className="size-5"
                        src="/svgs/google-color.svg"
                        alt="google logo"
                        width={24}
                        height={24}
                      />
                      <span>Continue with Google</span>
                    </button>

                    <button className="px-4 py-2 w-full border flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition duration-300">
                      <Image
                        className="size-5"
                        src="/svgs/x-logo.svg"
                        alt="x logo"
                        width={24}
                        height={24}
                      />
                      <span>Continue with X</span>
                    </button>
                  </div>

                  <p className="text-gray-500 text-sm max-w-lg mx-auto text-center">
                    By continuing, you agree to the{" "}
                    <span className="text-secondary">General Terms of Use</span>
                    ,{" "}
                    <span className="text-secondary">
                      Merchant Terms of Use
                    </span>{" "}
                    &{" "}
                    <span className="text-secondary">
                      General Privacy Policy
                    </span>{" "}
                    of Stockly
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="space-y-5 text-center">
            <div className="flex items-center justify-center">
              <Image
                alt="confetti"
                src="/images/items/confetti.gif"
                width={100}
                height={100}
              />
            </div>

            <div className="space-y-1">
              <p className="text-xl font-bold">Congratulations</p>
              <p className="text-gray-500 max-w-sm mx-auto text-sm">
                Your account has been created successfully.
              </p>
            </div>

            <button
              className="text-black bg-accent duration-300 text-sm font-medium mx-auto hover:bg-accent/90 px-6 py-2 rounded-lg flex items-center gap-1"
              onClick={() => router.replace("/setup")}
            >
              <span>Setup Store</span> <LuShoppingBag />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Register;
