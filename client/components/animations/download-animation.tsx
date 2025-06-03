// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Check, Download, FileText } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Document } from '@/lib/types';
// import { useModal } from '@/lib/contexts/modal-context';
// import axios from 'axios';
// import mime from 'mime-types';

// interface DownloadAnimationProps {
// 	onClose: (msg?: string) => void;
// 	document: Document;
// 	onDownloadComplete?: () => void;
// }

// export default function DownloadAnimation({
// 	onClose,
// 	document,
// 	onDownloadComplete,
// }: DownloadAnimationProps) {
// 	const { hideModal } = useModal();
// 	const [animationStage, setAnimationStage] = useState<
// 		'initial' | 'processing' | 'packaging' | 'downloading' | 'complete'
// 	>('initial');
// 	const [progress, setProgress] = useState(0);
// 	const controllerRef = useRef<AbortController | null>(null);

// 	const close = () => {
// 		if (controllerRef.current) {
// 			controllerRef.current.abort();
// 			controllerRef.current = null;
// 		}
// 		hideModal();
// 		onClose('Download cancelled');
// 	};

// 	const handleDownload = async () => {
// 		const controller = new AbortController();
// 		controllerRef.current = controller;

// 		try {
// 			// Get extension from mime type or upload_id
// 			const extensionFromMime = mime.extension(document.mime_type); // e.g., "docx"
// 			const extensionFromUploadId = document.upload_id?.split('.').pop(); // e.g., "docx"
// 			const extension = extensionFromMime || extensionFromUploadId || 'file'; // fallback

// 			const response = await axios.get(document.url, {
// 				responseType: 'blob',
// 				signal: controller.signal,
// 				onDownloadProgress(progressEvent) {
// 					if (progressEvent.total) {
// 						const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
// 						setProgress(percent);
// 					}
// 				},
// 			});

// 			const url = window.URL.createObjectURL(new Blob([response.data]));
// 			const link = window.document.createElement('a');
// 			link.href = url;

// 			// Sanitize name and append correct extension
// 			const cleanName = document.name.replace(/[^a-z0-9_\- ]/gi, '_').trim();
// 			link.setAttribute('download', `${cleanName || 'document'}.${extension}`);

// 			window.document.body.appendChild(link);
// 			link.click();
// 			link.remove();
// 			window.URL.revokeObjectURL(url);
// 		} catch (error) {
// 			onClose('Download Failed');
// 			hideModal();
// 			console.error(error);
// 		}
// 	};

// 	useEffect(() => {
// 		// Reset animation state when modal opens
// 		setAnimationStage('initial');
// 		setProgress(0);

// 		// Animation sequence
// 		const sequence = async () => {
// 			// Initial processing stage
// 			setAnimationStage('processing');

// 			// Stage transitions
// 			await new Promise((resolve) => setTimeout(resolve, 1500));
// 			setAnimationStage('packaging');

// 			await new Promise((resolve) => setTimeout(resolve, 2000));
// 			setAnimationStage('downloading');

// 			await handleDownload();

// 			setAnimationStage('complete');

// 			await new Promise((resolve) => setTimeout(resolve, 1500));
// 			onDownloadComplete?.();
// 		};

// 		sequence();
// 	}, [onDownloadComplete]);

// 	return (
// 		<AnimatePresence>
// 			<motion.div
// 				initial={{ opacity: 0 }}
// 				animate={{ opacity: 1 }}
// 				exit={{ opacity: 0 }}
// 				transition={{ duration: 0.4, ease: 'easeInOut' }}
// 				className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
// 				<motion.div
// 					initial={{ scale: 0.9, opacity: 0 }}
// 					animate={{ scale: 1, opacity: 1 }}
// 					exit={{ scale: 0.9, opacity: 0 }}
// 					transition={{
// 						duration: 0.5,
// 						type: 'spring',
// 						damping: 25,
// 						stiffness: 300,
// 					}}
// 					className="bg-white  rounded-lg p-8 max-w-md w-full mx-4 relative">
// 					<Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={close}>
// 						<X className="h-4 w-4" />
// 						<span className="sr-only">Close</span>
// 					</Button>

// 					<div className="text-center mb-8">
// 						<h3 className="text-2xl font-bold mb-2">Downloading {document.name}</h3>
// 						<p className="text-muted-foreground text-lg">
// 							{animationStage === 'complete'
// 								? 'Download complete! Your file is ready.'
// 								: animationStage === 'processing'
// 								? 'Processing your document...'
// 								: animationStage === 'packaging'
// 								? 'Packaging your file...'
// 								: 'Downloading your document...'}
// 						</p>
// 					</div>

// 					<div className="h-[300px] relative flex items-center justify-center">
// 						{/* Document icon */}
// 						<motion.div
// 							className="absolute"
// 							initial={{ scale: 1 }}
// 							animate={{
// 								scale: animationStage === 'processing' ? [1, 1.05, 1] : 1,
// 								y: animationStage === 'downloading' ? [0, -50, 0] : 0,
// 							}}
// 							transition={{
// 								duration: animationStage === 'processing' ? 2 : 1.5,
// 								repeat: animationStage === 'processing' ? Number.POSITIVE_INFINITY : 0,
// 								repeatType: 'loop',
// 								ease: 'easeInOut',
// 							}}>
// 							<div className="relative">
// 								{/* Document base */}
// 								<motion.div
// 									className="w-32 h-40 bg-blue-100  rounded-lg flex items-center justify-center overflow-hidden"
// 									animate={{
// 										boxShadow:
// 											animationStage === 'processing'
// 												? [
// 														'0px 0px 0px rgba(59, 130, 246, 0.3)',
// 														'0px 0px 20px rgba(59, 130, 246, 0.7)',
// 														'0px 0px 0px rgba(59, 130, 246, 0.3)',
// 												  ]
// 												: '0px 0px 0px rgba(59, 130, 246, 0.3)',
// 									}}
// 									transition={{
// 										duration: 2.5,
// 										repeat: animationStage === 'processing' ? Number.POSITIVE_INFINITY : 0,
// 										ease: 'easeInOut',
// 									}}>
// 									<FileText className="h-16 w-16 text-blue-500 " />

// 									{/* Processing effect */}
// 									{animationStage === 'processing' && (
// 										<motion.div
// 											className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-300/50 "
// 											animate={{
// 												y: ['100%', '-100%'],
// 											}}
// 											transition={{
// 												duration: 2,
// 												repeat: Number.POSITIVE_INFINITY,
// 												ease: 'linear',
// 											}}
// 										/>
// 									)}
// 								</motion.div>

// 								{/* Folded corner */}
// 								<div className="absolute top-0 right-0 w-0 h-0 border-t-[15px] border-r-[15px] border-t-blue-300  border-r-transparent" />

// 								{/* Download arrow for downloading stage */}
// 								{animationStage === 'downloading' && (
// 									<motion.div
// 										className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
// 										initial={{ opacity: 0, y: -20 }}
// 										animate={{ opacity: 1, y: 0 }}
// 										transition={{ duration: 0.5, ease: 'easeOut' }}>
// 										<Download className="h-8 w-8 text-blue-500" />
// 									</motion.div>
// 								)}
// 							</div>
// 						</motion.div>

// 						{/* Packaging animation */}
// 						{animationStage === 'packaging' && (
// 							<motion.div
// 								className="absolute inset-0 flex items-center justify-center"
// 								initial={{ opacity: 0 }}
// 								animate={{ opacity: 1 }}
// 								exit={{ opacity: 0 }}
// 								transition={{ duration: 0.5, ease: 'easeInOut' }}>
// 								<motion.div
// 									className="absolute w-40 h-48 border-2 border-dashed border-blue-500 rounded-lg"
// 									animate={{
// 										scale: [1, 0.9],
// 										opacity: [1, 0.7, 1],
// 									}}
// 									transition={{
// 										duration: 2,
// 										repeat: Number.POSITIVE_INFINITY,
// 										repeatType: 'reverse',
// 										ease: 'easeInOut',
// 									}}
// 								/>
// 							</motion.div>
// 						)}

// 						{/* Success checkmark - only visible when complete */}
// 						{animationStage === 'complete' && (
// 							<motion.div
// 								initial={{ scale: 0, opacity: 0 }}
// 								animate={{ scale: 1, opacity: 1 }}
// 								transition={{
// 									delay: 0.2,
// 									duration: 0.6,
// 									type: 'spring',
// 									damping: 12,
// 									stiffness: 200,
// 								}}
// 								className="absolute z-30">
// 								<div className="bg-green-500 text-white rounded-full p-4 shadow-lg">
// 									<Check className="h-10 w-10" />
// 								</div>
// 							</motion.div>
// 						)}
// 					</div>

// 					<div className="mt-6">
// 						{animationStage === 'complete' ? (
// 							<motion.div
// 								initial={{ y: 10, opacity: 0 }}
// 								animate={{ y: 0, opacity: 1 }}
// 								transition={{ delay: 0.4, duration: 0.5 }}>
// 								<Button className="w-full" onClick={() => hideModal()}>
// 									Close
// 								</Button>
// 							</motion.div>
// 						) : (
// 							<div className="space-y-2">
// 								<div className="w-full bg-gray-200 rounded-full h-2.5  overflow-hidden">
// 									<motion.div
// 										className="bg-blue-600 h-2.5"
// 										style={{ width: `${progress}%` }}
// 										transition={{ duration: 0.1 }}
// 									/>
// 								</div>
// 								<div className="flex justify-between text-sm text-muted-foreground">
// 									<span>{Math.round(progress)}%</span>
// 									<span>
// 										{animationStage === 'processing'
// 											? 'Processing...'
// 											: animationStage === 'packaging'
// 											? 'Packaging...'
// 											: 'Downloading...'}
// 									</span>
// 								</div>
// 							</div>
// 						)}
// 					</div>
// 				</motion.div>
// 			</motion.div>
// 		</AnimatePresence>
// 	);
// }
