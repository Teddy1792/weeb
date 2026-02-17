import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/ButtonCustom";
import api from "../api/axios";

export default function PasswordResetConfirm() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("users/password-reset/confirm/", {
        uid,
        token,
        password,
      });
      setMessage(data.detail);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Le lien est invalide ou le mot de passe est trop faible."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[90%] lg:w-[70%] mx-auto justify-center lg:p-8 gap-8">
      <h1 className="text-4xl lg:text-3xl font-bold text-center">
        Nouveau mot de passe
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-[300px] lg:w-[500px] mx-auto border bg-secondary/5 border-secondary text-secondary rounded-lg py-6 px-8 mb-10 flex flex-col gap-8"
      >
        <FormInput
          name="password"
          placeholder="Nouveau mot de passe"
          passwordToggle
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormInput
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          passwordToggle
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          text={loading ? "Mise a jour..." : "Mettre a jour"}
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
}
