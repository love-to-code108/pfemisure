"use client"

import { useEffect, useState } from "react";
import Heading from "@/My-components/commonComponents/Heading";
import Paragraph from "@/My-components/commonComponents/Paragraph";
import PurpleBadges from "@/My-components/commonComponents/PurpleBadges";
import MobileFooter from "@/My-components/Mobile/mobileComponents/MobileFooter";
import ProductStructure from "@/My-components/Mobile/mobileComponents/ProductStructure";
import ProductSkeleton from "@/My-components/Mobile/mobileComponents/ProductSkeleton";
import getAllProducts from "@/actions/getAllProducts";


const Product1 = () => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const products = await getAllProducts();
                setProduct(products[1]); // Green An-Ion is index 0
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
        px-[10px]
        ">


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









                {/* the other details below */}



                <div className=" max-w-[400px]">
                    {/* Engineered for Everyday Comfort */}
                    <div className=" mb-[60px] ">

                        {/* product 1 image 1 */}
                        <img className=" mb-[30px] rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct1PageImg/mobileProduct1Img1.png" alt="" />



                        <Heading>Engineered for Everyday Comfort</Heading>
                        <Paragraph>A multi-layer design that absorbs quickly, locks moisture, and stays breathable—so you feel dry, fresh, and protected all day.</Paragraph>

                        <div className=" flex flex-col items-start">
                            <PurpleBadges>Breathable</PurpleBadges>
                            <PurpleBadges>High Absorbency</PurpleBadges>
                            <PurpleBadges>Leak Protection</PurpleBadges>
                        </div>
                    </div>











                    {/* Compact When You Need It. Powerful When You Use It. */}
                    <div className=" mb-[60px]">

                        <img className=" mb-[30px] rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct1PageImg/mobileProduct1Img2.png" alt="" />


                        <Heading>Compact When You Need It. Powerful When You Use It.</Heading>
                        <Paragraph>A multi-layer design that absorbs quickly, locks moisture, and stays breathable—so you feel dry, fresh, and protected all day.</Paragraph>


                        <div className=" w-full flex justify-end">
                            <PurpleBadges>Waterproof</PurpleBadges>
                        </div>
                    </div>





                    <div className=" mb-[60px]">
                        <img className=" mb-[10px] rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct1PageImg/mobileProduct1Img3.png" alt="" />

                        <img className="  rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct1PageImg/mobileProduct1Img4.png" alt="" />
                    </div>

                </div>







            </div>
            <MobileFooter />
        </div>
    )
}

export default Product1;