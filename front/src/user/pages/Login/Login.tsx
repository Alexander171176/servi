import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import PublicLayout from '../../layout/PublicLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import { FiRefreshCw } from 'react-icons/fi';
import LoginImg from '../../assets/img/login-office.jpeg';
import LoginImgDark from '../../assets/img/login-office-dark.jpeg';

const Login: React.FC = () => {
    useEffect(() => {
        document.title = 'Вход в систему';
    }, []);

    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const handleReload = () => {
        window.location.reload();
    };

    const [captchaValue, setCaptchaValue] = useState('');

    const onChange = (value: string | null) => {
        if (value) {
            setCaptchaValue(value);
        }
    };

    const onChangeForm = (label: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({ ...loginForm, [label]: event.target.value });
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!captchaValue) {
            toast.error('Пожалуйста, подтвердите, что вы не робот');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8888/auth/login', loginForm);

            localStorage.setItem('auth_token', response.data.result.access_token);
            localStorage.setItem('auth_token_type', response.data.result.token_type);

            if (response.data.result.token_type) {
                toast.success(response.data.detail);
            } else {
                toast.error(response.data.message);
            }

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.detail);
        }
    };

    // Проверяем, есть ли токен авторизации в локальном хранилище при загрузке компонента
    useEffect(() => {
        if (localStorage.getItem("auth_token")) {
            navigate("/profile");
        }
    }, [navigate]);

    return (
        <>
            <PublicLayout>
                <h1 className="text-center pt-20 text-2xl tracking-wide font-extrabold text-blue-600 dark:text-white">Страница авторизации</h1>
                <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                    <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                        <div className="flex flex-col overflow-y-auto md:flex-row">
                            <div className="h-32 md:h-auto md:w-1/2">
                                <img
                                    alt="image"
                                    aria-hidden="true"
                                    className="object-cover w-full h-full dark:hidden"
                                    src={LoginImg}
                                />
                                <img
                                    alt="image"
                                    aria-hidden="true"
                                    className="hidden object-cover w-full h-full dark:block"
                                    src={LoginImgDark}
                                />
                            </div>
                            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                                <div className="w-full">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                        Вход в систему
                                    </h2>

                                    <form onSubmit={onSubmitHandler}>
                                        <div className="space-y-2">
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="block text-sm py-1.5 px-2 rounded-md w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                                                onChange={(e) => onChangeForm('email', e)}
                                                required
                                            />
                                            <input
                                                type="password"
                                                placeholder="Пароль"
                                                className="block text-sm py-1.5 px-2 rounded-md w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                                                onChange={(e) => onChangeForm('password', e)}
                                                required
                                            />
                                        </div>

                                        <button className="flex mt-2 mx-auto dark:text-white" onClick={handleReload}>
                                            <FiRefreshCw className="mt-1" /> &nbsp; Перезагрузить reCAPTCHA
                                        </button>

                                        <ReCAPTCHA
                                            className="mt-2 mx-auto"
                                            sitekey="6LffPWQlAAAAAJysCpBO6xPpeJHTsgsRXFqft2dS"
                                            onChange={onChange}
                                        />

                                        <div className="text-center mt-6">
                                            <button
                                                type="submit"
                                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                                            >
                                                Войти
                                            </button>
                                        </div>
                                    </form>

                                    <hr className="my-8" />

                                    <p className="mt-4">
                                        <NavLink
                                            to="/forgot"
                                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            Забыли свой пароль?
                                        </NavLink>
                                    </p>
                                    <p className="mt-1">
                                        <NavLink
                                            to="/register"
                                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            Регистрация
                                        </NavLink>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PublicLayout>
        </>
    );
};

export default Login;
