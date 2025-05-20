import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import Hero from './hero';

const HomePage = () => {
	return (
		<main>
			<div className="bg-[#0A0C1B]">
				<Navbar />
				<Hero />
			</div>
			<Footer />
		</main>
	);
};
export default HomePage;
