import styles from './Search.module.css';
import cn from 'classnames';
import { SearchProps } from './Search.props';

const Search = ({ className, isValid = true, ...otherProps }: SearchProps) => {
	return (
		<div className={styles['input-wrapper']}>
			<input
				{...otherProps}
				className={cn(styles['input'], className, {
					[styles['invalid']]: !isValid
				})}
			/>
			<img
				className={styles['icon']}
				src="/search-icon.svg"
				alt="Иконка лупы"
			/>
		</div>
	);
};

export default Search;
