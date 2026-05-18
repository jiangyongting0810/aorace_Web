import { Link, useParams } from "react-router-dom";
import { blogs } from "../data/content.js";

export function StoryDetailPage({ t, lang }) {
  const { slug } = useParams();
  const story = blogs.find((blog) => blog.slug === slug);

  if (!story) {
    return (
      <main className="detail-page">
        <h1>{t.notFound}</h1>
        <Link className="button dark" to="/">{t.backHome}</Link>
      </main>
    );
  }

  return (
    <main className="detail-page story-page">
      <article className="story-article">
        <Link className="detail-back" to="/">← {t.experienceTitle}</Link>
        <img src={story.image} alt={story.title} />
        <h1>{lang === "en" ? story.title : story.zh}</h1>
        <p>{story.body}</p>
      </article>
    </main>
  );
}
