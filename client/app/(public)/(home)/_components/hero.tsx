"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/data";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white relative">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <div>
              <Link href={"/"}>
                <Image
                  src={"/svgs/logo.svg"}
                  width={100}
                  alt="logo"
                  height={50}
                />
              </Link>
            </div>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navLinks.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.link}
                  className="text-sm font-semibold text-gray-900"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/login" className="text-sm font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white px-6 py-6 overflow-y-auto sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <div>
                <Link href={"/"}>
                  <Image
                    src={"/svgs/logo.svg"}
                    width={100}
                    alt="logo"
                    height={50}
                  />
                </Link>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navLinks.map((link) => {
                    return (
                      <Link
                        key={link.name}
                        href={link.link}
                        className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="py-6">
                  <Link
                    href="/login"
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Background Gradient Top */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#34d7a1] to-[#0a7f6f] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <motion.div
          className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="hidden sm:mb-8 sm:flex sm:justify-center"
            variants={fadeInUp}
          >
            <div className="relative rounded-full px-3 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              We&apos;re in beta, so expect some bugs.{" "}
              <Link href="#" className="font-semibold text-primary">
                <span className="absolute inset-0" aria-hidden="true"></span>
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"
            variants={fadeInUp}
          >
            Find and Download Course Materials Easily
          </motion.h1>

          <motion.p
            className="mt-8 text-lg max-w-3xl mx-auto font-medium text-gray-500 sm:text-xl"
            variants={fadeInUp}
          >
            A centralized hub for students to access lecture notes, PDFs,
            images, and more — built with love for FUNAAB students.
          </motion.p>

          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            variants={fadeInUp}
          >
            <Link
              href="/sign-up"
              className="rounded-md duration-300 bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Get started
            </Link>
            <Link href="#" className="text-sm font-semibold text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Background Gradient Bottom */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#34d7a1] to-[#0a7f6f] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
