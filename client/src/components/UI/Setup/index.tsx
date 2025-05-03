// "use client";
// import { useEffect, useRef, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { RiHome9Line } from "react-icons/ri";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { Logo } from "@/components/Common/Loaders/logo.loader";
// import { FaArrowLeft } from "react-icons/fa";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { fetchStates, setupStore } from "@/lib/services/store.service";
// import { EMAIL_REGEX } from "@/lib/utils/regex";
// import { getBase64 } from "@/lib/utils/helpers";
// import { toast } from "sonner";
// import { MdOutlineFileUpload } from "react-icons/md";
// import Image from "next/image";
// import { FiEdit3 } from "react-icons/fi";
// import { useSession } from "next-auth/react";

// const MAX_STEPS = 3;

// const Setup = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//     watch,
//     setValue,
//     reset,
//   } = useForm<StoreSetup>();

//   const [
//     storeName,
//     storeSlogan,
//     storeDescription,
//     storeSector,
//     storePhoneNumber,
//     storeEmail,
//     storeAddress,
//     storeBankDetails,
//     accountNumber,
//     bankName,
//     bankCode,
//   ] = [
//     watch("storeName"),
//     watch("storeSlogan"),
//     watch("storeDescription"),
//     watch("storeSector"),
//     watch("storePhoneNumber"),
//     watch("storeEmail"),
//     watch("storeAddress"),
//     watch("storeBankDetails"),
//     watch("storeBankDetails.account_number"),
//     watch("storeBankDetails.bank_name"),
//     watch("storeBankDetails.bank_code"),
//   ];

//   const [step, setStep] = useState(1);
//   const [blob, setBlob] = useState<string | null>(null);

//   const inputRef = useRef<HTMLInputElement>(null);

//   const router = useRouter();
//   const { data: onboardingData } = useOnboardingStore();

//   const { data: session, update } = useSession();

//   const { data: states } = useQuery({
//     queryFn: fetchStates,
//     queryKey: ["states"],
//   });

//   const { data: banks } = useQuery({
//     queryFn: getBanks,
//     queryKey: ["banks"],
//     staleTime: 3600,
//   });

//   const {
//     data: lookup,
//     refetch,
//     isPending: lookingUp,
//   } = useQuery({
//     queryFn: () => lookupAccount({ accountNumber, bankCode }),
//     queryKey: ["lookupAccount", accountNumber, bankCode],
//     staleTime: 3600,
//   });

//   useEffect(() => {
//     setValue("storeBankDetails.account_number", "");
//     setValue("storeBankDetails.account_name", "");
//   }, [bankName]);

//   useEffect(() => {
//     if (!banks) return;

//     const bank = banks.find((b) => b.bank_name === bankName);
//     if (!bank) return;

//     if (accountNumber.length !== 10) return;
//     setValue("storeBankDetails.bank_code", bank.bank_code);

//     refetch();
//   }, [storeBankDetails, accountNumber, bankName, banks]);

//   useEffect(() => {
//     refetch();
//   }, [bankCode]);

//   useEffect(() => {
//     if (!lookup) return;
//     setValue("storeBankDetails.account_name", lookup.account_name);
//     setValue("storeBankDetails.account_number", lookup.account_number);
//     // setValue("storeBankDetails.bank_code", lookup.bank_code);
//     setValue("storeBankDetails.bank_name", lookup.bank_name);
//   }, [lookup]);

//   const { mutate: setupStoreMutate, isPending: settingUpStore } = useMutation({
//     mutationFn: setupStore,
//     mutationKey: ["setupStore"],
//   });

//   if (!onboardingData?.accessToken) {
//     router.push("/register");
//     return;
//   }

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];

//     if (!file) {
//       toast.error("No file selected");
//       return;
//     }

//     const blob = URL.createObjectURL(file);
//     setBlob(blob);

//     try {
//       const base64 = await getBase64(file);
//       setValue("storeLogo", base64);
//     } catch (error) {
//       console.error("Error converting file:", error);
//     }
//   };

//   const nextStep = () =>
//     setStep((prev) => (prev < MAX_STEPS ? prev + 1 : prev));
//   const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

//   const submit: SubmitHandler<StoreSetup> = async (data) => {
//     setupStoreMutate(
//       {
//         data,
//         token: session ? session.accessToken : onboardingData?.accessToken,
//       },
//       {
//         onSuccess: async () => {
//           toast.success("Store setup successful");
//           reset();

//           if (session) {
//             await update({
//               ...session,
//               nextStep: undefined,
//             });
//             window.location.href = "/dashboard";
//             return;
//           }

//           router.push("/login");
//         },
//         onError: (error) => {
//           toast.error(error.message);
//         },
//       }
//     );
//   };

//   const renderForm = () => {
//     switch (step) {
//       case 1:
//         return (
//           <motion.div
//             key={step}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="grid grid-cols-2 gap-3"
//           >
//             {/* Store Name */}
//             <div className="space-y-2 col-span-2">
//               <label className="text-sm" htmlFor="storeName">
//                 Store Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm ${
//                   errors.storeName ? "border-red-500" : "border-gray-200"
//                 }`}
//                 placeholder="Mike's Store"
//                 {...register("storeName", { required: true })}
//               />
//             </div>

//             {/* Store Slogan */}
//             <div className="space-y-2">
//               <label className="text-sm" htmlFor="storeSlogan">
//                 Store Slogan <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm ${
//                   errors.storeSlogan ? "border-red-500" : "border-gray-200"
//                 }`}
//                 placeholder="e.g Affordable, Reliable, Unbeatable"
//                 {...register("storeSlogan", { required: true })}
//               />
//             </div>

//             {/* Store Email */}
//             <div className="space-y-2">
//               <label className="text-sm" htmlFor="storeEmail">
//                 Store Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm ${
//                   errors.storeEmail ? "border-red-500" : "border-gray-200"
//                 }`}
//                 placeholder="example@gmail.com"
//                 {...register("storeEmail", {
//                   required: true,
//                   pattern: {
//                     value: EMAIL_REGEX,
//                     message: "Invalid email address",
//                   },
//                 })}
//               />
//             </div>

//             {/* Store Phone Number */}
//             <div className="space-y-2">
//               <label className="text-sm" htmlFor="storePhoneNumber">
//                 Store Phone Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="tel"
//                 className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm ${
//                   errors.storePhoneNumber ? "border-red-500" : "border-gray-200"
//                 }`}
//                 placeholder="+2349012345678"
//                 {...register("storePhoneNumber", {
//                   required: true,
//                   pattern: /^\+234\d{10}$/,
//                 })}
//               />
//             </div>

//             {/* Store Sector */}
//             <div className="space-y-2">
//               <label className="text-sm" htmlFor="storeSector">
//                 Store Sector <span className="text-red-500">*</span>
//               </label>
//               <select
//                 className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border text-sm ${
//                   errors.storeSector ? "border-red-500" : "border-gray-200"
//                 }`}
//                 {...register("storeSector", { required: true })}
//               >
//                 <option value="" className="text-gray-400" disabled selected>
//                   Select a sector
//                 </option>
//                 {businessSectors.map((sector) => (
//                   <option key={sector} value={sector}>
//                     {sector}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Store Description */}
//             <div className="space-y-2 col-span-2">
//               <label className="text-sm" htmlFor="storeDescription">
//                 Store Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 resize-none p-3 rounded-lg border placeholder:text-sm ${
//                   errors.storeDescription ? "border-red-500" : "border-gray-200"
//                 }`}
//                 placeholder="Describe your store..."
//                 {...register("storeDescription", { required: true })}
//                 rows={5}
//                 maxLength={1024}
//               />
//             </div>
//           </motion.div>
//         );
//       case 2:
//         return (
//           <motion.div
//             key={step}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="grid grid-cols-2 gap-3"
//           >
//             {/* Store Logo */}
//             <div className="space-y-3 col-span-2">
//               <label className="text-sm" htmlFor="storeLogo">
//                 Store Logo
//               </label>
//               {!blob ? (
//                 <div
//                   className="border flex items-center justify-center h-[8rem] select-none cursor-pointer rounded-lg text-gray-500"
//                   onClick={() => inputRef.current?.click()}
//                 >
//                   <div className="text-center text-sm">
//                     <MdOutlineFileUpload size={30} className="mx-auto" />
//                     <p>click to upload your store logo.</p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-5">
//                   <div className="size-28 md:size-32 border rounded-full relative">
//                     <Image
//                       src={blob}
//                       alt="store-logo"
//                       className="rounded-full absolute top-0 left-0 w-full h-full object-cover"
//                       width={300}
//                       height={300}
//                     />
//                   </div>

//                   <button
//                     className="text-xs h-fit bg-accent text-black px-3 py-1.5 rounded-full flex items-center gap-2"
//                     onClick={() => inputRef.current?.click()}
//                     role="button"
//                   >
//                     <span>Change</span>
//                     <FiEdit3 />
//                   </button>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 accept="image/png, image/jpeg"
//                 className="w-full bg-transparent hidden duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm border-gray-200"
//                 // {...register("storeLogo")}
//                 ref={inputRef}
//                 onChange={handleFileChange}
//               />
//             </div>

//             {/* Store Address */}
//             <div className="col-span-2 space-y-2 pt-4">
//               <div className="space-y-2">
//                 <p className="font-semibold text-xl">Location</p>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="space-y-2">
//                     <label className="text-sm">
//                       State <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 capitalize rounded-lg border text-sm ${
//                         errors.storeAddress?.state
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       }`}
//                       {...register("storeAddress.state", { required: true })}
//                     >
//                       <option
//                         value=""
//                         className="text-gray-400"
//                         disabled
//                         selected
//                       >
//                         Select a state
//                       </option>
//                       {states?.map((state) => (
//                         <option
//                           key={state._id}
//                           value={state._id}
//                           className="capitalize"
//                         >
//                           {state.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm">
//                       L.G.A <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm ${
//                         errors.storeAddress?.city
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       }`}
//                       placeholder="City"
//                       {...register("storeAddress.city", { required: true })}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm">
//                       Zip Code <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm ${
//                         errors.storeAddress?.zip_code
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       }`}
//                       placeholder="Zip Code"
//                       {...register("storeAddress.zip_code", { required: true })}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm">
//                       Street Address <span className="text-red-500">*</span>
//                     </label>

//                     <input
//                       type="text"
//                       className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm ${
//                         errors.storeAddress?.street_address
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       }`}
//                       placeholder="Street Address"
//                       {...register("storeAddress.street_address", {
//                         required: true,
//                       })}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Store Bank Details */}
//             <div className="col-span-2 space-y-2 pt-4">
//               <p className="font-semibold text-xl">Bank Details</p>

//               <div className="space-y-2">
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="space-y-2">
//                     <label className="text-sm">
//                       Bank <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 capitalize rounded-lg border text-sm ${
//                         errors.storeBankDetails?.bank_name
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       }`}
//                       {...register("storeBankDetails.bank_name", {
//                         required: true,
//                       })}
//                     >
//                       <option
//                         value=""
//                         className="text-gray-400"
//                         disabled
//                         selected
//                       >
//                         Select a bank
//                       </option>
//                       {banks?.map((bank) => (
//                         <option
//                           key={bank.bank_code + bank.bank_name}
//                           value={bank.bank_name}
//                           className="capitalize"
//                         >
//                           {bank.bank_name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm">
//                       Account Number <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm ${
//                         errors.storeBankDetails?.account_number
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       }`}
//                       placeholder="Account Number"
//                       {...register("storeBankDetails.account_number", {
//                         required: true,
//                         pattern: /^\d{10}$/,
//                       })}
//                       maxLength={10}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm">
//                       Account Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border disabled:bg-gray-200 disabled:text-gray-400 placeholder:text-sm ${
//                         errors.storeBankDetails?.account_name
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       }`}
//                       placeholder={lookingUp ? "loading..." : `--.--`}
//                       {...register("storeBankDetails.account_name", {
//                         required: true,
//                       })}
//                       disabled
//                     />
//                   </div>
//                   {/* <div className="space-y-2">
//                     <label className="text-sm">
//                       Bank Code <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border disabled:bg-gray-200 disabled:text-gray-400 placeholder:text-sm ${
//                         errors.storeBankDetails?.bank_code
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       }`}
//                       disabled
//                       placeholder="Bank Code"
//                       {...register("storeBankDetails.bank_code", {
//                         required: true,
//                       })}
//                     />
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         );
//     }
//   };

//   return (
//     <main className="relative">
//       {/* blob */}
//       <svg
//         id="10015.io"
//         viewBox="0 0 480 480"
//         xmlns="http://www.w3.org/2000/svg"
//         className="absolute top-0 left-0 z-[1] opacity-10 size-48 md:block hidden"
//       >
//         <path
//           fill="#474bff"
//           d="M434.5,290Q395,340,366,395.5Q337,451,272.5,458Q208,465,161,425Q114,385,77,342Q40,299,57,245Q74,191,97.5,147Q121,103,166,70Q211,37,274,32.5Q337,28,388.5,70Q440,112,457,176Q474,240,434.5,290Z"
//         />
//       </svg>
//       {/* blob 2 */}
//       <svg
//         id="10015.io"
//         viewBox="0 0 480 480"
//         xmlns="http://www.w3.org/2000/svg"
//         className="absolute top-12 right-5 z-[1] size-48 md:block hidden"
//       >
//         <path
//           fill="rgba(250, 204, 20, 0.21)"
//           d="M367,265Q376,290,394.5,337.5Q413,385,367.5,384Q322,383,292.5,375.5Q263,368,236,391.5Q209,415,196,376.5Q183,338,158.5,333.5Q134,329,112,312Q90,295,104,267.5Q118,240,127.5,221.5Q137,203,97,144.5Q57,86,89.5,60.5Q122,35,162,30.5Q202,26,236.5,46.5Q271,67,314.5,51Q358,35,374.5,74.5Q391,114,374,155.5Q357,197,357.5,218.5Q358,240,367,265Z"
//         />
//       </svg>

//       <div className="max-w-3xl mx-auto p-5 md:p-0 my-10 space-y-8 z-50">
//         <div className="flex items-center gap-2 justify-between">
//           <Logo />

//           <button
//             className="rounded-full flex items-center bg-gray-200 justify-center size-12 border duration-300 border-gray-100 hover:bg-gray-100 text-black"
//             onClick={step > 1 ? prevStep : () => router.push("/")}
//           >
//             {step === 1 ? <RiHome9Line /> : <FaArrowLeft />}
//           </button>
//         </div>

//         <div className="space-y-2">
//           <AnimatePresence>
//             <motion.h1 key={step} className="text-3xl font-bold">
//               {step === 1 ? "Quick Store Setup!" : "Location & Bank Details"}
//             </motion.h1>
//           </AnimatePresence>
//           <p className="text-sm text-gray-500">
//             Tell us a bit about your business/store.
//           </p>
//         </div>

//         <div className="space-y-4">
//           <form onSubmit={handleSubmit(submit)}>
//             <AnimatePresence mode="wait">{renderForm()}</AnimatePresence>
//           </form>

//           <button
//             className="bg-accent text-black hover:text-white text-sm hover:bg-primary duration-200 w-full rounded-md py-[10px] disabled:bg-gray-200 disabled:text-gray-400"
//             onClick={step === 1 ? nextStep : handleSubmit(submit)}
//             disabled={
//               (step === 1 &&
//                 (!storeName ||
//                   !storeSlogan ||
//                   !storeDescription ||
//                   !storePhoneNumber ||
//                   !storeSector ||
//                   !EMAIL_REGEX.test(storeEmail))) ||
//               (step === 2 && (!storeAddress || !storeBankDetails)) ||
//               settingUpStore
//             }
//           >
//             {step === 1 ? "Next" : settingUpStore ? "Finalizing..." : "Finish"}
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Setup;
