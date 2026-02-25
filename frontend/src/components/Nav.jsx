import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ButtonCustom";
import api, { clearAccessToken } from "../api/axios";
import burgerMenuIcon from "../assets/burger_menu.svg";

export default function Nav() {
  const [isOpen, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const validateSession = async () => {
      try {
        await api.get("users/me/");
        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch {
        clearAccessToken();
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    };

    const syncAuthState = () => {
      void validateSession();
    };

    const handleAuthLogout = () => {
      if (isMounted) {
        setIsAuthenticated(false);
      }
    };

    void validateSession();
    window.addEventListener("auth-change", syncAuthState);
    window.addEventListener("auth-logout", handleAuthLogout);

    return () => {
      isMounted = false;
      window.removeEventListener("auth-change", syncAuthState);
      window.removeEventListener("auth-logout", handleAuthLogout);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("token/logout/");
    } catch {
      // Ignore network or auth errors during logout; local auth state is still cleared.
    }
    clearAccessToken();
    window.dispatchEvent(new Event("auth-change"));
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="bg-primary/90 flex flex-col items-center mx-auto w-full lg:w-[70%] lg:bg-white/5 py-4 lg:my-10 px-6 rounded-lg backdrop-blur-xl">
        <div className="w-full justify-between flex">
          {/* Logo + liens desktop */}
          <div className="flex w-[20%] justify-between items-center gap-8">
            <Link to="/">
              <p className="font-bold text-4xl">weeb</p>
            </Link>
            <div className="flex justify-around items-center gap-8">
              <Link
                to="/about"
                className="text-xl hidden lg:flex hover:scale-110 transition ease-in-out duration-300 cursor-pointer whitespace-nowrap"
              >
                À propos
              </Link>
              <Link
                to="/contact"
                className="text-xl hidden lg:flex hover:scale-110 transition ease-in-out duration-300 cursor-pointer"
              >
                Contact
              </Link>
              <Link
                to="/blog"
                className="text-xl hidden lg:flex hover:scale-110 transition ease-in-out duration-300 cursor-pointer"
              >
                Blog
              </Link>
              {isAuthenticated && (
                <Link
                  to="/add-article"
                  className="text-xl hidden lg:flex hover:scale-110 transition ease-in-out duration-300 cursor-pointer whitespace-nowrap"
                >
                  Ajouter
                </Link>
              )}
            </div>
          </div>

          {/* Liens + bouton desktop */}
          <div className="flex gap-4 items-center hidden lg:flex">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-[120px] justify-center bg-secondaryFlashy text-xs font-bold text-white rounded-sm py-2 px-4 hover:scale-110 transition ease-in-out duration-300 cursor-pointer"
              >
                Déconnexion
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xl hover:scale-110 transition ease-in-out duration-300 cursor-pointer"
                >
                  Connexion
                </Link>
                <Button text="Inscription" to="/signup" />
              </>
            )}
          </div>

          {/* Burger menu mobile */}
          <button
            onClick={() => setOpen(!isOpen)}
            className="lg:hidden hover:scale-110 transition ease-in-out duration-300 cursor-pointer"
          >
            <img
              src={burgerMenuIcon}
              alt="menu"
              className={`${
                isOpen ? "rotate-90" : "rotate-0"
              } cursor-pointer hover:scale-110 transition ease-in-out duration-300`}
            />
          </button>
        </div>

        {/* Menu mobile déroulant */}
        <div
          className={`${
            isOpen
              ? "h-[220px] py-2 w-[300px] border bg-secondary/5 border-secondary rounded-lg mt-10"
              : "h-[0px] mt-0 border-none"
          } overflow-hidden transition-all duration-300 flex flex-col text-center gap-4`}
        >
          <Link
            to="/about"
            className="text-xl hover:scale-110 transition ease-in-out duration-300"
          >
            À propos
          </Link>
          <Link
            to="/contact"
            className="text-xl hover:scale-110 transition ease-in-out duration-300"
          >
            Contact
          </Link>
          <Link
            to="/blog"
            className="text-xl hover:scale-110 transition ease-in-out duration-300"
          >
            Blog
          </Link>
          {isAuthenticated && (
            <Link
              to="/add-article"
              className="text-xl hover:scale-110 transition ease-in-out duration-300"
            >
              Ajouter
            </Link>
          )}
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="text-xl hover:scale-110 transition ease-in-out duration-300 cursor-pointer"
            >
              Déconnexion
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xl hover:scale-110 transition ease-in-out duration-300"
              >
                Connexion
              </Link>
              <Link
                to="/signup"
                className="text-xl hover:scale-110 transition ease-in-out duration-300"
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
