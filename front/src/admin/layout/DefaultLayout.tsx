import React, { ReactNode, useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';

interface User {
  nick_name: string;
  user_name: string;
  phone_number: string;
  email: string;
  id: string;
  role_name: string;
}

interface UserContextProps {
  user: User;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps | null>(null);

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [user, setUser] = useState<User>({
    nick_name: '',
    user_name: '',
    phone_number: '',
    email: '',
    id: '',
    role_name: '',
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const auth_token = localStorage.getItem('auth_token');
        const auth_token_type = localStorage.getItem('auth_token_type');
        const token = `${auth_token_type} ${auth_token}`;
        const response = await axios.get<User>('http://localhost:8888/admin/', {
          headers: { Authorization: token },
        });
        setUser(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_type');
    toast('Успешно!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    window.location.href = '/';
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <UserContext.Provider value={{ user, logout }}>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
                <div className="profile-page mt-96">
                  <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 dark:bg-gray-700 dark:text-gray-200">
                        <div className="px-6">
                          <div className="text-center mt-12">
                            <h3 className="text-4xl font-semibold">Профиль</h3>
                            <p className="mt-0 mb-2 text-blueGray-600">
                              Информация о пользователе
                            </p>
                            <hr className="my-4" />
                          </div>
                          <div className="mt-10 py-10 border-t border-blueGray-200 text-blueGray-500 px-6">
                            <div className="flex flex-wrap">
                              <div className="w-full lg:w-6/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                                  <div className="px-4 py-5 flex-auto">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                                      <i className="fas fa-user"></i>
                                    </div>
                                    <h6 className="text-xl font-semibold">
                                      {user.nick_name}
                                    </h6>
                                    <p className="mt-2 mb-4 text-blueGray-500">
                                      {user.user_name}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="w-full lg:w-6/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                                  <div className="px-4 py-5 flex-auto">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                                      <i className="fas fa-envelope"></i>
                                    </div>
                                    <h6 className="text-xl font-semibold">
                                      Email
                                    </h6>
                                    <p className="mt-2 mb-4 text-blueGray-500">
                                      {user.email}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <button
                                className="py-2 px-4 mt-5 text-sm font-medium rounded-lg text-white transition-colors duration-200 transform bg-red-500 hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                onClick={logout}
                              >
                                Выйти
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
    </UserContext.Provider>
  );
};

export default DefaultLayout;
