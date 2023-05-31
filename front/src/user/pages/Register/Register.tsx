import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PublicLayout from '../../layout/PublicLayout';
import AgreementModal from '../../components/Modal/AgreementModal';
import ContractOfferModal from '../../components/Modal/ContractOfferModal';
import RegisterImg from '../../assets/img/create-account-office.jpeg';
import RegisterImgDark from '../../assets/img/create-account-office-dark.jpeg';

interface FormRegister {
    nick_name: string;
    user_name: string;
    phone_number: string;
    email: string;
    password: string;
    password_confirm: string;
}

const Register: React.FC = () => {
    useEffect(() => {
        document.title = "Регистрация";
    }, []);

    const navigate = useNavigate();

    const [formRegister, setFormRegister] = useState<FormRegister>({
        nick_name: "",
        user_name: "",
        phone_number: "",
        email: "",
        password: "",
        password_confirm: "",
    });

    const [agreementChecked, setAgreementChecked] = useState(false);

    const handleAgreementChecked = () => {
        setAgreementChecked(!agreementChecked);
    };

    const onChangeForm = (label: string, event: React.ChangeEvent<HTMLInputElement>) => {
        switch (label) {
            case "nick_name":
                setFormRegister({ ...formRegister, nick_name: event.target.value });
                break;
            case "user_name":
                setFormRegister({ ...formRegister, user_name: event.target.value });
                break;
            case "phone_number":
                setFormRegister({ ...formRegister, phone_number: event.target.value });
                break;
            case "email":
                const email_validation = /\S+@\S+\.\S+/;
                if (email_validation.test(event.target.value)) {
                    setFormRegister({ ...formRegister, email: event.target.value });
                }
                break;
            case "password":
                setFormRegister({ ...formRegister, password: event.target.value });
                break;
            case "password_confirm":
                setFormRegister({ ...formRegister, password_confirm: event.target.value });
                break;
            default:
                console.log(`Unknown label: ${label}`);
                break;
        }
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!agreementChecked) {
            toast.error("Вы должны принять пользовательское соглашение!");
            return;
        }

        if (formRegister.password !== formRegister.password_confirm) {
            toast.error("Пароли не совпадают!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8888/auth/register", formRegister);
            toast.success(response.data.detail);

            setTimeout(() => {
                window.location.reload();
            }, 1000);

            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.detail);
        }
    };

    return (
        <>
            <PublicLayout>
                <h1 className="text-center pt-20 text-2xl tracking-wide font-extrabold text-blue-600 dark:text-white">Страница регистрации</h1>
                <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                    <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl text-blue-600 dark:text-blue-300">
                        <div className="flex flex-col overflow-y-auto md:flex-row">
                            <div className="h-32 md:h-auto md:w-1/2">
                                <img
                                    alt="image"
                                    aria-hidden="true"
                                    className="object-cover w-full h-full dark:hidden"
                                    src={RegisterImg}
                                />
                                <img
                                    alt="image"
                                    aria-hidden="true"
                                    className="hidden object-cover w-full h-full dark:block"
                                    src={RegisterImgDark}
                                />
                            </div>
                            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                                <div className="w-full">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Создать аккаунт</h2>
                                    <form onSubmit={onSubmitHandler}>
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                placeholder="Придумайте Логин"
                                                className="block text-sm py-1.5 px-2 rounded-md w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                                                onChange={(e) => onChangeForm("nick_name", e)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Ваша Фамилия и Имя"
                                                className="block text-sm py-1.5 px-2 rounded-md w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                                                onChange={(e) => onChangeForm("user_name", e)}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Ваш номер телефона"
                                                className="block text-sm py-1.5 px-2 rounded-md w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                                                onChange={(e) => onChangeForm("phone_number", e)}
                                            />
                                            <input
                                                type="email"
                                                placeholder="Ваш Email"
                                                className="block text-sm py-1.5 px-2 rounded-md w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                                                onChange={(e) => onChangeForm("email", e)}
                                                required
                                            />
                                            <input
                                                type="password"
                                                placeholder="Придумайте Пароль"
                                                className="block text-sm py-1.5 px-2 rounded-md w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                                                onChange={(e) => onChangeForm("password", e)}
                                                required
                                            />
                                            <input
                                                type="password"
                                                placeholder="Повторите Пароль"
                                                className="block text-sm py-1.5 px-2 rounded-md w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                                                onChange={(e) => onChangeForm("password_confirm", e)}
                                                required
                                            />
                                        </div>
                                        <div className="text-center mt-6">
                                            <button
                                                type="submit"
                                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                                            >
                                                Зарегистрироваться
                                            </button>
                                        </div>
                                    </form>
                                    <div className="flex mt-6 text-sm">
                                        <label className="flex items-center dark:text-gray-400">
                                            <input
                                                type="checkbox"
                                                className="text-blue-600 form-checkbox focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
                                                checked={agreementChecked}
                                                onChange={handleAgreementChecked}
                                                required
                                            />
                                            <span className="ml-2">
                                                Вы соглашаетесь c <AgreementModal /> и&nbsp; <ContractOfferModal />
                                            </span>
                                        </label>
                                    </div>
                                    <hr className="my-8" />
                                    <p className="mt-4">
                                        <NavLink
                                            to="/login"
                                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            У вас уже есть учетная запись? Вход
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

export default Register;
