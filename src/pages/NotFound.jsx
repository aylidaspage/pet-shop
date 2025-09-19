import { Link } from "react-router-dom";
import s from "./notfound.module.css";
import pets404 from "../../public/not_found.svg"; 

export default function NotFound() {
  return (
    <div className={s.wrapper}>
      <div className={s.code}>
        <span className={s.digit}>4</span>
        <img className={s.pets} src={pets404} alt="Kitten and puppy" />
        <span className={s.digit}>4</span>
      </div>

      <h1 className={s.title}>Page Not Found</h1>
      <p className={s.desc}>
        We’re sorry, the page you requested could not be found.
        Please go back to the homepage.
      </p>

      <Link to="/" className={s.btn}>Go Home</Link>
    </div>
  );
}
