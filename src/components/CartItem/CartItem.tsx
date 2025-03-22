import { CartItemProps } from './CartItem.props';
import styles from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export const CartItem = ({ id, name, image, price, count }: CartItemProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const increase = () => {
		dispatch(cartActions.add(id));
	};

	const deincrease = () => {
		dispatch(cartActions.remove(id));
	};

	const remove = () => {
		dispatch(cartActions.delete(id));
	};

	return (
		<div className={styles.item}>
			<div
				className={styles.image}
				style={{ backgroundImage: `url('${image}')` }}
			></div>
			<div className={styles.description}>
				<div className={styles.name}>{name}</div>
				<div className={styles.price}>{price}&nbsp;₽</div>
			</div>
			<div className={styles.actions}>
				<button className={styles['minus']} onClick={deincrease}>
					<img src="/minus-icon.svg" alt="Удалить из корзины" />
				</button>
				<div className={styles.number}>{count}</div>
				<button className={styles['plus']} onClick={increase}>
					<img src="/plus-icon.svg" alt="Добавить в корзину" />
				</button>
				<button className={styles['remove']} onClick={remove}>
					<img src="/delete-icon.svg" alt="Удалить все из корзины" />
				</button>
			</div>
		</div>
	);
};
