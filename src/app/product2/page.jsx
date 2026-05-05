import Heading from "@/My-components/commonComponents/Heading"
import Paragraph from "@/My-components/commonComponents/Paragraph"
import PurpleBadges from "@/My-components/commonComponents/PurpleBadges"
import ProductStructure from "@/My-components/Mobile/mobileComponents/ProductStructure"



const Product2 = () => {



    return (
        <div>
            <div className=" bg-white w-full flex flex-col justify-center
        px-[10px]">






                {/* product 2 */}
                <ProductStructure
                    src={"https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageProductGraphene.jpg"}
                    title={"Graphene AN-ION Pad"}
                    badgeText={"pack of 15 pads"}
                    text={"Graphene–AN-ION Core cools and helps maintain freshness while supporting odor control. 4-Wing Security ensures a secure fit with minimal shifting and reliable leak protection. Trifold Design keeps it compact, pocket-sized, and discreet for easy carry. Ultra-Absorbent Layers are breathable and quickly absorb and lock away moisture for all-day comfort."}
                    price={"379.0"}
                />







                {/* Where Innovation Meets Everyday Comfort */}
                <div>


                    <Heading>Where Innovation Meets Everyday Comfort</Heading>

                    <Paragraph>A thoughtfully engineered multi-layer design that works together to absorb quickly, lock moisture, and stay breathable—enhanced with graphene and AN-ION technology for a fresher, more comfortable experience.</Paragraph>

                    <ul className=" list-disc px-[15px] mb-[30px]">
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


            </div>
        </div>
    )
}


export default Product2