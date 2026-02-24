import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import Button from "../components/ButtonCustom";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Promise.allSettled([api.get(`blog/posts/${id}/`), api.get("users/me/")])
      .then(([articleResult, userResult]) => {
        if (!isMounted) {
          return;
        }

        if (articleResult.status !== "fulfilled") {
          setError("Article introuvable.");
          return;
        }

        const articleData = articleResult.value.data;
        setArticle(articleData);
        setEditedTitle(articleData.title);
        setEditedContent(articleData.content);

        if (userResult.status === "fulfilled") {
          setCurrentUserId(userResult.value.data.id);
        } else {
          setCurrentUserId(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const canEdit = Boolean(article && currentUserId && article.author === currentUserId);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError(null);
    setEditLoading(true);

    try {
      const { data } = await api.post(`blog/posts/${id}/edit/`, {
        title: editedTitle,
        content: editedContent,
      });
      setArticle(data);
      setIsEditing(false);
    } catch (err) {
      setEditError(
        err.response?.data?.detail ||
          "Impossible de modifier l'article."
      );
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[90%] lg:w-[70%] mx-auto justify-center lg:p-8 gap-8">
      {loading && <p className="text-center">Chargement de l&apos;article...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && article && (
        <article className="w-full border bg-secondary/5 border-secondary text-secondary rounded-lg py-8 px-8 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{article.title}</h1>
          <p className="text-sm opacity-80">
            Publie le {new Date(article.created_at).toLocaleDateString("fr-FR")}
          </p>
          <p className="text-sm opacity-80">Auteur: {article.author_name}</p>

          {canEdit && !isEditing && (
            <Button text="Modifier" type="button" onClick={() => setIsEditing(true)} />
          )}

          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-center placeholder-secondary border-b border-secondary focus:outline-none focus:ring-2 focus:ring-secondaryFlashy focus:border-transparent transition duration-200 py-1"
                required
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={10}
                className="placeholder-secondary border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryFlashy p-3"
                required
              />
              {editError && <p className="text-red-500 text-sm">{editError}</p>}
              <div className="flex gap-4">
                <Button
                  text={editLoading ? "Enregistrement..." : "Enregistrer"}
                  type="submit"
                  disabled={editLoading}
                />
                <Button
                  text="Annuler"
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTitle(article.title);
                    setEditedContent(article.content);
                    setEditError(null);
                  }}
                />
              </div>
            </form>
          ) : (
            <p className="text-base leading-relaxed whitespace-pre-line">
              {article.content}
            </p>
          )}
        </article>
      )}
      <Link to="/blog" className="text-secondaryFlashy font-semibold hover:underline">
        Retour au blog
      </Link>
    </div>
  );
}
