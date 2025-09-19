import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  inc,
  dec,
  removeFromCart,
  clearCart,
} from "../store/cartSlice";
import s from "./cart.module.css";

const fmt$ = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number(n) || 0
  );

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [placed, setPlaced] = useState(false);

  const isEmpty = items.length === 0;

  const handleOrder = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) return;

    setPlaced(true);
  };

  const closeModal = () => {
    setPlaced(false);
    dispatch(clearCart()); // очищаем корзину после подтверждения
  };

  const list = useMemo(
    () =>
      items.map((it) => {
        const unit = Number(it.discount_price ?? it.price) || 0;
        return (
          <div key={it.id} className={s.row}>
            <div className={s.left}>
              <img
                className={s.thumb}
                src={`http://localhost:3333${it.image}`}
                alt={it.title}
              />
              <div className={s.titleWrap}>
                <h3 className={s.title}>{it.title}</h3>
              </div>
            </div>

            <div className={s.middle}>
              <div className={s.qty}>
                <button onClick={() => dispatch(dec(it.id))}>−</button>
                <span>{it.qty}</span>
                <button onClick={() => dispatch(inc(it.id))}>+</button>
              </div>
              <div className={s.priceNow}>{fmt$(unit * it.qty)}</div>
              {it.discount_price != null && (
                <div className={s.priceWas}>{fmt$(it.price)}</div>
              )}
            </div>

            <button
              className={s.remove}
              aria-label="Remove item"
              onClick={() => dispatch(removeFromCart(it.id))}
            >
              ×
            </button>
          </div>
        );
      }),
    [items, dispatch]
  );

  if (isEmpty)
    return (
      <div className={s.wrap}>
        <div className={s.headerRow}>
          <h1 className={s.h1}>Shopping cart</h1>
          <Link to="/products/all" className={s.backBtn}>
            Back to the store
          </Link>
        </div>

        <div className={s.emptyBox}>
          <p>Looks like you have no items in your basket currently.</p>
          <Link to="/products/all" className={s.cta}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );

  return (
    <div className={s.wrap}>
      <div className={s.headerRow}>
        <h1 className={s.h1}>Shopping cart</h1>
        <Link to="/products/all" className={s.backBtn}>
          Back to the store
        </Link>
      </div>

      <div className={s.grid}>
        <div className={s.list}>{list}</div>

        <div className={s.side}>
          <div className={s.card}>
            <h3 className={s.sideTitle}>Order details</h3>
            <div className={s.meta}>
              <div>{count} items</div>
              <div className={s.totalLabel}>Total</div>
              <div className={s.totalValue}>{fmt$(total)}</div>
            </div>

            <form className={s.form} onSubmit={handleOrder}>
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <button className={s.orderBtn} type="submit">
                Order
              </button>
            </form>
          </div>
        </div>
      </div>

      {placed && (
        <div className={s.modalBackdrop} onClick={closeModal}>
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <button className={s.modalClose} onClick={closeModal}>
              ×
            </button>
            <h2>Congratulations!</h2>
            <p>Your order has been successfully placed on the website.</p>
            <p>A manager will contact you shortly to confirm your order.</p>
          </div>
        </div>
      )}
    </div>
  );
}
