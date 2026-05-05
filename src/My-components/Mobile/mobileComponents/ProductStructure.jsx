"use client"

import Image from "next/image";
import MobileBadge from "./MobileBadge";
import { useState } from "react";
import SizeButtonGroup from "./SizeButtonGroup";
import QuantityUpdate from "@/My-components/commonComponents/QuantityUpdate";
import Button from "@/My-components/commonComponents/Button";
import Wishlist from "@/My-components/commonComponents/Wishlist";
import SizeGuide from "@/My-components/commonComponents/SizeGuide";
import Paragraph from "@/My-components/commonComponents/Paragraph";


const ProductStructure = ({ src, title, badgeText, text, price, productId }) => {



    const [size, setSize] = useState("medium")



    return (
        <div className="flex flex-col items-center xs:max-w-[360px]
        
        mb-[100px]
        ">


            {/* product image */}

            <div className="w-full">
                <img src={src} alt="" />
            </div>







            {/* product title  */}
            <div className=" w-full flex
            flex-col items-start
            ">

                {/* badge */}
                <div className=" w-full flex justify-end my-[10px]">
                    <MobileBadge text={badgeText} />
                </div>


                {/* title */}
                <h1 className=" text-black font-poppins
                text-2xl mb-[10px]">{title}</h1>

            </div>








            {/* product paragraph */}
            <div className=" mb-[30px]">
                {/* <p className=" text-black font-poppins
                text-md leading-[18px]">{text}</p> */}
                <Paragraph>{text}</Paragraph>
            </div>




            {/* product price */}
            <div className=" w-full mb-[20px]">
                <h1 className=" text-3xl text-mainColour
                ">₹ {price}</h1>
            </div>


            {/* product size */}
            <div className=" w-full mb-[10px]">

                <p className="text-lg mb-[10px]">Size</p>



                {/* size buttons container */}
                <SizeButtonGroup />
            </div>


            {/* product quantity */}
            <div className=" w-full flex justify-start mb-[20px]">
                <QuantityUpdate />
            </div>


            {/* add to cart & buy now */}
            <div className="w-full flex justify-start mb-[30px]">
                <Button size={"md"} className={"mr-[10px]"} type={"solid"} value={"Add to cart"}/>
                <Button size={"md"} type={"outline-solid"} value={"Buy now"}/>
                
            </div>


            {/* add to wishlist & size guide */}
            <div className=" w-full flex">
                <Wishlist/>
                <SizeGuide/>
            </div>



        </div>
    )
}


export default ProductStructure;