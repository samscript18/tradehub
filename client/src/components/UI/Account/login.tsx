"use client";
import { LoginType } from "@/lib/@types/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowLeft, FaEyeSlash, FaRegEye } from "react-icons/fa";
import AccountReviews from "./reviews";
import { toast } from "sonner";
import { EMAIL_REGEX } from "@/lib/utils/regex";
import { signIn } from "next-auth/react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginType>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const router = useRouter();

  const submit: SubmitHandler<LoginType> = async (data) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        ...data,
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login successful!");
        window.location.href = "/dashboard";
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-4 px-12 min-h-screen flex items-center min-w-screen relative overflow-y-auto scrollbar-none">
      <div className="grid xl:grid-cols-3 grid-cols-2 gap-7 w-full">
        <div className="sticky top-0">
          <AccountReviews />
        </div>

        <div className="xl:col-span-2 px-4 space-y-12 pb-8 2xl:space-y-20 max-h-screen">
          <div
            className="size-12 flex items-center justify-center rounded-full border bg-white cursor-pointer"
            onClick={() => router.back()}
          >
            <FaArrowLeft />
          </div>

          <div className="space-y-8 max-w-3xl">
            <h1 className="text-4xl font-bold">Welcome back!</h1>

            <form onSubmit={handleSubmit(submit)}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm" htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-4 rounded-lg border  ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="johndoe@gmail.com"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: EMAIL_REGEX,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                <div className="select-none space-y-2">
                  <label className="text-sm" htmlFor="email">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`flex items-center rounded-lg focus-within:ring ring-gray-200 px-4 border ${
                      errors?.password ? "border-red-500" : "border-gray-200"
                    } duration-300`}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full bg-transparent py-4"
                      placeholder="**********"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                      })}
                    />

                    <div
                      onClick={togglePassword}
                      className="cursor-pointer text-gray-400"
                    >
                      {!showPassword ? <FaRegEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                </div>

                <button
                  disabled={!isValid || loading}
                  className="bg-accent text-black hover:text-white hover:bg-primary duration-300 w-full rounded-md py-3 disabled:bg-gray-200 disabled:text-gray-400"
                >
                  {!loading ? "Login" : "Signing In..."}
                </button>
              </div>
            </form>

            <div className="flex items-center gap-2 text-sm text-gray-400 justify-between">
              <div className="flex-grow border"></div>
              <p>or</p>
              <div className="flex-grow border"></div>
            </div>

            <div className="text-sm">
              <p className="text-center text-gray-400">
                Forgot password?{" "}
                <Link href="/forgot-password" className="text-secondary">
                  Click Here
                </Link>
              </p>
              <p className="text-center text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-secondary">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="px-4 py-2 w-full border flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition duration-300">
                <Image
                  className="size-5"
                  src="/svgs/google-color.svg"
                  alt="google logo"
                  width={24}
                  height={24}
                />
                <span>Login with Google</span>
              </button>

              <button className="px-4 py-2 w-full border flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition duration-300">
                <Image
                  className="size-5"
                  src="/svgs/x-logo.svg"
                  alt="x logo"
                  width={24}
                  height={24}
                />
                <span>Login with X</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
