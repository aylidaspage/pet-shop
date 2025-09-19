import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../shared/api";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import s from "./products.module.css";

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

export default function Products() {
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

  const visible = useMemo(() => {
    let list = [...items];

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
  }, [items, flt]);

  return (
    <section className={s.wrap}>
      <nav className={s.breadcrumbs}>
        <Link to="/" className={s.crumb}>Main page</Link>
        <div className={s.line}/>
        <span className={s.crumbActive}>All products</span>
      </nav>

      <h1 className={s.title}>All products</h1>

      <ProductFilter value={flt} onChange={setFlt} />

      {err && <p className={s.state}>Error: {err}</p>}
      {loading ? (
        <p className={s.state}>Loading…</p>
      ) : visible.length === 0 ? (
        <p className={s.state}>No products found.</p>
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
