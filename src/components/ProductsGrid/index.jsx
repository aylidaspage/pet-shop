import ProductCard from "../ProductCard";
import s from "./style.module.css";

export default function ProductsGrid({ products = [] }) {
  if (!products.length) {
    return <div className={s.empty}>Nothing found</div>;
  }

  return (
    <div className={s.grid}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
