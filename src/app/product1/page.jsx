import Heading from "@/My-components/commonComponents/Heading";
import Paragraph from "@/My-components/commonComponents/Paragraph";
import PurpleBadges from "@/My-components/commonComponents/PurpleBadges";
import MobileFooter from "@/My-components/Mobile/mobileComponents/MobileFooter";
import ProductStructure from "@/My-components/Mobile/mobileComponents/ProductStructure";


const Product1 = () => {


    return (
        <div>
            <div className=" bg-white w-full flex flex-col items-center
        px-[10px]
        ">


                {/*  product Green An-Ion Pad */}
                <ProductStructure
                    src={"https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageProductGreenIon.jpg"}
                    title={"Green AN-ION Pad"}
                    badgeText={"pack of 15 pads"}
                    text={"Green Anion Technology: Embedded strip neutralizes odor, inhibits bacteria, and balances pH for lasting freshness through out all day and night.Discreet Trifold Wrapper, Neatly folded and individually wrapped for pocket-sized portability and hygienic disposal."}
                    price={"329.0"}
                    sizeButtons={"large,xl,xxl,xxxl"}


                />









                {/* the other details below */}




                {/* Engineered for Everyday Comfort */}
                <div className=" mb-[60px]">

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
            <MobileFooter />
        </div>
    )
}

export default Product1;