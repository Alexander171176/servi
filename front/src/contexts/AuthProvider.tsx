import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface User {
  nick_name: string;
  user_name: string;
  phone_number: string;
  email: string;
  id: string;
  role_name: string;
}

interface UserContextProps {
  user: User | null;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");
    toast("Успешно!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/"); // Используем useNavigate для перенаправления пользователя
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const auth_token = localStorage.getItem("auth_token");
        const auth_token_type = localStorage.getItem("auth_token_type");
        const token = `${auth_token_type} ${auth_token}`;
        const response = await axios.get<User>("http://localhost:8888/admin/", {
          headers: { Authorization: token },
        });
        setUser(response.data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Устанавливаем состояние загрузки в false после завершения запроса
      }
    };

    loadUser();
  }, []);

  if (loading) {
    // Показываем загрузочный экран или спиннер во время загрузки
    return <p className="text-center text-danger">Загрузка...</p>;
  }

  const value = { user, logout };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export { AuthProvider };