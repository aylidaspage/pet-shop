import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import common from "../../pages/products.module.css";


export default function Breadcrumbs({ end = "", trail: trailProp }) {
  const location = useLocation();
  const st = location.state || {};
  const qs = new URLSearchParams(location.search);

  let trail =
    Array.isArray(trailProp) && trailProp.length ? trailProp : null;
  if (!trail && Array.isArray(st.trail) && st.trail.length) {
    trail = st.trail;
  }

  if (!trail) {
    const from =
      st.from ||
      qs.get("from") ||
      "products";

    if (from === "sales") {
      trail = [{ name: "All sales", to: "/sale" }];
    } else if (from === "category") {
      const categoryName =
        st.categoryName ||
        qs.get("categoryName") ||
        "Category";
      const categoryTo =
        st.categoryTo ||
        qs.get("categoryTo") ||
        (st.categoryId != null
          ? `/categories/${st.categoryId}`
          : qs.get("categoryId")
          ? `/categories/${qs.get("categoryId")}`
          : "/categories");
      trail = [
        { name: "Categories", to: "/categories" },
        { name: categoryName, to: categoryTo },
      ];
    } else {
      trail = [{ name: "All products", to: "/products" }];
    }
  }

  return (
    <div className={common.breadcrumbs}>
      <Link to="/" className={common.crumb}>Main page</Link>

      {trail.map((step, i) => (
        <Fragment key={`${step.name}-${i}`}>
          <span className={common.line} />
          <Link to={step.to} className={common.crumb}>{step.name}</Link>
        </Fragment>
      ))}

      {end ? (
        <>
          <span className={common.line} />
          <span className={common.crumbActive}>{end}</span>
        </>
      ) : null}
    </div>
  );
}
