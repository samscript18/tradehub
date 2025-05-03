"use client";
import { reviews } from "@/lib/data";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { FiArrowUpRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const AccountReviews = () => {
  const [currentIndicator, setCurrentIndicator] = useState(0);
  const scope = useRef<HTMLDivElement>(null);

  // useGSAP(
  //   () => {
  //     const timeline = gsap.timeline({ repeat: -1 });
  //   },
  //   { scope }
  // );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndicator((prev) =>
        prev === reviews.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        className="min-h-[96vh] rounded-lg overflow-hidden relative"
        ref={scope}
        key={currentIndicator}
      >
        <motion.div
          key={currentIndicator}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <Image
            src={reviews[currentIndicator].image}
            alt="woman with corporate"
            width={900}
            height={900}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 2xl:p-8 p-6 flex items-end text-white">
          <div className="absolute top-6 2xl:top-8 2xl:left-8">
            <div className="2xl:size-10 size-8 bg-white rounded-md flex items-center justify-center text-black">
              <BiSolidQuoteLeft size={20} />
            </div>
          </div>

          <div className="space-y-4 pb-5">
            <motion.div
              key={currentIndicator}
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-full w-fit bg-white/10 backdrop-blur px-3 py-2 flex items-center justify-center gap-1 text-sm"
            >
              <p>{reviews[currentIndicator].website}</p>
              <FiArrowUpRight />
            </motion.div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ x: -5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 5, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                key={currentIndicator}
                className="2xl:text-2xl text-xl"
              >
                {`"${reviews[currentIndicator].quote}"`}
              </motion.p>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ x: -5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 5, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                key={currentIndicator}
                className="opacity-90 2xl:text-base text-sm"
              >
                {reviews[currentIndicator].name} -{" "}
                {reviews[currentIndicator].position}
              </motion.p>
            </div>
          </div>

          {/*  */}
          <div className="absolute bottom-2 px-4 left-0 grid grid-cols-5 gap-2 w-full">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className={`${
                  idx === currentIndicator ? "bg-white/60" : "bg-white/10"
                } rounded-full h-1 cursor-pointer duration-300`}
                onClick={() => setCurrentIndicator(idx)}
              ></div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AccountReviews;
