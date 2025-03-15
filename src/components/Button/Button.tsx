import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

const Button = ({ children, className, ...otherProps }: ButtonProps) => {
	return (
		<button
			{...otherProps}
			className={cn(`${styles.button} ${styles.accent}`, className)}
		>
			{children}
		</button>
	);
};

export default Button;
