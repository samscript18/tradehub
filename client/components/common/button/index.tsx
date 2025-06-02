import { cn } from '@/lib/utils/cn';
import { HTMLMotionProps, Variant, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

const loadingVariants: Record<string, Variant> = {
	loading: {
		width: '2.5rem',
		height: '2.5rem',
		borderRadius: '9999px !important',
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		margin: '0px auto',
	},
	not_loading: {
		width: 'auto',
		height: 'auto',
		borderRadius: '0.375rem',
		paddingLeft: undefined,
		paddingRight: undefined,
		justifyContent: 'unset',
		alignItems: 'unset',
		margin: '0px auto',
	},
};

type Props = {
	children?: ReactNode;
	size?: 'small' | 'medium' | 'large' | 'extra-small';
	variant?: 'filled' | 'accent' | 'outline' | 'black' | 'destructive' | 'success';
	className?: string;
	rounded?: 'full' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
	icon?: React.ReactNode;
	iconPosition?: 'right' | 'left';
	disabled?: boolean;
	fullWidth?: boolean;
	loading?: boolean;
	loaderSize?: boolean;
	onClick?: () => void;
} & Omit<HTMLMotionProps<'button'>, 'onClick'>;

const Button: FC<Props> = (props) => {
	const {
		onClick,
		icon,
		className: extraClass = '',
		variant = 'outline',
		children,
		size = 'small',
		disabled = false,
		loading = false,
		loaderSize = false,
		iconPosition,
		rounded = 'md',
		fullWidth = false,
		role,
		...rest
	} = props;
	let mainClass = `rounded-${rounded} font-medium text-center duration-300 cursor-pointer border ${
		loading
			? '!rounded-full !mx-auto '
			: fullWidth
			? '!w-full h-auto !flex !items-center !justify-center gap-3 !mx-auto'
			: 'w-auto h-auto flex items-center gap-2'
	} disabled:opacity-40 disabled:cursor-not-allowed disabled:text-black `;

	switch (variant) {
		case 'filled':
			mainClass += 'bg-primary border-primary text-white hover:bg-primary/50 text-center';
			break;
		case 'accent':
			mainClass +=
				'bg-accent text-white hover:bg-accent/80 text-center border-primary text-black ';
			break;
		case 'outline':
			mainClass +=
				'bg-transparent border-primary hover:bg-primary/10 text-primary disabled:border-zinc-500/50 ';
			break;
		case 'destructive':
			mainClass +=
				'bg-transparent border-red-500/50 hover:border-red-500 hover:bg-red-500 disabled:hover:bg-transparent hover:text-black disabled:hover:text-red-500 text-red-500 disabled:border-red-500/50 ';
			break;
		case 'success':
			mainClass +=
				'bg-transparent border-green-500/50 hover:border-green-500 hover:bg-green-500 disabled:hover:bg-transparent hover:text-black disabled:hover:text-green-500 text-green-500 disabled:border-green-500/50 ';
			break;
		case 'black':
			mainClass += 'hover:bg-primary/80 bg-primary text-primary ';
			break;
		default:
			break;
	}

	if (!loading) {
		switch (size) {
			case 'extra-small':
				mainClass += 'px-4 py-[6px] text-xs ';
				break;
			case 'small':
				mainClass += 'px-6 py-2 text-[14px] ';
				break;
			case 'medium':
				mainClass += 'px-6 py-3 text-[.9rem] ';
				break;
			case 'large':
				mainClass += 'px-8 py-[14px] ';
				break;
			default:
				break;
		}
	}

	return (
		<motion.button
			onClick={onClick}
			className={cn(mainClass, extraClass, 'flex')}
			variants={loadingVariants}
			animate={loading ? 'loading' : 'not_loading'}
			transition={{ type: 'spring', stiffness: 0 }}
			disabled={disabled || loading}
			role={role}
			{...rest}>
			{loading ? (
				<span>
					<BiLoaderAlt size={loaderSize ? 20 : 30} className="text-white animate-spin" />
				</span>
			) : (
				<>
					{iconPosition === 'left' && <div className="flex items-center">{icon}</div>}
					<span className={`flex-shrink-0 ${icon && 'mt-0.5'}`}>{children}</span>
					{iconPosition === 'right' && <div className="flex items-center">{icon}</div>}
				</>
			)}
		</motion.button>
	);
};

export default Button;
