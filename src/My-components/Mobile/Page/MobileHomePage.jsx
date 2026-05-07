import { CircleArrowDown } from 'lucide-react';
import Image from 'next/image';
import ProductStructure from '../mobileComponents/ProductStructure';
import Heading from '@/My-components/commonComponents/Heading';
import Paragraph from '@/My-components/commonComponents/Paragraph';
import MobileFooter from '../mobileComponents/MobileFooter';


const MobileHomePage = () => {



    return (
        <div>
            <div className=' w-full flex flex-col bg-white'>







                {/* hero section  */}
                <div className="w-full h-[100svh] bg-gradient-to-b from-[#FFCCFC] from-[45%] to-white
                
                px-[10px]
                ">



                    <div className="w-full h-full flex flex-col
                    items-center justify-around">


                        <div className=" w-full flex flex-col 
                        items-center">
                            {/* you know your body best */}
                            <div className=" text-[42px]  font-playfair text-black font-semibold flex flex-col items-center
                         leading-[38px]
                         mb-[20px]
                        ">
                                <h1>You <span className=" italic">know</span> your</h1>
                                <h1>body best.</h1>
                            </div>





                            {/* if something feels off its worth checking... */}
                            <div className=" text-black text-lg
                        w-[300px] mb-[20px]">


                                <p className=" font-inter font-light
                         text-center
                         tracking-tighter
                         leading-[18px]
                         ">If something feels off,it is worth checking. Early action means better answers   and better health.</p>
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

















                {/* product 1 */}
                <div className='w-full px-[10px] flex flex-col items-center'>


                    {/* product 1 */}
                    <ProductStructure
                        src={"https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageProductGreenIon.jpg"}
                        title={"Green AN-ION Pad"}
                        badgeText={"pack of 15 pads"}
                        text={"Green Anion Technology: Embedded strip neutralizes odor, inhibits bacteria, and balances pH for lasting freshness through out all day and night.Discreet Trifold Wrapper, Neatly folded and individually wrapped for pocket-sized portability and hygienic disposal."}
                        price={"329.0"}
                        sizeButtons={"large,xl,xxl,xxxl"}


                    />




                    {/* product 2 */}
                    <ProductStructure
                        src={"https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageProductGraphene.jpg"}
                        title={"Graphene AN-ION Pad"}
                        badgeText={"pack of 15 pads"}
                        text={"Graphene–AN-ION Core cools and helps maintain freshness while supporting odor control. 4-Wing Security ensures a secure fit with minimal shifting and reliable leak protection. Trifold Design keeps it compact, pocket-sized, and discreet for easy carry. Ultra-Absorbent Layers are breathable and quickly absorb and lock away moisture for all-day comfort."}
                        price={"379.0"}
                        sizeButtons={"large,xl,xxl,xxxl"}
                    />



                    {/* product 3 */}
                    <ProductStructure
                        src={"https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageProductPeriodPanty.jpg"}
                        title={"AN-ION Period Panty"}
                        badgeText={"pack of 5 pantie"}
                        text={"Anion Period Panty is designed to feel just like your regular underwear but packs a super-absorbent, stain-proof core. Plus, our advanced anion technology stops odors in their tracks, so you stay fresh and cool"}
                        price={"229.0"}
                        sizeChart={true}
                        sizeButtons={"small,medium,large,xl,xxl,xxxl"}
                    />
                </div>










                {/* why women are choosing femisure */}
                <div className=' 
                px-[10px]
                '>

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





                {/* the contact us footer */}
                <div>

                    <MobileFooter/>
                </div>



            </div>
        </div>
    )
}

export default MobileHomePage