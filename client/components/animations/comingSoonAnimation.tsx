'use client'

import { motion, AnimatePresence } from 'framer-motion'

export default function ComingSoonAnimation() {
  return (
    <div className="py-10 flex flex-col items-center justify-center">
      {/* Face Container */}
      <div className="relative w-[200px] h-[200px] mb-6">
        {/* Face */}
        <motion.div
          className="w-[200px] h-[200px] bg-yellow-200 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Eyes Container */}
          <div className="relative w-full h-full">
            {/* Left Eye */}
            <div className="absolute top-[70px] left-[50px] w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center">
              <motion.div
                className="w-[15px] h-[15px] bg-black rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-[8px] h-[8px] bg-blue-400 rounded-full opacity-80"
                initial={{ y: 15, x: 5, opacity: 0 }}
                animate={{
                  y: [15, 80],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
            </div>

            {/* Right Eye */}
            <div className="absolute top-[70px] right-[50px] w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center">
              <motion.div
                className="w-[15px] h-[15px] bg-black rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-[8px] h-[8px] bg-blue-400 rounded-full opacity-80"
                initial={{ y: 15, x: -5, opacity: 0 }}
                animate={{
                  y: [15, 80],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.3,
                  repeatDelay: 0.7,
                }}
              />
            </div>

            {/* Sad Mouth */}
            <motion.div
              className="absolute bottom-[60px] left-[70px] w-[60px] h-[60px] border-b-4 border-black rounded-b-full"
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Extra Tears */}
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[6px] h-[6px] bg-blue-400 rounded-full opacity-80"
                initial={{
                  y: 85 + Math.random() * 10,
                  x: 50 + (i % 2 === 0 ? -10 : 110) + Math.random() * 10,
                  opacity: 0,
                }}
                animate={{
                  y: [85, 150 + Math.random() * 30],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.2,
                  repeatDelay: Math.random(),
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Text */}
      <motion.h2
        className="text-2xl font-bold text-center mb-4"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Coming Soon!
      </motion.h2>

      <p className="text-center text-gray-500 max-w-xs">
        We're working hard to bring you document upload functionality. Please
        check back later!
      </p>
    </div>
  )
}
