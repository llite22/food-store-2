import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

const Button = ({
	children,
	className,
	appearence = 'small',
	...otherProps
}: ButtonProps) => {
	return (
		<button
			{...otherProps}
			className={cn(`${styles.button} ${styles.accent}`, className, {
				[styles.small]: appearence === 'small',
				[styles.big]: appearence === 'big'
			})}
		>
			{children}
		</button>
	);
};

export default Button;
