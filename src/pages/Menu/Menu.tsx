import { ChangeEvent, useEffect, useState } from 'react';
import { Headling } from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { ProductType } from '../../intefaces/product.inteface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

const Menu = () => {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>('');

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		try {
			const { data } = await axios.get<ProductType[]>(
				`${PREFIX}/products`,
				{ params: { name } }
			);
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<div className={styles.head}>
				<Headling>Меню</Headling>
				<Search
					placeholder="Введите блюдо или состав"
					onChange={updateFilter}
				/>
			</div>
			<div>
				{error && <div>{error}</div>}
				{!isLoading && products.length > 0 && (
					<MenuList products={products} />
				)}
				{isLoading && <div>Loading...</div>}
				{!isLoading && products.length === 0 && (
					<>Не найдено блюдо по запросу</>
				)}
			</div>
		</>
	);
};

export default Menu;
