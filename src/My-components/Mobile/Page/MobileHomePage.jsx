"use client"
import { CircleArrowDown } from 'lucide-react';
import ProductStructure from '../mobileComponents/ProductStructure';
import Heading from '@/My-components/commonComponents/Heading';
import Paragraph from '@/My-components/commonComponents/Paragraph';
import MobileFooter from '../mobileComponents/MobileFooter';
import getAllProducts from '@/actions/getAllProducts';
import { useEffect, useState } from 'react';

// --- NEW: The Skeleton Component ---
const ProductSkeleton = () => (
    <div className="flex flex-col items-center xs:max-w-[360px] w-full mb-[100px] animate-pulse">
        {/* Image Placeholder */}
        <div className="w-full aspect-square bg-gray-200 rounded-2xl mb-4"></div>

        {/* Badge Placeholder */}
        <div className="w-full flex justify-end mb-2">
            <div className="w-24 h-6 bg-purple-100 rounded-full"></div>
        </div>

        {/* Title Placeholder */}
        <div className="w-full flex justify-start mb-4">
            <div className="w-3/4 h-8 bg-gray-200 rounded-md"></div>
        </div>

        {/* Paragraph Placeholder */}
        <div className="w-full space-y-2 mb-6">
            <div className="w-full h-4 bg-gray-100 rounded-md"></div>
            <div className="w-5/6 h-4 bg-gray-100 rounded-md"></div>
            <div className="w-4/6 h-4 bg-gray-100 rounded-md"></div>
        </div>

        {/* Price Placeholder */}
        <div className="w-full mb-6">
            <div className="w-32 h-10 bg-purple-50 rounded-md"></div>
        </div>

        {/* Sizes Placeholder */}
        <div className="w-full space-y-2 mb-6">
            <div className="w-16 h-5 bg-gray-200 rounded-md"></div>
            <div className="flex gap-2">
                <div className="w-12 h-10 bg-gray-200 rounded-full"></div>
                <div className="w-12 h-10 bg-gray-200 rounded-full"></div>
                <div className="w-12 h-10 bg-gray-200 rounded-full"></div>
            </div>
        </div>

        {/* Quantity Placeholder */}
        <div className="w-full mb-6 flex justify-start">
            <div className="w-32 h-10 bg-gray-200 rounded-full"></div>
        </div>

        {/* Buttons Placeholder */}
        <div className="w-full flex gap-3">
            <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
            <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
        </div>
    </div>
);

const MobileHomePage = () => {
    const [productArray, setProductArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // --- NEW: Loading State ---

    useEffect(() => {
        const productDetails = async () => {
            try {
                const fetchedProducts = await getAllProducts();
                setProductArray(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false); // Stop loading regardless of success/fail
            }
        }
        productDetails();
    }, [])

    return (
        <div>
            <div className=' w-full flex flex-col bg-white'>

                {/* hero section  */}
                <div className="w-full h-[100svh] bg-gradient-to-b from-[#FFCCFC] from-[45%] to-white px-[10px]">
                    <div className="w-full h-full flex flex-col items-center justify-around">
                        <div className=" w-full flex flex-col items-center">
                            {/* you know your body best */}
                            <div className=" text-[42px] font-playfair text-black font-semibold flex flex-col items-center leading-[38px] mb-[20px]">
                                <h1>You <span className=" italic">know</span> your</h1>
                                <h1>body best.</h1>
                            </div>

                            {/* if something feels off its worth checking... */}
                            <div className=" text-black text-lg w-[300px] mb-[20px]">
                                <p className=" font-inter font-light text-center tracking-tighter leading-[18px]">
                                    If something feels off,it is worth checking. Early action means better answers and better health.
                                </p>
                            </div>

                            {/* take care of yourself */}
                            <div className=" text-xl font-playwrite text-black">
                                <h1>Take care of yourself</h1>
                            </div>
                        </div>

                        {/* you are not alone in this + arrow */}
                        <div className=' flex flex-col items-center'>
                            {/* you are not alone in this */}
                            <div className=' mb-[30px]'>
                                <p className=" font-reddit text-black">You are not alone in this</p>
                            </div>
                            {/* the arrow */}
                            <div><CircleArrowDown color='#D27FFF' /></div>
                        </div>
                    </div>
                </div>

                {/* --- PRODUCT SECTION --- */}
                <div className='w-full px-[10px] flex flex-col items-center'>
                    {isLoading ? (
                        /* Show 3 Skeletons while fetching */
                        <>
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                        </>
                    ) : (
                        /* Show Actual Products once loaded */
                        <>
                            {/* product 1 */}
                            {productArray?.[0] && (
                                <ProductStructure
                                    src={productArray[0].productImageUrl}
                                    title={productArray[0].name}
                                    badgeText={"pack of 15 pads"}
                                    text={productArray[0].productDetails}
                                    sizePricing={productArray[0].sizePricing}
                                    sizeButtons={"large,xl,xxl,xxxl"}
                                    productId={productArray[0].id}
                                />
                            )}

                            {/* product 2 */}
                            {productArray?.[1] && (
                                <ProductStructure
                                    src={productArray[1].productImageUrl}
                                    title={productArray[1].name}
                                    badgeText={"pack of 15 pads"}
                                    text={productArray[1].productDetails}
                                    sizePricing={productArray[1].sizePricing}
                                    sizeButtons={"large,xl,xxl,xxxl"}
                                    productId={productArray[1].id}
                                />
                            )}

                            {/* product 3 */}
                            {productArray?.[2] && (
                                <ProductStructure
                                    src={productArray[2].productImageUrl}
                                    title={productArray[2].name}
                                    badgeText={"pack of 5 pantie"}
                                    text={productArray[2].productDetails}
                                    sizePricing={productArray[2].sizePricing}
                                    sizeChart={true}
                                    sizeButtons={"small,medium,large,xl,xxl,xxxl"}
                                    productId={productArray[2].id}
                                />
                            )}
                        </>
                    )}
                </div>

                {/* why women are choosing femisure */}
                <div className=' px-[10px]
                
                w-full flex justify-center'>



                    <div className=' w-full max-w-[400px]'>


                        <div className=' mb-[100px]'>
                            <Heading>Why Women Are Choosing Femisure ?</Heading>
                            <Paragraph className={"mb-[60px]"}>We didn’t just make a better pad—we re-engineered the entire period experience with comfort, care, and innovation at its core.</Paragraph>
                            <Heading>Advanced AN-ION Technology</Heading>
                            <Paragraph>Designed to help maintain freshness and reduce odor naturally—without relying on harsh chemicals.</Paragraph>
                            <img className='rounded-md mb-[20px]' src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageImg1.jpg" alt="" />
                        </div>

                        <div className=' mb-[100px]'>
                            <Heading>Breathable, Rash-Free Comfort</Heading>
                            <Paragraph>Soft, skin-friendly layers allow airflow and keep you dry—so comfort never becomes a compromise.</Paragraph>
                            <img className=' rounded-md mb-[20px]' src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageImg2.jpg" alt="" />
                        </div>

                        {/* 360 leak protection */}
                        <div className=' mb-[100px]'>
                            <Heading>360° Leak Protection</Heading>
                            <Paragraph>From daily use to heavy flow nights, our design ensures reliable protection that moves with you.</Paragraph>
                            <img className=' rounded-md mb-[20px]' src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageImg3.jpg" alt="" />
                        </div>

                        {/* engineered for real comfort */}
                        <div className=' mb-[100px]'>
                            <Heading>Engineered for Real Comfort</Heading>
                            <Paragraph>Most pads trap heat and moisture. Femisure uses a multi-layer breathable design that absorbs efficiently while staying light, thin, and comfortable throughout your day.</Paragraph>
                            <img className=' rounded-md' src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageImg4.jpg" alt="" />
                        </div>

                        {/* what we leave out matters */}
                        <div className=' mb-[100px]'>
                            <Heading>What We Leave Out Matters</Heading>
                            <ul>
                                <li>No Artificial Fragrance</li>
                                <li>No Chlorine Bleaching</li>
                                <li>No Harsh Chemical</li>
                                <li>No Plastic Top Layers</li>
                            </ul>
                        </div>

                        {/* more than protection a better experience */}
                        <div className=' mb-[100px]'>
                            <Heading>More Than Protection. A Better Experience.</Heading>
                            <Paragraph>We believe comfort is not a luxury—it’s a standard. Every product is designed with care, empathy, and a deep understanding of what you go through, so your days never have to pause.</Paragraph>
                            <img className=' rounded-md mb-[20px]' src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageImg5.jpg" alt="" />
                            <img className=' rounded-md mb-[20px]' src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageImg6.jpg" alt="" />
                        </div>
                    </div>
                </div>

                {/* the contact us footer */}
                <div>
                    <MobileFooter />
                </div>
            </div>
        </div>
    )
}

export default MobileHomePage