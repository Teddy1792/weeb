import { useEffect, useState } from "react";
import Article from "../components/Article";

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch("http://127.0.0.1:8000/api/blog/posts/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Impossible de charger les articles.");
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted) {
          return;
        }
        const list = Array.isArray(data) ? data : data.results || [];
        setArticles(list);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
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
  }, []);

  return (
    <div className="flex flex-col w-[90%] lg:w-[70%] mx-auto justify-center lg:p-8 gap-8">
      <h1 className="text-4xl lg:text-3xl font-bold text-center">Blog</h1>
      {loading && (
        <p className="text-center mb-8 text-xl lg:text-normal">
          Chargement des articles...
        </p>
      )}

      {error && (
        <p className="text-center mb-8 text-xl lg:text-normal text-red-500">
          {error}
        </p>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="border w-[300px] lg:w-[500px] mx-auto bg-secondary/5 border-secondary text-secondary rounded-lg py-16 px-8 mb-10 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">Aucun article</h2>
          <p className="text-center text-lg">
            Aucun article n&apos;a encore ete publie.
          </p>
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="w-full flex flex-col gap-6 pb-10">
          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
