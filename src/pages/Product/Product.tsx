import { useLoaderData } from 'react-router';
import { ProductType } from '../../intefaces/product.inteface';

export const Product = () => {
	const data = useLoaderData() as ProductType;
	return <div>Product {data.id}</div>;
};
