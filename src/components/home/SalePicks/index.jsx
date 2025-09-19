import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../shared/api";            
import ProductCard from "../../ProductCard";      
import s from "./style.module.css";

const isOnSale = (p) => {
  const price = Number(p.price);
  const d = p.discont_price ?? p.discount_price;
  const dn = d != null ? Number(d) : null;
  return Number.isFinite(price) && Number.isFinite(dn) && dn > 0 && dn < price;
};

export default function SalePicks() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    api.get("/products/all")
      .then(res => {
        if (!live) return;
        const all = Array.isArray(res.data) ? res.data : [];
        const sale = all.filter(isOnSale);
        for (let i = sale.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [sale[i], sale[j]] = [sale[j], sale[i]];
        }
        setItems(sale.slice(0, 4));
      })
      .finally(() => setLoading(false));
    return () => { live = false; };
  }, []);

  return (
    <section className={s.wrap} id="sale">
      <div className={s.head}>
        <h2 className={s.title}>Sale</h2>
        <div className={s.line}></div>
        <Link to="/sale" className={s.all}>All sales</Link>
      </div>

      

      {loading ? (
        <div className={s.list}>
          <div className={s.skeleton} /><div className={s.skeleton} />
          <div className={s.skeleton} /><div className={s.skeleton} />
        </div>
      ) : (
        <div className={s.list}>
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}
