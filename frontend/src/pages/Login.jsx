import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/ButtonCustom";
import api, { setAccessToken } from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        await api.get("users/me/");
        if (isMounted) {
          navigate("/blog");
        }
      } catch {
        // Keep user on login page when no valid refresh cookie exists.
      }
    };

    void restoreSession();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await api.post("token/", { email, password });

      setAccessToken(data.access);
      window.dispatchEvent(new Event("auth-change"));
      navigate("/blog");
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Identifiants invalides";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[90%] lg:w-[70%] mx-auto justify-center lg:p-8 gap-8">
      <h1 className="text-4xl lg:text-3xl font-bold text-center">
        Se connecter
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center mx-auto w-[300px] lg:w-[500px] border bg-secondary/5 border-secondary text-secondary rounded-lg py-6 px-8 mb-10 gap-8"
      >
        <FormInput
          name="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          name="password"
          placeholder="Mot de passe"
          passwordToggle
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Link
          to="/reset-password"
          className="text-sm text-secondaryFlashy hover:underline text-center"
        >
          Mot de passe oublie ?
        </Link>

        <Button
          text={loading ? "Connexion..." : "Connexion"}
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
}
