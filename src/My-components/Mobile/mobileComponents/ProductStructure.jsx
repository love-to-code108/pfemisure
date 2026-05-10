"use client"

import Image from "next/image";
import MobileBadge from "./MobileBadge";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SizeButtonGroup from "./SizeButtonGroup";
import QuantityUpdate from "@/My-components/commonComponents/QuantityUpdate";
import Button from "@/My-components/commonComponents/Button";
import Wishlist from "@/My-components/commonComponents/Wishlist";
import SizeGuide from "@/My-components/commonComponents/SizeGuide";
import Paragraph from "@/My-components/commonComponents/Paragraph";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner"

const ProductStructure = ({ src, title, badgeText, text, price, productId, sizeButtons, sizeChart = false }) => {
    const router = useRouter();
    const [size, setSize] = useState()
    const [quantity, setQuanity] = useState(1)
    
    const addToCart = useCartStore((state) => state.addToCart);
    
    // Grab the new actions!
    const setBuyNowItem = useCartStore((state) => state.setBuyNowItem);
    const setCheckoutMode = useCartStore((state) => state.setCheckoutMode);

    const handleAddToCart = () => {
        if (!size) {
            toast.error("Please select a size first!");
            return;
        }

        const productToAdd = {
            productId,
            productName: title,
            size: size,
            quantity: quantity,
            productImageUrl: src,
            price,
        };

        addToCart(productToAdd);
        toast.success(`Added ${quantity} ${size} to cart`);
    };

    // NEW: The Dedicated Buy Now Handler
    const handleBuyNow = () => {
        if (!size) {
            toast.error("Please select a size first!");
            return;
        }

        const productToBuy = {
            productId,
            productName: title,
            size: size,
            quantity: quantity,
            productImageUrl: src,
            price,
        };

        // Save it to the isolated state, flip the switch, and send them to checkout!
        setBuyNowItem(productToBuy);
        setCheckoutMode("buynow");
        router.push('/checkout');
    };

    return (
        <div className="flex flex-col items-center xs:max-w-[360px] mb-[100px]">
            {/* product image */}
            <div className="w-full">
                <img src={src} alt="" />
            </div>

            {/* product title  */}
            <div className=" w-full flex flex-col items-start">
                <div className=" w-full flex justify-end my-[10px]">
                    <MobileBadge text={badgeText} />
                </div>
                <h1 className=" text-black font-poppins text-2xl mb-[10px]">{title}</h1>
            </div>

            {/* product paragraph */}
            <div className=" mb-[30px]">
                <Paragraph>{text}</Paragraph>
            </div>

            {/* product price */}
            <div className=" w-full mb-[20px]">
                <h1 className=" text-3xl text-mainColour">₹ {price}</h1>
            </div>

            {/* product size */}
            <div className=" w-full mb-[10px]">
                <p className="text-lg mb-[10px]">Size</p>
                <SizeButtonGroup currentSize={size} setCurrentSize={setSize} sizeButtons={sizeButtons} />
            </div>

            {/* product quantity */}
            <div className=" w-full flex justify-start mb-[20px]">
                <QuantityUpdate quantityState={quantity} setQuantityState={setQuanity} />
            </div>

            {/* add to cart & buy now */}
            <div className="w-full flex justify-start mb-[30px]">
                <Button
                    functionCall={handleAddToCart}
                    size={"md"} className={"mr-[10px]"} type={"solid"} 
                    value={"Add to cart"} 
                />
                
                {/* Wires up the new Buy Now button! */}
                <Button
                    functionCall={handleBuyNow}
                    size={"md"} type={"outline-solid"} value={"Buy now"} 
                />
            </div>

            {/* add to wishlist & size guide */}
            <div className=" w-full flex">
                {sizeChart && <SizeGuide />}
            </div>
        </div>
    )
}

export default ProductStructure;