"use client"

import { useEffect, useState } from "react";
import MobileFooter from "@/My-components/Mobile/mobileComponents/MobileFooter"
import ProductStructure from "@/My-components/Mobile/mobileComponents/ProductStructure"
import ProductSkeleton from "@/My-components/Mobile/mobileComponents/ProductSkeleton";
import getAllProducts from "@/actions/getAllProducts";

const Product3 = () => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const products = await getAllProducts();
                setProduct(products[2]); // Period Panty is index 2
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
                    <div className="w-full px-[10px] pt-8 flex justify-center "><ProductSkeleton /></div>
                ) : (
                    product && (
                        <ProductStructure
                            src={product.productImageUrl}
                            title={product.name}
                            badgeText={"pack of 5 pantie"}
                            text={product.productDetails}
                            price={product.price}
                            sizeChart={true}
                            sizeButtons={"small,medium,large,xl,xxl,xxxl"}
                            productId={product.id}
                        />
                    )
                )}








                <div>
                    <img className=" mb-[10px] rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct3PageImg/mobileProduct3Img1.png" alt="" />


                    <img className=" mb-[10px] rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct3PageImg/mobileProduct3Img2.png" alt="" />


                    <img className=" mb-[10px] rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct3PageImg/mobileProduct3Img3.png" alt="" />


                    <img className=" mb-[10px] rounded-md" src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/mobileProduct3PageImg/mobileProduct3Img4.png" alt="" />
                </div>




            </div>


            <MobileFooter/>
        </div>
    )
}


export default Product3