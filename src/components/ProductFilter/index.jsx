import { useEffect, useMemo } from "react";
import s from "./style.module.css";


export default function ProductFilter({
  value = {},
  onChange = () => {},
  showDiscountToggle = true,
  defaultOnlyDiscount = false,
  labelPrefix = "",
}) {
  const v = useMemo(
    () => ({
      minPrice: value.minPrice ?? "",
      maxPrice: value.maxPrice ?? "",
      onlyDiscount: value.onlyDiscount ?? defaultOnlyDiscount,
      sort: value.sort ?? "default",
    }),
    [value, defaultOnlyDiscount]
  );

  useEffect(() => {
    if (value.onlyDiscount == null && defaultOnlyDiscount) {
      onChange({ ...v, onlyDiscount: true });
    }
  }, []);

  const set = (patch) => onChange({ ...v, ...patch });

  return (
    <div className={s.controls}>
      {/* Price */}
      <div className={s.group}>
        <span className={s.label}>{labelPrefix}Price</span>
        <div className={s.priceInputs}>
          <input
            type="number"
            placeholder="from"
            value={v.minPrice}
            onChange={(e) => set({ minPrice: e.target.value })}
          />
          <input
            type="number"
            placeholder="to"
            value={v.maxPrice}
            onChange={(e) => set({ maxPrice: e.target.value })}
          />
        </div>
      </div>

      {/* Discount */}
      {showDiscountToggle && (
        <label className={s.checkbox}>
          <span className={s.label} >{labelPrefix}Discounted items</span>
          <input
            type="checkbox"
            checked={!!v.onlyDiscount}
            onChange={(e) => set({ onlyDiscount: e.target.checked })}
          />
        </label>
      )}

      {/* Sort */}
      <div className={s.group}>
        <span className={s.label}>{labelPrefix}Sorted</span>
        <select
          className={s.select}
          value={v.sort}
          onChange={(e) => set({ sort: e.target.value })}
        >
          <option value="default">by default</option>
          <option value="asc">price ↑</option>
          <option value="desc">price ↓</option>
        </select>
      </div>
    </div>
  );
}
