import { Link } from "react-router-dom";
import style from "./style.module.css";

export default function CategoriesGrid({ categories, limit = null }) {
  const list = limit ? categories.slice(0, limit) : categories;

  return (
    <div className={style.grid}>
      {list.map((c) => (
        <Link
          key={c.id}
          to={`/categories/${c.id}?title=${encodeURIComponent(c.title ?? "")}`}
          className={style.card}
        >
          <div className={style.thumb}>
            <img
              src={`http://localhost:3333${c.image}`}
              alt={c.title}
              loading="lazy"
            />
          </div>
          <div className={style.name}>{c.title}</div>
        </Link>
      ))}
    </div>
  );
}
