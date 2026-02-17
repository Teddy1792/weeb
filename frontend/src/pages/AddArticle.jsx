import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ButtonCustom";
import api from "../api/axios";

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await api.post("blog/posts/", { title, content });
      navigate(`/blog/${data.id}`);
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        "Impossible de publier l'article pour le moment.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[90%] lg:w-[70%] mx-auto justify-center lg:p-8 gap-8">
      <h1 className="text-4xl lg:text-3xl font-bold text-center">
        Ajouter un article
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-[300px] lg:w-[700px] mx-auto border bg-secondary/5 border-secondary text-secondary rounded-lg py-6 px-8 mb-10 flex flex-col gap-6"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
          className="text-center placeholder-secondary border-b border-secondary focus:outline-none focus:ring-2 focus:ring-secondaryFlashy focus:border-transparent transition duration-200 py-1"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenu de l'article"
          rows={10}
          className="placeholder-secondary border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryFlashy p-3"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          text={loading ? "Publication..." : "Publier"}
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
}
