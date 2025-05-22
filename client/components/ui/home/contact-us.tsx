'use client';

import Button from '@/components/common/button';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhone, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import TextField from '@/components/common/inputs/text-field';
import { useForm } from 'react-hook-form';
import { ContactUs as ContactUsType } from '@/lib/types/auth';
import { REGEX } from '@/lib/utils/regex';
import { contactUs } from '@/lib/services/auth.service';
import { toastSuccess } from '@/lib/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdLocationOn, MdMail } from 'react-icons/md';

const ContactUs = () => {
	const router = useRouter();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ContactUsType>({
		defaultValues: {
			name: '',
			email: '',
			message: '',
		},
	});
	const { mutateAsync: _contactUs, isPending: _loading } = useMutation({
		mutationKey: ['contact-us'],
		mutationFn: contactUs,
		onSuccess() {
			toastSuccess('Message Sent');
			router.push('/#home');
		},
	});
	const submit = async (e: ContactUsType) => {
		await _contactUs(e);
	};
	return (
		<section
			id="contact"
			className="py-16 px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-center md:justify-between items-center gap-12 bg-[#0A0C1B]">
			<div className="flex flex-col w-full text-center md:text-start">
				<motion.h1
					className="text-xl md:text-2xl font-bold leading-12 tracking-wide"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					variants={{
						hidden: { opacity: 0, x: -50 },
						visible: { opacity: 1, x: 0 },
					}}>
					Contact Us
				</motion.h1>
				<motion.p
					className="text-gray-400 text-[13px]"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					variants={{
						hidden: { opacity: 0, x: -50 },
						visible: { opacity: 1, x: 0 },
					}}>
					We&#39;d love to hear from you.
				</motion.p>
				<motion.form
					onSubmit={handleSubmit(submit)}
					className="space-y-8 mt-12"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 1.5 }}
					variants={{
						hidden: { opacity: 0, x: -10 },
						visible: { opacity: 1, x: 0 },
					}}>
					<TextField
						label="Name"
						InputProps={{
							placeholder: 'e.g John Doe',
							type: 'text',
							...register('name', {
								required: {
									value: true,
									message: 'This field is required',
								},
							}),
							className: 'text-[13px]',
						}}
						helperText={errors?.name?.message}
					/>

					<TextField
						label="Email Address"
						InputProps={{
							placeholder: 'e.g johndoe@gmail.com',
							type: 'email',
							...register('email', {
								required: {
									value: true,
									message: 'This field is required',
								},
								pattern: {
									value: REGEX.EMAIL,
									message: 'Enter a valid email address',
								},
							}),
							className: 'text-[13px]',
						}}
						helperText={errors?.email?.message}
					/>

					<TextField
						label="Message"
						InputProps={{
							placeholder: 'Your message',
							type: 'text',
							...register('message', {
								required: {
									value: true,
									message: 'This field is required',
								},
							}),
							className: 'text-[13px]',
						}}
						multiline
						helperText={errors?.message?.message}
					/>
					<Button type="submit" loading={_loading} fullWidth variant="filled">
						Send Message
					</Button>
				</motion.form>
			</div>
			<motion.div
				className="space-y-8 w-full"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 0.5, delay: 1 }}
				variants={{
					hidden: { opacity: 0, y: -30 },
					visible: { opacity: 1, y: 0 },
				}}>
				<div className="space-y-4 p-4 md:p-8 bg-[#111326] rounded-md hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md h-auto">
					<motion.h4
						className="text-dark text-[1.1rem] font-semibold mb-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}>
						Contact Information
					</motion.h4>
					<div className="flex flex-col space-y-8">
						<motion.div
							className="flex gap-4"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0 },
							}}>
							<FaPhone size={22} className="text-primary" />
							<div className="space-y-2">
								<p className="text-white font-medium text-sm">Phone</p>
								<Link href={'tel:+2349016956981'} className="text-center text-gray-400 text-[13px]">
									09016956981
								</Link>
							</div>
						</motion.div>
						<motion.div
							className="flex gap-4"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0 },
							}}>
							<MdMail size={27} className="text-primary" />
							<div className="space-y-2">
								<p className="text-white text-sm font-medium">Email</p>
								<Link href={'mailto:tradehubwithease@gmail.com'} className="text-gray-400 text-[13px]">
									tradehubwithease@gmail.com
								</Link>
							</div>
						</motion.div>
						<motion.div
							className="flex gap-4"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.5, delay: 0.7 }}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0 },
							}}>
							<MdLocationOn size={29} className="text-primary" />
							<div className="space-y-2">
								<p className="text-white text-sm font-medium">Address</p>
								<p className="text-gray-400 text-[13px]">Abeokuta, Ogun State</p>
							</div>
						</motion.div>
					</div>
				</div>
				<motion.div
					className="space-y-4 p-4 md:p-8 bg-[#111326] rounded-md hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}>
					<motion.h4
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}
						className="text-white font-medium mb-3">
						Follow Us
					</motion.h4>
					<ul className="text-sm flex gap-4 mt-4">
						<motion.li
							variants={{
								hidden: {
									opacity: 0,
									y: 20,
								},
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
									},
								},
							}}
							className="bg-primary p-1.5 rounded-md hover:scale-[1.05] transition-all duration-300 cursor-pointer">
							<a href="#" className="hover:underline hover:text-secondary duration-300">
								<FaFacebookF className="text-white" />
							</a>
						</motion.li>
						<motion.li
							variants={{
								hidden: {
									opacity: 0,
									y: 20,
								},
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
									},
								},
							}}
							className="bg-primary p-1.5 rounded-md hover:scale-[1.05] transition-all duration-300 cursor-pointer">
							<a href="#" className="hover:underline hover:text-secondary duration-300">
								<FaInstagram className="text-white" />
							</a>
						</motion.li>
						<motion.li
							variants={{
								hidden: {
									opacity: 0,
									y: 20,
								},
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
									},
								},
							}}
							className="bg-primary p-1.5 rounded-md hover:scale-[1.05] transition-all duration-300 cursor-pointer">
							<a href="#" className="hover:underline hover:text-secondary duration-300">
								<FaTwitter className="text-white" />
							</a>
						</motion.li>
						<motion.li
							variants={{
								hidden: {
									opacity: 0,
									y: 20,
								},
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
									},
								},
							}}
							className="bg-primary p-1.5 rounded-md hover:scale-[1.05] transition-all duration-300 cursor-pointer">
							<a href="#" className="hover:underline hover:text-secondary duration-300">
								<FaLinkedinIn className="text-white" />
							</a>
						</motion.li>
					</ul>
				</motion.div>
			</motion.div>
		</section>
	);
};
export default ContactUs;
