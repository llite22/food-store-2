import { useLoaderData, useNavigate } from 'react-router';
import { ProductType } from '../../intefaces/product.inteface';
import styles from './Product.module.css';
import { Headling } from '../../components/Headling/Headling';
import { cartActions } from '../../store/cart.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

export const Product = () => {
	const data = useLoaderData() as ProductType;
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	return (
		<>
			<div className={styles.header}>
				<button
					className={styles.arrowBack}
					onClick={() => navigate('/')}
				>
					<img width={15} height={15} src="/arrow-back.svg" alt="" />
				</button>
				<Headling>{data.name}</Headling>
				<button
					className={styles.addToCart}
					onClick={() => dispatch(cartActions.add(data.id))}
				>
					<img src="/cart-button-icon.svg" alt="Добавить в корзину" />
					<span>В корзину</span>
				</button>
			</div>
			<div className={styles.card}>
				<div
					className={styles.imageitem}
					style={{ backgroundImage: `url('${data.image}')` }}
				></div>
				<div className={styles.details}>
					<div className={styles.line}>
						<div className={styles.text}>Цена</div>
						<div className={styles.price}>
							{data.price}&nbsp;<span>₽</span>
						</div>
					</div>
					<hr className={styles.hr} />
					<div className={styles.line}>
						<div className={styles.text}>Рейтинг</div>
						<div className={styles.rate}>
							{data.rating}&nbsp;
							<img
								width={10}
								height={10}
								src="/star-icon.svg"
								alt="Иконка звезды"
							/>
						</div>
					</div>
					<hr className={styles.hr} />
					<div>
						<div className={styles.text}>Состав:</div>
						<ul className={styles.list}>
							{data.ingredients.map((i) => (
								<li key={i} className={styles.ingredient}>
									{i}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};
