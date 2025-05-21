import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import Hero from './hero';
import Process from './process';
import Features from './features';
import Stories from './stories';
import CTA from './cta';

const HomePage = () => {
	return (
		<main>
			<div className="bg-[#0A0C1B]">
				<Navbar />
				<Hero />
			</div>
			<Process />
			<Features />
			<Stories />
			<CTA />
			<Footer />
		</main>
	);
};
export default HomePage;
