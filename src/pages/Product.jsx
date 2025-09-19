import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../shared/api";
import { addToCart } from "../store/cartSlice";

import Breadcrumbs from "../components/Breadcrumbs";
import common from "./products.module.css";
import s from "./product.module.css";

export default function Product() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const incomingTrail = location.state?.trail;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let { data } = await api.get(`/products/${id}`);
        if (!data || typeof data !== "object" || data.id == null) {
          const all = await api.get(`/products/all`).then(r => r.data);
          data = all.find(p => String(p.id) === String(id)) ?? null;
        }
        setProduct(data);
      } catch {
        try {
          const all = await api.get(`/products/all`).then(r => r.data);
          setProduct(all.find(p => String(p.id) === String(id)) ?? null);
        } catch {
          setProduct(null);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const view = useMemo(() => {
    if (!product) return null;
    const title = product.title ?? "Untitled";
    const price = Number(product.price) || 0;
    const discount_price =
      product.discount_price != null
        ? Number(product.discount_price)
        : (product.discont_price != null
            ? Number(product.discont_price)
            : null);
    const discountPercent =
      discount_price != null ? Math.round((1 - discount_price / price) * 100) : null;

    const base = api?.defaults?.baseURL || "http://localhost:3333";
    const path = String(product.image || "").replace(/^(?!\/)/, "/");
    const img = `${base}${path}`;

    return { title, price, discount_price, discountPercent, img, description: product.description ?? "" };
  }, [product]);

  const add = () => {
    if (!product) return;
    dispatch(addToCart({
      id: product.id,
      title: product.title ?? "Untitled",
      price: Number(product.price) || 0,
      discont_price:
        product.discont_price != null ? Number(product.discont_price) : null,
      image: product.image || "",
      qty
    }));
  };

  if (loading) return <div className={common.wrap}>Loading…</div>;
  if (!view)   return <div className={common.wrap}>Product not found</div>;
  const finalPrice = view.discount_price ?? view.price;

  return (
    <div className={common.wrap}>
      <Breadcrumbs end={view.title} />

      <div className={s.top}>
        <div className={s.mainImage}>
          <img src={view.img} alt={view.title} />
        </div>

        <div className={s.info}>
          <h1 className={s.productTitle}>{view.title}</h1>

          <div className={s.priceRow}>
            <span className={s.priceNow}>${finalPrice}</span>
            {view.discount_price != null && (
              <>
                <span className={s.priceWas}>${view.price}</span>
                <span className={s.badge}>-{view.discountPercent}%</span>
              </>
            )}
          </div>

          <div className={s.controls}>
            <div className={s.qty}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button className={s.add} onClick={add}>Add to cart</button>
          </div>

          <h3 className={s.h3}>Description</h3>
          <p className={s.desc}>{view.description}</p>
        </div>
      </div>
    </div>
  );
}
