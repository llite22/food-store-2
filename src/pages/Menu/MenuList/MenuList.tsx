import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';

export const MenuList = ({ products }: MenuListProps) => {
	return products.map((product) => (
		<ProductCard
			key={product.id}
			id={product.id}
			name={product.name}
			description={product.ingredients.join(', ')}
			image={product.image}
			rating={product.rating}
			price={product.price}
		/>
	));
};
