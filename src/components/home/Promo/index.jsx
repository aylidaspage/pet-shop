import { Link } from 'react-router-dom'
import style from './style.module.css'

export default function CategoriesPreview() {
    return (
    <section className={style.wrap}>
        <img src="./promo.jpg" alt="Promo banner" className={ style.bg }/>
        <div className={ style.overlay } />
        <div className={ style.content }> 
            <h1 className={style.title}>Amazing Discounts<br/>on Pets Products!</h1>
            <Link to="/sale" className={ style.btn }>Check out</Link>
        </div>

    </section>
    ) 
}
