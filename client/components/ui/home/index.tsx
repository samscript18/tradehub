import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import Hero from './hero';
import Process from './process';
import Features from './features';
import Stories from './stories';
import CTA from './cta';
import AboutUs from './about-us';
import ContactUs from './contact-us';

const HomePage = () => {
	return (
		<main>
			<div className="bg-[#0A0C1B]">
				<Navbar />
				<Hero />
			</div>
			<Process />
			<AboutUs />
			<Stories />
			<Features />
			<CTA />
			<ContactUs />
			<Footer />
		</main>
	);
};
export default HomePage;
