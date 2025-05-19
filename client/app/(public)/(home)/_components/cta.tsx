import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-[#2db587] py-32 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to explore all your course materials?
        </h2>
        <p className="text-lg mb-8">
          Join thousands of students who are already downloading past questions,
          lecture notes, and helpful resources – all for free.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/search"
            className="rounded-lg bg-white text-primary font-semibold px-6 py-3 shadow hover:bg-gray-100 transition"
          >
            Browse Materials
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg border border-white text-white font-semibold px-6 py-3 hover:bg-white hover:text-primary transition"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </section>
  );
}
