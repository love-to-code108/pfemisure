import { CircleArrowDown } from 'lucide-react';
import Image from 'next/image';
import ProductStructure from '../mobileComponents/ProductStructure';


const MobileHomePage = () => {



    return (
        <div>
            <div className=' w-full flex flex-col bg-white'>







                {/* hero section  */}
                <div className="w-full h-[100svh] bg-gradient-to-b from-[#FFCCFC] from-[87%] to-white
                
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

                    
                    />




                    {/* product 2 */}
                    <ProductStructure 
                    src={"https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageProductGraphene.jpg"}
                    title={"Graphene AN-ION Pad"}
                    badgeText={"pack of 15 pads"}
                    text={"Graphene–AN-ION Core cools and helps maintain freshness while supporting odor control. 4-Wing Security ensures a secure fit with minimal shifting and reliable leak protection. Trifold Design keeps it compact, pocket-sized, and discreet for easy carry. Ultra-Absorbent Layers are breathable and quickly absorb and lock away moisture for all-day comfort."}
                    price={"379.0"}
                    />



                    {/* product 3 */}
                    <ProductStructure 
                    src={"https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageProductPeriodPanty.jpg"}
                    title={"AN-ION Period Panty"}
                    badgeText={"pack of 5 pantie"}
                    text={"Anion Period Panty is designed to feel just like your regular underwear but packs a super-absorbent, stain-proof core. Plus, our advanced anion technology stops odors in their tracks, so you stay fresh and cool"}
                    price={"229.0"}
                    />
                </div>











                












                {/* why women are choosing femisure */}







            </div>
        </div>
    )
}

export default MobileHomePage