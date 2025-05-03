import { Logo } from "@/components/Common/Loaders/logo.loader";
import { footerLinks } from "@/lib/data";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container">
        <div className="flex gap-12 flex-col md:flex-row pb-12">
          <div className="max-w-[300px]">
            <Logo color="white" />
            <p className="mt-2 text-sm text-gray-400">
              A powerful store management system designed to streamline
              inventory, sales, and financial operations for businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 flex-grow">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-white">
                  {section.title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="hover:text-indigo-400">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
              <p className="mt-3 text-sm text-gray-400">
                Email: support@stockly.com
              </p>
              <p className="text-sm text-gray-400">Phone: +234 81 3396 1439</p>

              <div className="flex gap-4 mt-4">
                <Link href="#" className="text-gray-400 hover:text-blue-500">
                  <FaFacebook size={24} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  <FaTwitter size={24} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-pink-500">
                  <FaInstagram size={24} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-700">
                  <FaLinkedin size={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} Stockly. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
