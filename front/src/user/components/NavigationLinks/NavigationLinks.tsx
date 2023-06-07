import React from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { path: "/", text: "Главная" },
  { path: "/contacts", text: "Контакты" },
  { path: "/faq", text: "F.A.Q." },
  { path: "/agreement", text: "Пользовательское соглашение" },
  { path: "/contract", text: "Договор оферты" },
  { path: "/register", text: "Регистрация" },
  { path: "/login", text: "Аккаунт" },
];

const NavigationLinks: React.FC = () => {

  // Стили для активной ссылки
  const activeLink =
    "block py-1 md:py-3 pl-1 align-middle text-orange-500 no-underline border-b-2 border-orange-500 hover:border-orange-600";

  // Стили для неактивной ссылки
  const inactiveLink =
    "block py-1 md:py-3 pl-1 align-middle text-teal-700 no-underline dark:text-gray dark:hover:text-white border-b-2 border-white hover:border-teal-700";

  return (
    <>
      <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 z-20" id="nav-content">
        <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0 justify-end">

          {links.map((link) => (
            <li className="mr-6 my-2 md:my-0" key={link.path}>
              {link.path === "/login" ? (
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-rose-500 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray dark:text-blue-900 rounded-md group-hover:bg-opacity-0">{link.text}</span>
                </button>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? activeLink : inactiveLink
                  }
                >
                  <span className="pb-1 md:pb-0 text-sm">{link.text}</span>
                </NavLink>
              )}
            </li>
          ))}

        </ul>
      </div>
    </>
  );
}

export default NavigationLinks;