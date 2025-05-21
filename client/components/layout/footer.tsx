import Link from 'next/link';
import Logo from '../common/logo';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function Footer() {
	return (
	<footer className="bg-[#111326] text-gray-300 px-4 py-12 sm:px-8 lg:px-12">
		<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
			<div>
				<Logo />
				<p className="text-sm leading-6 mt-4">Empowering local commerce through technology</p>
			</div>

			<div>
				<h4 className="text-white font-semibold mb-3">Quick Links</h4>
				<ul className="space-y-2 text-sm">
					<li>
						<Link href="/#about-us" className="hover:underline hover:text-primary duration-300">
							About Us
						</Link>
					</li>
					<li>
						<Link href="/#contact-us" className="hover:underline hover:text-primary duration-300">
							Contact
						</Link>
					</li>
					<li>
						<Link href="/sign-up" className="hover:underline hover:text-primary duration-300">
							Merchant Signup
						</Link>
					</li>
				</ul>
			</div>

			<div>
				<h4 className="text-white font-semibold mb-3">Legal</h4>
				<ul className="space-y-2 text-sm">
					<li>
						<Link href="#" className="hover:underline hover:text-primary duration-300">
							Terms of Service
						</Link>
					</li>
					<li>
						<Link href="#" className="hover:underline hover:text-primary duration-300">
							Privacy Policy
						</Link>
					</li>
					<li>
						<Link href="#" className="hover:underline hover:text-primary duration-300">
							Cookie Policy
						</Link>
					</li>
				</ul>
			</div>

			<div>
				<h4 className="text-white font-semibold mb-3">Connect</h4>
				<ul className="text-sm flex gap-4 mt-4">
					<li className="bg-primary p-1.5 rounded-md">
						<a href="#" className="hover:underline hover:text-secondary duration-300">
							<FaFacebookF className="text-white" />
						</a>
					</li>
					<li className="bg-primary p-1.5 rounded-md">
						<a href="#" className="hover:underline hover:text-secondary duration-300">
							<FaInstagram className="text-white" />
						</a>
					</li>
					<li className="bg-primary p-1.5 rounded-md">
						<a href="#" className="hover:underline hover:text-secondary duration-300">
							<FaTwitter className="text-white" />
						</a>
					</li>
					<li className="bg-primary p-1.5 rounded-md">
						<a href="#" className="hover:underline hover:text-secondary duration-300">
							<FaLinkedinIn className="text-white" />
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
			&copy; {new Date().getFullYear()} TradeHub. All rights reserved.
		</div>
	</footer>
);
}
