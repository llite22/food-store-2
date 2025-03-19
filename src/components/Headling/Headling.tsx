import styles from './Headling.module.css';
import { HeadlingProps } from './Headling.props';
import cn from 'classnames';

export const Headling = ({
	children,
	className,
	...otherProps
}: HeadlingProps) => {
	return (
		<h1 {...otherProps} className={cn(className, styles['h1'])}>
			{children}
		</h1>
	);
};
