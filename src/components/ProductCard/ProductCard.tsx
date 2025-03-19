import { Link } from 'react-router';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';

export const ProductCard = ({
	id,
	name,
	description,
	image,
	price,
	rating
}: ProductCardProps) => {
	return (
		<Link to={`/product/${id}`} className={styles.link}>
			<div className={styles.card}>
				<div
					className={styles.head}
					style={{ backgroundImage: `url('${image}')` }}
				>
					<div className={styles.price}>
						{price}&nbsp;
						<span className={styles.currency}>₽</span>
					</div>
					<button className={styles['add-to-cart']}>
						<img
							src="/cart-button-icon.svg"
							alt="Добавить в корзину"
						/>
					</button>
					<div className={styles.rating}>
						{rating}&nbsp;
						<img src="/star-icon.svg" alt="Иконка звезды" />
					</div>
				</div>
				<div className={styles.footer}>
					<div className={styles.title}>{name}</div>
					<div className={styles.description}>{description}</div>
				</div>
			</div>
		</Link>
	);
};
