import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import api from "../shared/api";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import s from "./category.module.css";

const getDiscount = (p) => {
  const d = p?.discount_price ?? p?.discont_price;
  const n = d != null ? Number(d) : NaN;
  return Number.isFinite(n) ? n : null;
};
const getEffPrice = (p) => {
  const base = Number(p?.price);
  const disc = getDiscount(p);
  if (Number.isFinite(base) && disc != null && disc > 0 && disc < base) return disc;
  return base;
};
const getProductCategoryId = (p) =>
  Number(p?.categoryId ?? p?.category_id ?? p?.category?.id ?? p?.category);


export default function Category() {
  const { id } = useParams();                 // /categories/:id
  const [search] = useSearchParams();         // ?title=...
  const catId = Number(id);

  const [items, setItems]   = useState([]);
  const [loading, setLoad]  = useState(true);
  const [err, setErr]       = useState(null);

  const [flt, setFlt] = useState({
    minPrice: "",
    maxPrice: "",
    onlyDiscount: false,
    sort: "default",
  });

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        setLoad(true);
        setErr(null);
        const res = await api.get("/products/all");
        live && setItems(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        live && setErr(e?.message || "Failed to fetch");
      } finally {
        live && setLoad(false);
      }
    })();
    return () => { live = false; };
  }, []);

  const byCategory = useMemo(
    () => items.filter((p) => getProductCategoryId(p) === catId),
    [items, catId]
  );

  const visible = useMemo(() => {
    let list = [...byCategory];

    if (flt.minPrice !== "" && !Number.isNaN(+flt.minPrice)) {
      list = list.filter((p) => getEffPrice(p) >= +flt.minPrice);
    }
    if (flt.maxPrice !== "" && !Number.isNaN(+flt.maxPrice)) {
      list = list.filter((p) => getEffPrice(p) <= +flt.maxPrice);
    }
    if (flt.onlyDiscount) {
      list = list.filter((p) => {
        const base = +p.price;
        const disc = getDiscount(p);
        return Number.isFinite(base) && disc != null && disc > 0 && disc < base;
      });
    }
    if (flt.sort === "asc")  list.sort((a, b) => getEffPrice(a) - getEffPrice(b));
    if (flt.sort === "desc") list.sort((a, b) => getEffPrice(b) - getEffPrice(a));

    return list;
  }, [byCategory, flt]);

  const pageTitle = (search.get("title") || `Category #${catId}`).trim();

  return (
    <section className={s.wrap}>
      <nav className={s.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/" className={s.crumb}>Main page</Link>
        <div className={s.line} />
        <Link to="/categories" className={s.crumb}>Categories</Link>
        <div className={s.line} />
        <span className={s.crumbActive}>{pageTitle}</span>
      </nav>

      <header className={s.head}>
        <h1 className={s.title}>{pageTitle}</h1>
      </header>

      <ProductFilter value={flt} onChange={setFlt} />

      {err && <p className={s.state}>Error: {err}</p>}
      {loading ? (
        <p className={s.state}>Loading…</p>
      ) : visible.length === 0 ? (
        <div className={s.empty}>
          <p>There are no products in this category.</p>
          <p className={s.hint}>Try to change filters.</p>
        </div>
      ) : (
        <div className={s.grid}>
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
