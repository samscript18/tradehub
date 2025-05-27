'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, Variant, motion } from 'framer-motion';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { dropdownVariant } from '@/lib/utils/variants';
import Loader from '../loaders';
import { MdClose } from 'react-icons/md';

const labelVariants: Record<string, Variant> = {
	focused: {
		translateY: '-15px',
		opacity: 1,
		visibility: 'visible',
	},
	unfocused: {
		color: 'gray',
		translateY: 0,
		opacity: 0,
		visibility: 'hidden',
	},
};

export type Option = {
	label: string | ReactNode;
	value: string | number;
	id: string;
};

interface Props {
	data?: Option[];
	value?: string;
	onClear?(): void;
	onSelect?(option: Option): void;
	onSearch?(search?: string): Option[];
	loading?: boolean;
	inputClassName?: string;
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	showDropDownSuffix?: boolean;
	label?: string;
	helperText?: string;
}

const SelectField: FC<Props> = ({
	data = [],
	value,
	onClear,
	onSelect,
	loading,
	onSearch,
	className,
	inputClassName,
	disabled,
	placeholder,
	showDropDownSuffix = true,
	label,
	helperText,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [options, setOptions] = useState<Option[]>(data);
	const [selectedOption, setSelectedOption] = useState<Option | undefined>();
	const [search, setSearch] = useState<string>('');
	const [labelFocused, setLabelFocused] = useState<boolean>(false);

	const focusLabel = () => {
		setLabelFocused(true);
		setIsOpen(true);
	};

	useEffect(() => {
		if (data) {
			setOptions(data);
		}
	}, [data]);

	useEffect(() => {
		if (search) {
			if (onSearch) {
				const filteredOptions = onSearch(search);
				setOptions(filteredOptions);
			} else {
				const filtered = data.filter((option) => {
					const label = typeof option.label === 'string' ? option.label : '';
					return label.toLowerCase().includes(search.toLowerCase());
				});
				setOptions(filtered);
			}
		} else {
			setOptions(data);
		}
	}, [search, data, onSearch]);

	return (
		<div className={cn('relative min-w-[200px]', className)}>
			<div className="w-full">
				<header
					className={cn(
						'border-b border-gray-600 focus:border-primary py-[9px] flex items-center h-full',
						helperText && 'border-b-red-500',
						(labelFocused || isOpen) && 'border-b-2'
					)}>
					<AnimatePresence>
						{label && (
							<motion.label
								className={cn(
									'font-normal absolute top-0 left-0 text-primary text-sm',
									helperText && '!text-red-500'
								)}
								variants={labelVariants}
								animate={labelFocused || isOpen || value ? 'focused' : 'unfocused'}>
								{label}
							</motion.label>
						)}
					</AnimatePresence>

					<input
						onFocus={focusLabel}
						onBlur={() => {
							setLabelFocused(false);
							setTimeout(() => setIsOpen(false), 200);
						}}
						className={cn(
							`outline-none border-none placeholder:text-sm ${
								value && 'placeholder:text-white'
							} text-white capitalize flex-1 w-full`,
							inputClassName
						)}
						placeholder={value || placeholder || label}
						value={search}
						onChange={(e) => {
							setIsOpen(true);
							setSearch(e.target.value);
							focusLabel();
						}}
					/>

					{(value || search) && (
						<span
							className="inline-block ml-2 cursor-pointer"
							onClick={() => {
								onClear?.();
								setSearch('');
								setSelectedOption(undefined);
							}}>
							<MdClose size={20} className="text-white" />
						</span>
					)}

					{showDropDownSuffix && (
						<motion.span
							variants={dropdownVariant}
							initial="arrowClosed"
							animate={isOpen ? 'arrowOpen' : 'arrowClosed'}
							className="min-w-fit cursor-pointer"
							onClick={() => {
								if (!disabled) {
									setIsOpen((prev) => !prev);
								}
							}}>
							<BiChevronDown size={20} className="text-primary" />
						</motion.span>
					)}
				</header>
				{helperText && <p className={`text-red-500 text-[.8rem]`}>{helperText}</p>}
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						variants={dropdownVariant}
						initial="hidden"
						animate="visible"
						exit="hidden"
						className="absolute bg-black shadow-md w-full z-[20] max-h-[200px] overflow-y-scroll">
						{loading && (
							<div className="max-w-fit mx-auto">
								<Loader size={25} />
							</div>
						)}

						<div className="space-y-2">
							{options?.map((option, index) => (
								<div
									key={index + option.id}
									onClick={() => {
										setSelectedOption(option);
										onSelect?.(option);
										setSearch('');
										setIsOpen(false);
									}}
									className={cn(
										'p-4 flex items-center justify-between cursor-pointer rounded-md hover:bg-primary/50',
										selectedOption?.id === option.id && 'bg-primary/50'
									)}>
									<div className="flex-1">
										{typeof option.label === 'string' ? <p className="text-sm">{option.label}</p> : option.label}
									</div>
								</div>
							))}
						</div>

						{options.length === 0 && (
							<div className="p-2 text-center text-gray-500 text-sm">No options available</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default SelectField;
