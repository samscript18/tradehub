"use client";

import { containerVariants } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    name: "Computer Science",
    description: "Data structures, algorithms, AI notes, and more.",
    icon: "/images/icons8-code-100.png",
  },
  {
    name: "Engineering",
    description: "Top-notch lecture slides, lab manuals, and past questions.",
    icon: "/images/icons8-engineering-100.png",
  },
  {
    name: "Agricultural Sciences",
    description: "Access notes and resources for agriculture-related courses.",
    icon: "/images/icons8-plant-100.png",
  },
  {
    name: "Environmental Sciences",
    description:
      "Study materials on environmental issues, geography, and planning.",
    icon: "/images/icons8-earth-100.png",
  },
  {
    name: "Medical Sciences",
    description: "Detailed notes and diagrams for pre-clinicals and clinicals.",
    icon: "/images/icons8-stethoscope-100.png",
  },
  {
    name: "Business Administration",
    description: "Access finance, marketing, and entrepreneurship materials.",
    icon: "/images/icons8-business-100.png",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const FeaturedCategories = () => {
  return (
    <section className="bg-gray-50 py-32 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          Explore Featured Categories
        </motion.h2>

        <motion.p
          className="text-gray-600 text-lg max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Dive into our most popular collections, curated to support your
          academic journey.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 cursor-pointer shadow-gray-100 duration-200 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 hover:shadow-gray-300 transition-all ease-in-out"
              variants={itemVariants}
            >
              <div className="text-4xl mb-4">
                <Image
                  src={cat.icon}
                  alt={cat.name}
                  width={100}
                  height={100}
                  className="size-16 mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {cat.name}
              </h3>
              <p className="text-gray-600 mt-2">{cat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
