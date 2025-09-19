// src/layouts/Header.jsx
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './header.module.css'

export default function Header() {
  // читаем товары корзины из Redux
  const cartItems = useSelector((state) => state.cart.items);
  // суммарное количество штук
  const cartItemCount = cartItems.reduce((totalUnitsSoFar, currentCartItem) => totalUnitsSoFar + currentCartItem.qty, 0);
    //Старт: totalUnitsSoFar = 0
    //Шаг 1: текущий {qty:2}
    //новое = 0 + 2 = 2 → теперь totalUnitsSoFar = 2
    //Шаг 2: текущий {qty:1}
    //новое = 2 + 1 = 3 → теперь totalUnitsSoFar = 3
    //Шаг 3: текущий {qty:3}
    //новое = 3 + 3 = 6 → теперь totalUnitsSoFar = 6

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" aria-label="Go to main page"><img src="/logo.svg" alt="PetShop" /></Link>

        <nav className={styles.nav}>
          <Link to="/">Main Page</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/products">All products</Link>
          <Link to="/sale">All sales</Link>
        </nav>

        <Link to="/cart" aria-label="Open cart" className={styles.cartLink}>
            <img src="/basket.svg" alt="" className={styles.cartIcon} />
           {cartItemCount > 0 ? <span className={styles.cartBadge}>{cartItemCount}</span> : null}
        </Link>
      </div>
    </header>
  );
}
