import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PublicLayout from "../../layout/PublicLayout";
import ForgotImg from '../../assets/img/forgot-password-office.jpeg';
import ForgotImgDark from '../../assets/img/forgot-password-office-dark.jpeg';

interface ForgotForm {
    email: string;
    new_password: string;
    confirm_password: string;
}

const Forgot: React.FC = () => {
    useEffect(() => {
        document.title = 'Восстановление пароля';
    }, []);

    const navigate = useNavigate();

    const [forgotForm, setForgotForm] = useState<ForgotForm>({
        email: "",
        new_password: "",
        confirm_password: "",
    });

    const onChangeForm = (
        label: keyof ForgotForm,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForgotForm({ ...forgotForm, [label]: event.target.value });
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (forgotForm.new_password !== forgotForm.confirm_password) {
            toast.error("Пароли не совпадают");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8888/auth/forgot", forgotForm);
            toast.success(response.data.detail);

            setTimeout(() => {
                window.location.reload();
            }, 1000);

            navigate('/login');
        } catch (error) {
            toast.error(error.response.data.detail);
        }
    };

    return (
        <>
            <PublicLayout>
                <h1 className="text-center pt-20 text-2xl tracking-wide font-extrabold text-blue-600 dark:text-white">Страница восстановления пароля</h1>
                <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                    <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                        <div className="flex flex-col overflow-y-auto md:flex-row">
                            <div className="h-32 md:h-auto md:w-1/2">
                                <img
                                    alt="image"
                                    aria-hidden="true"
                                    className="object-cover w-full h-full dark:hidden"
                                    src={ForgotImg}
                                />
                                <img
                                    alt="image"
                                    aria-hidden="true"
                                    className="hidden object-cover w-full h-full dark:block"
                                    src={ForgotImgDark}
                                />
                            </div>
                            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                                <div className="w-full">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                        Восстановление пароля
                                    </h2>
                                    <form onSubmit={onSubmitHandler}>
                                        <div className="space-y-4">
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={forgotForm.email}
                                                    placeholder="Email"
                                                    className="block text-sm py-1.5 px-2 rounded-md w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                                                    onChange={(e) => onChangeForm("email", e)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    name="new_password"
                                                    value={forgotForm.new_password}
                                                    placeholder="Новый пароль"
                                                    className="block text-sm py-1.5 px-2 rounded-md w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                                                    onChange={(e) => onChangeForm("new_password", e)}
                                                    minLength={8}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    value={forgotForm.confirm_password}
                                                    placeholder="Подтвердите новый пароль"
                                                    className="block text-sm py-1.5 px-2 rounded-md w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                                                    onChange={(e) => onChangeForm("confirm_password", e)}
                                                    minLength={8}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center mt-6">
                                            <button
                                                type="submit"
                                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                                            >
                                                Обновить пароль
                                            </button>
                                        </div>
                                    </form>
                                    <hr className="my-8" />
                                    <p className="mt-4">
                                        <NavLink
                                            to="/login"
                                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            Вернуться назад
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

export default Forgot;
