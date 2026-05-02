import { Heart } from "lucide-react"


const Wishlist = () => {


    return(
        <div className=" flex min-w-[150px] items-center
        text-sm xs:text-lg mr-[10px] xs:mr-[20px]
        ">
            <Heart fill="#CF2DFF" stroke="none" className="mr-[5px]"/>
            <p>Add to wishlist</p>
        </div>
    )
}

export default Wishlist