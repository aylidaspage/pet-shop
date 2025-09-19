import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./style.module.css";

export default function ProductCard({ product }) {
  const location = useLocation();
  const pathname = location.pathname || "";
  const search = location.search || "";
  const params = new URLSearchParams(search);
  let linkState = undefined;

  if (pathname.startsWith("/categories/")) {
    const parts = pathname.split("/");
    const catId = parts[2] || "";
    const categoryName = (params.get("title") || `Category #${catId}`).trim();
    linkState = {
      from: "category",
      categoryId: catId,
      categoryName,
      categoryTo: `/categories/${catId}${search}`,
    };
  } else if (pathname === "/sale") {
    linkState = { from: "sales" };
  } else if (pathname === "/products") {
    linkState = { from: "products" };
  }

  if (!product) return null;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);

  const isInCart = cartItems.some((i) => i.id === product.id);

  const [isHovered, setIsHovered] = useState(false);   // ховер по карточке (как было)
  const [hoverAdded, setHoverAdded] = useState(false);  // ховер по кнопке Added

  const imgUrl = (rel) => {
    if (!rel) return "";
    const base = import.meta?.env?.VITE_API_BASE || "http://localhost:3333";
    const path = String(rel).replace(/^(?!\/)/, "/");
    return `${base}${path}`;
  };

  const fmt$ = (n) => `$${Number(n).toFixed(0)}`;

  const priceOriginal = Number(product.price) || 0;
  const discountRaw = product.discount_price ?? product.discont_price;
  const priceDiscount = discountRaw != null ? Number(discountRaw) : null;
  const hasDiscount =
    priceDiscount != null && Number.isFinite(priceDiscount) && priceDiscount > 0 && priceDiscount < priceOriginal;

  const unitPrice = hasDiscount ? priceDiscount : priceOriginal;

  const add = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title ?? product.name ?? "Untitled",
        price: Number(product.price) || 0,
        discont_price:
          product.discont_price != null
            ? Number(product.discont_price)
            : null,
        image: product.image || "",
      })
    );
  };

  return (
    <Link
      to={`/products/${product.id}`}
      state={linkState}
      className={s.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverAdded(false);
      }}
    >
      <div className={s.thumb}>
        {product.image && (
          <img
            src={imgUrl(product.image)}
            alt={product.title ?? "Untitled"}
          />
        )}

        {hasDiscount && <div className={s.badge}>-{
          Math.round((1 - unitPrice / priceOriginal) * 100)
        }%</div>}

        <button
          className={s.add}
          onClick={(e) => {
            e.preventDefault();
            add();
          }}
          onMouseEnter={isInCart ? () => setHoverAdded(true) : undefined}
          onMouseLeave={isInCart ? () => setHoverAdded(false) : undefined}
          style={
            isInCart
              ? {
                  transform: "translateY(0)",
                  background: hoverAdded ? "#000" : undefined,
                  color: hoverAdded ? "#fff" : undefined,
                  border: hoverAdded ? "none" : undefined,
                  cursor: hoverAdded ? "pointer" : "default",
                }
              : undefined
          }
        >
          {isInCart ? (hoverAdded ? "Remove" : "Added") : "Add to cart"}
        </button>
      </div>

      <div className={s.info}>
        <h3 className={s.name}>{product.title ?? "Untitled"}</h3>

        <div className={s.priceRow}>
          <span className={s.priceNow}>{fmt$(unitPrice)}</span>
          {hasDiscount && (
            <span className={s.priceWas}>{fmt$(priceOriginal)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
