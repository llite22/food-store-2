import { Link, Outlet } from 'react-router';

export const Layout = () => {
	return (
		<div>
			<div>
				<Link to="/">Меню</Link>
				<Link to="/cart">Корзина</Link>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
};
