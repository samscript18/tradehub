"use client";

import { containerVariants } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const features = [
  "No more WhatsApp group scrolls",
  "Materials organized by level and faculty",
  "Fast, secure downloads",
  "Built by students, for students",
  "Easy to search and find exactly what you need",
  "Access materials anytime, anywhere",
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function WhyUsePlatform() {
  return (
    <section className="bg-white px-6 py-40 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          Why Use This Platform?
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We’re solving the biggest pain points around finding lecture notes,
          assignments, and past questions.
        </motion.p>

        <motion.ul
          className="grid gap-6 sm:grid-cols-2 text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3"
              variants={itemVariants}
            >
              <FaCheckCircle className="text-primary mt-1" size={20} />
              <span className="text-base text-gray-700">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
