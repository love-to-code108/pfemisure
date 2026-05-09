import MobileFooter from "@/My-components/Mobile/mobileComponents/MobileFooter"
import ProductStructure from "@/My-components/Mobile/mobileComponents/ProductStructure"




const Product3 = () => {



    return (
        <div>
            <div className=" bg-white w-full flex flex-col items-center
        px-[10px]">



                {/* product 3 */}
                <ProductStructure
                    src={"https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/mobileHomePageProductPeriodPanty.jpg"}
                    title={"AN-ION Period Panty"}
                    badgeText={"pack of 5 pantie"}
                    text={"Anion Period Panty is designed to feel just like your regular underwear but packs a super-absorbent, stain-proof core. Plus, our advanced anion technology stops odors in their tracks, so you stay fresh and cool"}
                    price={"229.0"}
                    sizeButtons={"small,medium,large,xl,xxl,xxxl"}
                />








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