export default function Article({ article }) {
  const createdAt = article?.created_at
    ? new Date(article.created_at).toLocaleDateString("fr-FR")
    : null;

  return (
    <article className="w-full border bg-secondary/5 border-secondary text-secondary rounded-lg py-6 px-6 flex flex-col gap-3">
      <h2 className="text-2xl font-semibold">{article.title}</h2>
      <div className="text-sm opacity-80">
        {createdAt && <span>Publié le {createdAt}</span>}
      </div>
      <p className="text-base leading-relaxed whitespace-pre-line">
        {article.content}
      </p>
    </article>
  );
}
