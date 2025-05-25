// 'use client';

// import { useState, useRef, useEffect } from 'react';

// interface MultiSelectStoreCategoryProps {
// 	data: {
// 		value: string;
// 		label: string;
// 		icon: string;
// 	}[];
// 	selectedCategories?: string[];
// 	onSelectionChange?: (categories: string[]) => void;
// 	placeholder?: string;
// 	maxSelections?: number;
// }

// export default function MultiSelectCategory({
// 	data = [],
// 	selectedCategories = [],
// 	onSelectionChange,
// 	placeholder = 'Select categories...',
// 	maxSelections,
// }: MultiSelectStoreCategoryProps) {
// 	const [open, setOpen] = useState(false);
// 	const [selected, setSelected] = useState<string[]>(selectedCategories);
// 	const [searchTerm, setSearchTerm] = useState('');
// 	const dropdownRef = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		const handleClickOutside = (event: MouseEvent) => {
// 			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// 				setOpen(false);
// 			}
// 		};

// 		document.addEventListener('mousedown', handleClickOutside);
// 		return () => document.removeEventListener('mousedown', handleClickOutside);
// 	}, []);

// 	const handleSelect = (categoryValue: string) => {
// 		let newSelected: string[];

// 		if (selected.includes(categoryValue)) {
// 			newSelected = selected.filter((item) => item !== categoryValue);
// 		} else {
// 			if (maxSelections && selected.length >= maxSelections) {
// 				return;
// 			}
// 			newSelected = [...selected, categoryValue];
// 		}

// 		setSelected(newSelected);
// 		onSelectionChange?.(newSelected);
// 	};

// 	const handleRemove = (categoryValue: string) => {
// 		const newSelected = selected.filter((item) => item !== categoryValue);
// 		setSelected(newSelected);
// 		onSelectionChange?.(newSelected);
// 	};

// 	const filteredCategories = data.filter((category) =>
// 		category.label.toLowerCase().includes(searchTerm.toLowerCase())
// 	);

// 	const selectedItems = data.filter((category) => selected.includes(category.value));

// 	return (
// 		<div className="w-full space-y-2">
// 			{/* Main Select Button */}
// 			<div className="relative" ref={dropdownRef}>
// 				<button
// 					type="button"
// 					onClick={() => setOpen(!open)}
// 					className="w-full min-h-[40px] px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between">
// 					<div className="flex-1">
// 						{selected.length === 0 ? (
// 							<span className="text-gray-500">{placeholder}</span>
// 						) : (
// 							<span className="text-sm text-gray-600">
// 								{selected.length} categor{selected.length === 1 ? 'y' : 'ies'} selected
// 							</span>
// 						)}
// 					</div>
// 					<svg
// 						className={`w-5 h-5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
// 						fill="none"
// 						stroke="currentColor"
// 						viewBox="0 0 24 24">
// 						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// 					</svg>
// 				</button>

// 				{/* Dropdown */}
// 				{open && (
// 					<div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
// 						{/* Search Input */}
// 						<div className="p-2 border-b border-gray-200">
// 							<input
// 								type="text"
// 								placeholder="Search categories..."
// 								value={searchTerm}
// 								onChange={(e) => setSearchTerm(e.target.value)}
// 								className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// 							/>
// 						</div>

// 						{/* Options */}
// 						<div className="py-1">
// 							{filteredCategories.length === 0 ? (
// 								<div className="px-3 py-2 text-sm text-gray-500">No categories found.</div>
// 							) : (
// 								filteredCategories.map((category) => (
// 									<button
// 										key={category.value}
// 										type="button"
// 										onClick={() => handleSelect(category.value)}
// 										className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center justify-between">
// 										<div className="flex items-center gap-2">
// 											<span className="text-lg">{category.icon}</span>
// 											<span className="text-sm">{category.label}</span>
// 										</div>
// 										{selected.includes(category.value) && (
// 											<svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
// 												<path
// 													fillRule="evenodd"
// 													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
// 													clipRule="evenodd"
// 												/>
// 											</svg>
// 										)}
// 									</button>
// 								))
// 							)}
// 						</div>
// 					</div>
// 				)}
// 			</div>

// 			{/* Selected Categories Display */}
// 			{selected.length > 0 && (
// 				<div className="flex flex-wrap gap-2">
// 					{selectedItems.map((category) => (
// 						<div
// 							key={category.value}
// 							className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-sm">
// 							<span>{category.icon}</span>
// 							<span>{category.label}</span>
// 							<button
// 								type="button"
// 								onClick={() => handleRemove(category.value)}
// 								className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none">
// 								<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
// 									<path
// 										fillRule="evenodd"
// 										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
// 										clipRule="evenodd"
// 									/>
// 								</svg>
// 							</button>
// 						</div>
// 					))}
// 				</div>
// 			)}

// 			{/* Max selections warning */}
// 			{maxSelections && selected.length >= maxSelections && (
// 				<p className="text-sm text-amber-600">Maximum {maxSelections} categories can be selected.</p>
// 			)}
// 		</div>
// 	);
// }

'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, Variant, motion } from 'framer-motion';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { dropdownVariant } from '@/lib/utils/variants';
import Loader from '../loaders';
import { MdClose } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';

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
	value?: string[];
	onClear?(): void;
	onSelect?(options: Option[]): void;
	onSearch?(search?: string): Option[];
	loading?: boolean;
	inputClassName?: string;
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	showDropDownSuffix?: boolean;
	label?: string;
	helperText?: string;
	maxSelections?: number;
}

const MultiSelectField: FC<Props> = ({
	data = [],
	// value = [],
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
	maxSelections,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [options, setOptions] = useState<Option[]>(data);
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
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

	const handleSelect = (option: Option) => {
		let newSelected: Option[];

		if (selectedOptions.some((item) => item.id === option.id)) {
			newSelected = selectedOptions.filter((item) => item.id !== option.id);
		} else {
			if (maxSelections && selectedOptions.length >= maxSelections) {
				return;
			}
			newSelected = [...selectedOptions, option];
		}

		setSelectedOptions(newSelected);
		onSelect?.(newSelected);
	};

	return (
		<div className={cn('relative min-w-[200px]', className)}>
			<div>
				<header
					className={cn(
						'bg-black border-b border-gray-600 focus:border-primary py-[9px] flex items-center h-full',
						helperText && 'border-b-red-500',
						(labelFocused || isOpen) && 'border-b-2'
					)}>
					<AnimatePresence>
						{label && (
							<motion.label
								className={cn(
									'font-normal absolute top-0 left-0 text-gray-400 text-sm',
									helperText && '!text-red-500'
								)}
								variants={labelVariants}
								animate={labelFocused || isOpen || selectedOptions.length > 0 ? 'focused' : 'unfocused'}>
								{label}
							</motion.label>
						)}
					</AnimatePresence>

					<input
						onFocus={focusLabel}
						onBlur={() => {
							setLabelFocused(false);
							// Delay closing to allow for option selection
							setTimeout(() => setIsOpen(false), 200);
						}}
						className={cn(
							`bg-black outline-none border-none placeholder:text-sm text-sm text-white flex-1 w-full`,
							inputClassName
						)}
						placeholder={
							labelFocused
								? placeholder
								: selectedOptions.length > 0
								? `${selectedOptions.length} selected`
								: label
						}
						value={search}
						onChange={(e) => {
							setIsOpen(true);
							setSearch(e.target.value);
							focusLabel();
						}}
					/>

					{(selectedOptions.length > 0 || search) && (
						<span
							className="inline-block ml-2 cursor-pointer"
							onClick={() => {
								onClear?.();
								setSearch('');
								setSelectedOptions([]);
							}}>
							<MdClose size={20} className="text-black" />
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
								<MultiSelectOption
									key={index + option.id}
									option={option}
									isSelected={selectedOptions.some((item) => item.id === option.id)}
									onSelect={handleSelect}
								/>
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

interface MultiSelectOptionProps {
	option: Option;
	isSelected: boolean;
	onSelect: (option: Option) => void;
}

const MultiSelectOption: FC<MultiSelectOptionProps> = ({ option, isSelected, onSelect }) => {
	return (
		<div
			onClick={() => onSelect(option)}
			className={cn(
				'p-4 flex items-center justify-between cursor-pointer rounded-md hover:bg-primary/50',
				isSelected && 'bg-primary/50'
			)}>
			<div className="flex-1">
				{typeof option.label === 'string' ? <p className="text-sm">{option.label}</p> : option.label}
			</div>
			{isSelected && <IoMdCheckmark className="text-primary" size={18} />}
		</div>
	);
};

export default MultiSelectField;
