import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    api
      .get(`blog/posts/${id}/`)
      .then((res) => {
        if (isMounted) {
          setArticle(res.data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Article introuvable.");
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
          <p className="text-base leading-relaxed whitespace-pre-line">
            {article.content}
          </p>
        </article>
      )}
      <Link to="/blog" className="text-secondaryFlashy font-semibold hover:underline">
        Retour au blog
      </Link>
    </div>
  );
}
