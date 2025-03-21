import Button from '../../components/Button/Button';
import { Headling } from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, register, userActions } from '../../store/user.slice';

export const Register = () => {
	const [data, setData] = useState<{
		email: string;
		password: string;
		name: string;
	}>({
		email: '',
		password: '',
		name: ''
	});
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

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
		dispatch(userActions.clearRegisterError());

		if (!data.email.trim() || !data.password.trim()) {
			return;
		}

		dispatch(register(data));
	};

	return (
		<div className={styles.login}>
			<Headling>Вход</Headling>
			{registerErrorMessage && (
				<div className={styles.error}>{registerErrorMessage}</div>
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
				<div className={styles.field}>
					<label htmlFor="name">Ваше имя</label>
					<Input
						id="name"
						type="text"
						name="name"
						placeholder="Имя"
						value={data.name}
						onChange={handleChange}
					/>
				</div>
				<Button appearence="big" type="submit">
					Зарегистрироваться
				</Button>
			</form>
			<div className={styles.links}>
				<div>Есть аккаунт?</div>
				<div>
					<Link to="/auth/login">Войти</Link>
				</div>
			</div>
		</div>
	);
};
