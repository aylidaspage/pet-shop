import Promo from "../components/home/Promo"
import CategoriesPreview from '../components/home/CategoriesPreview'
import DiscountForm from '../components/home/DiscountForm'
import SalePicks from '../components/home/SalePicks'

export default function Home() {
    console.log('Home MOUNTED')
    return(
        <div>
            <Promo/>
            <CategoriesPreview/>
            <DiscountForm/>
            <SalePicks/>
        </div>
    )
}