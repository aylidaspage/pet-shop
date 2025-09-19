import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../shared/api";
import CategoriesGrid from "../../CategoriesGrid";
import style from "./style.module.css";

export default function CategoriesPreview() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/categories/all")
      .then(res => setCategories(res.data))
      .catch(err => setError("Failed to load categories"));
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!categories.length) return <p>Loading...</p>;

  return (
    <section className={style.wrap}>
      <div className={style.head}>
        <h2 className={style.title}>Categories</h2>
        <div className={style.right}>
          <div className={style.line}></div>
          <Link to="/categories" className={style.all}>All categories</Link>
        </div>
      </div>
      <CategoriesGrid categories={categories} limit={4} />
    </section>
  );
}
