"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Search Your Course",
    description:
      "Find materials by course title, code, or faculty using the powerful search bar.",
    icon: "/images/icons8-search-100.png",
  },
  {
    title: "Preview the Material",
    description:
      "View summaries or sample pages before downloading to ensure it’s what you need.",
    icon: "/images/icons8-document-100.png",
  },
  {
    title: "Download Instantly",
    description:
      "Save PDFs, slides, or images straight to your device — no sign-up required.",
    icon: "/images/icons8-download-100.png",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function HowItWorks() {
  return (
    <section className="bg-white py-32 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>

        <motion.p
          className="text-gray-600 text-lg max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Find, preview, and download materials in just a few clicks. It’s fast,
          free, and built for students like you.
        </motion.p>

        <motion.div
          className="grid gap-12 sm:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              variants={cardVariants}
            >
              <div className="text-4xl mb-4">
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={50}
                  height={50}
                  className="size-16"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
