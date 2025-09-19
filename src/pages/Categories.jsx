import { useEffect, useState } from "react";
import api from "../shared/api";
import CategoriesGrid from "../components/CategoriesGrid";
import s from "./categories.module.css";
import { Link } from "react-router-dom";  

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;
    api
      .get("/categories/all")
      .then((res) => {
        if (!alive) return;
        setCategories(res.data || []);
      })
      .catch(() => alive && setErr("Failed to load categories"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className={s.wrap}>
        <div className={s.breadcrumbs}>
            <Link to="/" className={s.crumb}>Main page</Link>
            <div className={s.line} />
            <span className={s.crumbActive}>Categories</span>
        </div>

      <div className={s.head}>
        <h2 className={s.title}>Categories</h2>
      </div>

      {err && <div className={s.error}>{err}</div>}

      {loading ? (
        <div className={s.gridSkeleton}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={s.skeleton} />
          ))}
        </div>
      ) : (
        <CategoriesGrid categories={categories} />
      )}
    </section>
  );
}
