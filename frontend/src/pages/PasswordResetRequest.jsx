import { useState } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/ButtonCustom";
import api from "../api/axios";

export default function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data } = await api.post("users/password-reset/", { email });
      setMessage(data.detail);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Impossible d'envoyer le lien de reinitialisation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[90%] lg:w-[70%] mx-auto justify-center lg:p-8 gap-8">
      <h1 className="text-4xl lg:text-3xl font-bold text-center">
        Reinitialiser le mot de passe
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-[300px] lg:w-[500px] mx-auto border bg-secondary/5 border-secondary text-secondary rounded-lg py-6 px-8 mb-10 flex flex-col gap-8"
      >
        <FormInput
          name="email"
          placeholder="Votre adresse email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          text={loading ? "Envoi..." : "Envoyer le lien"}
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
}
