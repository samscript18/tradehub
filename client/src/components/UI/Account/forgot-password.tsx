"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import AccountReviews from "./reviews";
import { toast } from "sonner";
import { EMAIL_REGEX } from "@/lib/utils/regex";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ email: string }>();

  const router = useRouter();

  const submit: SubmitHandler<{ email: string }> = async (data) => {
    console.log(data);
    toast.success("Reset link sent!");
  };

  return (
    <main className="py-4 px-12 min-h-screen flex items-center min-w-screen relative overflow-y-auto scrollbar-none">
      <div className="grid grid-cols-3 gap-7 w-full">
        <div className="sticky top-0">
          <AccountReviews />
        </div>

        <div className="col-span-2 px-4 space-y-12 pb-8 2xl:space-y-20 max-h-screen">
          <div
            className="size-12 flex items-center justify-center rounded-full border bg-white cursor-pointer"
            onClick={() => router.back()}
          >
            <FaArrowLeft />
          </div>

          <div className="space-y-8 max-w-3xl">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Reset Password</h1>
              <p className="text-gray-400 text-sm">
                We’ll send a password reset link to your registered email.
              </p>
            </div>

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

                <button
                  disabled={!isValid}
                  className="bg-accent text-black hover:text-white hover:bg-primary duration-300 w-full rounded-md py-3 disabled:bg-gray-200 disabled:text-gray-400"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
