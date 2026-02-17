import { Link } from "react-router-dom";

export default function Article({ article }) {
  const createdAt = article?.created_at
    ? new Date(article.created_at).toLocaleDateString("fr-FR")
    : null;
  const content = article?.content || "";

  return (
    <article className="w-full border bg-secondary/5 border-secondary text-secondary rounded-lg py-6 px-6 flex flex-col gap-3">
      <Link to={`/blog/${article.id}`} className="hover:underline">
        <h2 className="text-2xl font-semibold">{article.title}</h2>
      </Link>
      <div className="text-sm opacity-80">
        {createdAt && <span>Publié le {createdAt}</span>}
      </div>
      <p className="text-base leading-relaxed whitespace-pre-line">
        {content.slice(0, 220)}
        {content.length > 220 ? "..." : ""}
      </p>
      <Link
        to={`/blog/${article.id}`}
        className="text-secondaryFlashy font-semibold hover:underline"
      >
        Lire l&apos;article
      </Link>
    </article>
  );
}
