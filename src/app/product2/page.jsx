"use client"

import { useEffect, useState } from "react";
import Heading from "@/My-components/commonComponents/Heading"
import Paragraph from "@/My-components/commonComponents/Paragraph"
import PurpleBadges from "@/My-components/commonComponents/PurpleBadges"
import MobileFooter from "@/My-components/Mobile/mobileComponents/MobileFooter"
import ProductStructure from "@/My-components/Mobile/mobileComponents/ProductStructure"
import ProductSkeleton from "@/My-components/Mobile/mobileComponents/ProductSkeleton";
import getAllProducts from "@/actions/getAllProducts";

const Product2 = () => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const products = await getAllProducts();
                setProduct(products[2]); // Graphene Pad is index 1
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, []);
    return (
        <div>
            <div className=" bg-white w-full flex flex-col items-center
        px-[10px]">






                {isLoading ? (
                    <div className="w-full px-[10px] pt-8 flex justify-center"><ProductSkeleton /></div>
                ) : (
                    product && (
                        <ProductStructure
                            src={product.productImageUrl}
                            title={product.name}
                            badgeText={"pack of 15 pads"}
                            text={product.productDetails}
                            sizePricing={product.sizePricing}
                            sizeButtons={"large,xl,xxl,xxxl"}
                            productId={product.id}
                        />
                    )
                )}






                <div className=" max-w-[400px]">
                    {/* Where Innovation Meets Everyday Comfort */}
                    <div className=" mb-[60px]">


                        <img className="mb-[30px] rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct2PageImg/mobileProduct2Img1.png" alt="" />


                        <Heading>Where Innovation Meets Everyday Comfort</Heading>

                        <Paragraph>A thoughtfully engineered multi-layer design that works together to absorb quickly, lock moisture, and stay breathable—enhanced with graphene and AN-ION technology for a fresher, more comfortable experience.</Paragraph>

                        <ul className=" list-disc px-[15px] mb-[30px] text-sm">
                            <li>Breathable top layer for soft, irritation-free feel</li>
                            <li>High-absorbency core for reliable protection</li>
                            <li>Graphene + AN-ION layer to help maintain freshness</li>
                            <li>Secure multi-layer structure to prevent leaks</li>
                        </ul>



                        <div className="w-full flex flex-col items-start">
                            <PurpleBadges>Graphene Enhanced</PurpleBadges>
                            <PurpleBadges>Ultra Absorbent</PurpleBadges>
                            <PurpleBadges>Breathable Layers</PurpleBadges>
                        </div>
                    </div>




                    {/* Designed for Everyday Ease */}
                    <div className=" mb-[60px]">


                        {/* image */}
                        <img className=" mb-[30px] rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct2PageImg/mobileProduct2Img2.png" alt="" />



                        <Heading>Designed for Everyday Ease</Heading>
                        <Paragraph>From compact packaging to full-size protection, every detail is made to keep things simple, clean, and comfortable.</Paragraph>


                        <div className=" w-full flex justify-end">
                            <PurpleBadges>Waterproof</PurpleBadges>
                        </div>
                    </div>





                    {/* all images one after the other */}
                    <div>

                        <img className="mb-[10px] rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct2PageImg/mobileProduct2Img3.png" alt="" />


                        <img className="mb-[10px] rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct2PageImg/mobileProduct2Img4.png" alt="" />


                        <img className="mb-[10px] rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct2PageImg/mobileProduct2Img5.png" alt="" />






                    </div>
                </div>



            </div>


            <MobileFooter />
        </div>
    )
}


export default Product2