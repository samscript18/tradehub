'use client';

import { motion } from 'framer-motion';

const Footer = () => {
	return (
		<motion.footer
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.5 }}
			transition={{ duration: 0.5, delay: 0.8 }}
			variants={{
				hidden: { opacity: 0, y: 30 },
				visible: { opacity: 1, y: 0 },
			}}
			className="mt-4 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
			&copy; {new Date().getFullYear()} TradeHub. All rights reserved.
		</motion.footer>
	);
};
export default Footer;
