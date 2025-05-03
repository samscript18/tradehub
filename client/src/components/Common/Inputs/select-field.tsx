import React, { FC, ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa6';
import useDropDown from '@/lib/hooks/useDropdown';
import { cn } from '@/lib/utils/cn';
import { fadeToBottomVariant, fadeToTopVariant } from '@/lib/data/variants';
export type Option = { value: string; label: string | ReactNode };

type Props = {
  label: string;
  options: Option[];
  id?: string;
  loading?: boolean;
  placeholder?: string;
  onValueChange: (value: any) => void;
  data?: Option | null;
  dropUp?: boolean;
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
};

const SelectField: FC<Props> = ({
  options,
  label,
  placeholder,
  onValueChange,
  loading = false,
  data = null,
  dropUp,
  containerProps,
}) => {
  const { dropdownRef, isOpen, toggleDropdown, closeDropdown } = useDropDown();

  const [pickedData, setPickedData] = useState<Option | null>(data);

  const updateData = (option: Option) => {
    setPickedData(option);
    onValueChange(option.value);
    closeDropdown();
  };

  return (
    <div className="space-y-1 relative min-w-fit">
      <p className="text-[.9rem]">{label}</p>
      <div
        {...containerProps}
        className={cn(
          `bg-white dark:bg-white/10 duration-200 hover:bg-gray-100 dark:hover:bg-transparent w-full p-[12px] border dark:border-white/10 rounded-lg select-none flex items-center justify-between gap-2 ${
            loading ? 'cursor-not-allowed' : 'cursor-pointer'
          }`,
          containerProps?.className
        )}
        onClick={loading ? () => {} : toggleDropdown}
        ref={dropdownRef}
      >
        {loading ? (
          <p className="opacity-50 text-[.8rem]">Loading...</p>
        ) : !pickedData ? (
          <p className="opacity-50 text-[.8rem]">
            {placeholder ?? 'Select option'}
          </p>
        ) : (
          <p className="text-[.8rem] w-full">{pickedData.label}</p>
        )}
        <FaChevronUp
          size={14}
          className={`duration-200 text-gray-600 ${isOpen && 'rotate-180'}`}
        />
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <OptionComp
            options={options}
            updateData={updateData}
            dropUp={dropUp}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

type OptionProps = {
  options: Option[];
  updateData: (option: Option) => void;
  dropUp?: boolean;
};

export const OptionComp: FC<OptionProps> = ({
  options,
  updateData,
  dropUp,
}) => {
  const [stateOptions, setStateOptions] = useState(options);

  return (
    <motion.div
      {...(dropUp ? fadeToTopVariant : fadeToBottomVariant)}
      key={Math.random()}
      className={`absolute ${
        dropUp ? 'bottom-[100%]' : 'top-[100%]'
      } border dark:border-white/20 border-black/10  z-[400] divide-white/20 dark:text-zinc-400 dark:bg-secondary-900 bg-white dark:bg-[#1a1a1a] shadow-2xl left-0 w-full min-w-fit rounded divide-y dark:divide-white/10 max-h-[15rem] overflow-y-auto show-scroll`}
    >
      <>
        {stateOptions.map((opt, id) => (
          <div
            key={id}
            className="p-2 duration-200 cursor-pointer dark:bg-secondary-900 bg-white dark:bg-[#1a1a1a] text-sm hover:bg-gray-100 dark:hover:bg-[#383838]"
            onClick={() => updateData(opt)}
          >
            {opt.label}
          </div>
        ))}
      </>
    </motion.div>
  );
};

export default SelectField;
