import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUsername(user?.username || "Usuário");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-20 w-full py-4 px-6 flex justify-between items-center bg-blue-200 dark:bg-gray-800 z-50 shadow-md">
      <div className="flex items-center gap-4">
        <img
          src="/logoSPT.svg"
          alt="Logo"
          className="dark:invert h-12 w-auto sm:h-16"
        />
        <h1 className="hidden sm:block text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-200">
          Super Painel de Tarefas
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
          Olá, {username}!
        </span>

        <label
          htmlFor="theme-toggle"
          className="relative inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="theme-toggle"
            className="sr-only"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <div className="w-12 h-6 flex items-center bg-gray-200 dark:bg-gray-600 rounded-full transition-all duration-300">
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 flex items-center justify-center ${darkMode ? "translate-x-6" : "translate-x-1"
                }`}
            >
              {darkMode ? "🌙" : "☀️"}
            </div>
          </div>
        </label>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200"
        >
          <HiOutlineLogout className="w-5 h-5" />
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
