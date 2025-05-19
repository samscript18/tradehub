'use client';
import { useModal } from '@/lib/contexts/modal-context';
import ModalWrapper from '@/components/animations/modal-wrapper';
import ComingSoonAnimation from '@/components/animations/comingSoonAnimation';
import SectionReveal from '@/components/animations/section-reveal';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function UploadDocument() {
	const { showModal, hideModal } = useModal();

	const handleClick = () => {
		showModal(
			<ModalWrapper>
				<div className="relative">
					<button
						onClick={hideModal}
						className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
						aria-label="Close">
						&times;
					</button>
					<h2 className="text-xl text-center font-semibold mb-2">Upload Document</h2>
					<p className="text-sm text-center text-gray-500 mb-4">This feature is coming soon!</p>
					<ComingSoonAnimation />
				</div>
			</ModalWrapper>
		);
	};

	return (
		<section className="bg-white py-40 px-6 sm:px-12 lg:px-24">
			<div className="container">
				<SectionReveal>
					<div className="flex flex-col items-center justify-center text-center">
						<h3 className="text-2xl font-bold mb-6">Willing to contribute?</h3>
						<p className="text-lg text-gray-600 max-w-2xl mb-8">
							Share your knowledge with fellow students by uploading your own study materials and past questions.
						</p>
						<Button
							size="lg"
							onClick={handleClick}
							className="rounded-lg bg-primary px-4 py-2 text-sm text-white cursor-pointer hover:bg-primary/80 duration-300 gap-2">
							<Upload className="h-5 w-5" />
							Upload Document
						</Button>
					</div>
				</SectionReveal>
			</div>
		</section>
	);
}
