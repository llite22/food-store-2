import Button from '../../components/Button/Button';
import { Headling } from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';

export const Login = () => {
	const [data, setData] = useState<{ email: string; password: string }>({
		email: '',
		password: ''
	});
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value
		}));
	};

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());

		if (!data.email.trim() || !data.password.trim()) {
			return;
		}

		dispatch(login(data));
	};

	return (
		<div className={styles.login}>
			<Headling>Вход</Headling>
			{loginErrorMessage && (
				<div className={styles.error}>{loginErrorMessage}</div>
			)}
			<form className={styles.form} onSubmit={submit}>
				<div className={styles.field}>
					<label htmlFor="email">Ваш email</label>
					<Input
						id="email"
						type="email"
						name="email"
						placeholder="Email"
						value={data.email}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.field}>
					<label htmlFor="password">Ваш пароль</label>
					<Input
						id="password"
						type="password"
						name="password"
						placeholder="Пароль"
						value={data.password}
						onChange={handleChange}
					/>
				</div>
				<Button appearence="big" type="submit">
					Вход
				</Button>
			</form>
			<div className={styles.links}>
				<div>Нет аккаунта?</div>
				<div>
					<Link to="/auth/register">Зарегистрироваться</Link>
				</div>
			</div>
		</div>
	);
};
