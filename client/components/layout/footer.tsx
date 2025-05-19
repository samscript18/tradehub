import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 px-6 py-12 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            Digi<span className="text-primary">fest</span>
          </h3>
          <p className="text-sm leading-6">
            		TradeHub is a web-based e-commerce platform that connects local merchants and vendors to buyers, offering seamless payments, product listings, and delivery services.

          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/materials" className="hover:underline">
                All Materials
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:underline">
                By Department
              </Link>
            </li>
            <li>
              <Link href="/upload" className="hover:underline">
                Upload Notes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">About</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:underline">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                X (Twitter)
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} UniMaterial. All rights reserved.
      </div>
    </footer>
  );
}
