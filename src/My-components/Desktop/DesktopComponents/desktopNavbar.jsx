import Link from "next/link"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ShoppingCart, User } from "lucide-react"



const DesktopNavbar = () => {



    return (
        <div className=" w-full h-[70px] shadow 
        px-[100px]

        flex items-center justify-between

        hidden lg:flex
        ">





            {/* the company logo */}
            <div className=" w-[60px] h-auto">
                <img src="/companyLogoOriginal.png" alt="" />
            </div>





            {/* the navbar links */}
            <div className=" w-[550px] flex justify-between">



                {/* HOME */}
                <Link href={"/home"}>
                    Home
                </Link>


                {/* ABOUT US */}
                <Link href={"/home"}>
                    About Us
                </Link>


                {/* WHY US */}
                <Link href={"/home"}>
                    Why Us
                </Link>



                {/* OUR PRODUCTS */}
                <HoverCard openDelay={0} closeDelay={100}>
                    <HoverCardTrigger className="hover:cursor-pointer">Our Products</HoverCardTrigger>
                    <HoverCardContent align="start">
                        <div className=" flex flex-col justify-start gap-[10px]">
                            <Link href={"/home"}>Green Anion Pad</Link>
                            <Link href={"/home"}>Graphene Pad</Link>
                            <Link href={"/home"}>Pantie</Link>
                        </div>
                    </HoverCardContent>
                </HoverCard>



                {/* ORDERS */}
                <Link href={"/home"}>
                    Orders
                </Link>



                {/* MY EARNINGS */}
                <Link href={"/home"}>
                    My Earnings
                </Link>




            </div>





            {/* icons at the right end extrieme */}
            <div className=" flex gap-[10px]">

                <User />
                <ShoppingCart />


            </div>




        </div>
    )
}


export default DesktopNavbar