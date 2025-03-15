import styles from './Input.module.css';
import cn from 'classnames';
import { InputProps } from './Input.props';

const Input = ({ className, isValid = true, ...otherProps }: InputProps) => {
	return (
		<input
			{...otherProps}
			className={cn(styles['input'], className, {
				[styles['invalid']]: !isValid
			})}
		/>
	);
};

export default Input;
