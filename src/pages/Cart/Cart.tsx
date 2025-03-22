import { useDispatch, useSelector } from 'react-redux';
import { Headling } from '../../components/Headling/Headling';
import { AppDispatch, RootState } from '../../store/store';
import { CartItem } from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { ProductType } from '../../intefaces/product.inteface';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router';
import { cartActions } from '../../store/cart.slice';

const DELIVERY_PRICE = 169;

export const Cart = () => {
	const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
	const { items } = useSelector((s: RootState) => s.cart);
	const { jwt } = useSelector((s: RootState) => s.user);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		loadAllItems();
	}, [items]);

	const getItem = async (id: number) => {
		const { data } = await axios.get<ProductType>(
			`${PREFIX}/products/${id}`
		);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map((i) => getItem(i.id)));
		setCartProducts(res);
	};

	const total = items
		.map((i) => {
			const product = cartProducts.find((p) => p.id === i.id);
			if (!product) {
				return 0;
			}
			return i.count * product.price;
		})
		.reduce((acc, item) => (acc += item), 0);

	const checkout = async () => {
		await axios.post(
			`${PREFIX}/order/`,
			{
				products: items
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}
		);
		dispatch(cartActions.cleanCart());
		navigate('/success');
	};

	return (
		<>
			<div>
				<Headling className={styles.headling}>Корзина</Headling>
				{items.map((i) => {
					const product = cartProducts.find((p) => p.id === i.id);
					if (!product) return;
					return (
						<CartItem
							key={product.id}
							count={i.count}
							{...product}
						/>
					);
				})}
			</div>
			<div className={styles.line}>
				<div className={styles.text}>Итог</div>
				<div className={styles.price}>
					{total}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.line}>
				<div className={styles.text}>Доставка</div>
				<div className={styles.price}>
					{DELIVERY_PRICE}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.line}>
				<div className={styles.text}>
					Итог{' '}
					<span className={styles['total-count']}>
						({items.length})
					</span>
				</div>
				<div className={styles.price}>
					{total + DELIVERY_PRICE}&nbsp;<span>₽</span>
				</div>
			</div>
			<div className={styles.checkout}>
				<Button appearence="big" onClick={checkout}>
					оформить
				</Button>
			</div>
		</>
	);
};
