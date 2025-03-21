import Button from '../../components/Button/Button';
import { Headling } from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { Link, useNavigate } from 'react-router';
import { LoginResponse } from '../../intefaces/auth.interface';

export const Login = () => {
	const [data, setData] = useState<{ email: string; password: string }>({
		email: '',
		password: ''
	});
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value
		}));
	};

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!data.email.trim() || !data.password.trim()) {
			setError('Пожалуйста, заполните все поля.');
			return;
		}

		await sendLogin();
	};

	const sendLogin = async () => {
		try {
			const response = await axios.post<LoginResponse>(
				`${PREFIX}/auth/login`,
				{
					email: data.email,
					password: data.password
				}
			);

			localStorage.setItem('jwt', response.data.access_token);
			navigate('/');
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.response?.data.message || 'Ошибка авторизации');
			}
		}
	};

	return (
		<div className={styles.login}>
			<Headling>Вход</Headling>
			{error && <div className={styles.error}>{error}</div>}
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
