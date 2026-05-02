import { Heart } from "lucide-react"


const Wishlist = () => {


    return(
        <div className=" flex w-[200px] text-lg items-center">
            <Heart fill="#CF2DFF" stroke="none" className="mr-[5px]"/>
            <p>Add to wishlist</p>
        </div>
    )
}

export default Wishlist