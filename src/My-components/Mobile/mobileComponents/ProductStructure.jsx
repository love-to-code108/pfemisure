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

const ProductStructure = ({ src, title, badgeText, text, sizePricing, productId, sizeButtons, sizeChart = false }) => {
    const router = useRouter();
    const [size, setSize] = useState();
    const [quantity, setQuanity] = useState(1);
    
    const addToCart = useCartStore((state) => state.addToCart);
    const setBuyNowItem = useCartStore((state) => state.setBuyNowItem);
    const setCheckoutMode = useCartStore((state) => state.setCheckoutMode);

    const sizeOrder = { "small": 1, "medium": 2, "large": 3, "xl": 4, "xxl": 5, "xxxl": 6 };
    const dynamicSizeButtons = sizePricing 
        ? Object.keys(sizePricing)
            .sort((a, b) => (sizeOrder[a.toLowerCase()] || 99) - (sizeOrder[b.toLowerCase()] || 99))
            .join(",") 
        : sizeButtons;

    const activePricing = sizePricing && size ? sizePricing[size] : null;
    
    // --- NEW: OOS Check ---
    const isOutOfStock = activePricing && activePricing.inStock === false;

    const handleAddToCart = () => {
        if (!size || !activePricing) {
            toast.error("Please select a size first!");
            return;
        }
        if (isOutOfStock) {
            toast.error("Sorry, this size is currently out of stock.");
            return;
        }

        const productToAdd = {
            productId,
            productName: title,
            size: size,
            quantity: quantity,
            productImageUrl: src,
            price: activePricing.sellingPrice, 
        };

        addToCart(productToAdd);
        toast.success(`Added ${quantity} ${size} to cart`);
    };

    const handleBuyNow = () => {
        if (!size || !activePricing) {
            toast.error("Please select a size first!");
            return;
        }
        if (isOutOfStock) {
            toast.error("Sorry, this size is currently out of stock.");
            return;
        }

        const productToBuy = {
            productId,
            productName: title,
            size: size,
            quantity: quantity,
            productImageUrl: src,
            price: activePricing.sellingPrice,
        };

        setBuyNowItem(productToBuy);
        setCheckoutMode("buynow");
        router.push('/checkout');
    };

    return (
        <div className="flex flex-col items-center xs:max-w-[360px] mb-[80px] mt-[10px]">
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

            {/* --- NEW: Dynamic Price Display with OOS Warning --- */}
            <div className="w-full mb-[20px] flex items-end gap-3 transition-all duration-300 min-h-[36px]">
                {activePricing ? (
                    isOutOfStock ? (
                        <h1 className="text-3xl font-bold text-red-500">Out of Stock</h1>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold text-[#CF2DFF]">
                                ₹{activePricing.sellingPrice}
                            </h1>
                            <h2 className="text-xl text-gray-400 line-through mb-[2px]">
                                ₹{activePricing.mrp}
                            </h2>
                        </>
                    )
                ) : (
                    <h1 className="text-2xl text-gray-400 italic">Select a size to view price</h1>
                )}
            </div>

            {/* product size */}
            <div className=" w-full mb-[10px]">
                <p className="text-lg mb-[10px]">Size</p>
                <SizeButtonGroup currentSize={size} setCurrentSize={setSize} sizeButtons={dynamicSizeButtons} />
            </div>

            {/* product quantity */}
            <div className=" w-full flex justify-start mb-[20px]">
                <QuantityUpdate quantityState={quantity} setQuantityState={setQuanity} />
            </div>

            {/* --- NEW: Disabled Buttons if OOS --- */}
            <div className="w-full flex justify-start mb-[30px]">
                <Button 
                    functionCall={handleAddToCart} 
                    size={"md"} 
                    className={`mr-[10px] transition-all ${isOutOfStock ? "!bg-gray-300 !border-gray-300 cursor-not-allowed opacity-70" : ""}`} 
                    type={"solid"} 
                    value={"Add to cart"} 
                />
                <Button 
                    functionCall={handleBuyNow} 
                    size={"md"} 
                    className={`transition-all ${isOutOfStock ? "!border-gray-300 !text-gray-400 cursor-not-allowed opacity-70" : ""}`} 
                    type={"outline-solid"} 
                    value={"Buy now"} 
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