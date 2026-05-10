import Image from "next/image";
import pfemisureName from "../../../../public/pfemisureName.svg"
import pfemisureLogo from "../../../../public/companyLogo.png"
import { Mail, MapPin, Phone } from "lucide-react";

const MobileFooter = () => {


    return (
        <div className="relative w-full bg-mainColour flex justify-center px-[13px] pt-4 pb-1
        
        pb-[70px]">



            <div className=" max-w-[400px] w-full ">


                {/* company logo left side top */}
                <div className="mb-[30px]">
                    <Image src={pfemisureName} alt="" />
                </div>




                {/* links right side */}
                <div className=" w-full flex flex-col items-end text-white font-semibold mb-[30px] text-xl">
                    <p className=" mb-[8px]">Privacy Policy</p>
                    <p className=" mb-[8px]">Shipping Policy</p>
                    <p className=" mb-[8px]">Return & Refund Policy</p>
                    <p className=" mb-[8px]">Careers</p>
                </div>






                {/* contact us details left side bottom */}
                <div className=" w-full flex flex-col mb-[30px]">


                    {/* address */}
                    <div className=" w-full flex text-white text-sm
                mb-[20px]
                ">
                        <MapPin className=" w-[20px] mr-[8px]" />

                        <p>15/535 BAGHAJATIN PALLY <br />
                            CHINSURAH, NEAR BAGHAJATIN MATH, <br />
                            HOOGHLY - 713103 <br />
                        </p>
                    </div>


                    {/* phone number */}
                    <div className="w-full flex text-white text-sm items-center">
                        <Phone className=" w-[15px] mr-[8px]" />
                        <p>+91 9046241205</p>
                    </div>



                    {/* email */}
                    <div className=" w-full flex text-white text-sm items-center">

                        <Mail className=" w-[15px] mr-[8px]" />
                        <p>femisurepvtltd@gmail.com</p>
                    </div>



                </div>






                {/* terms and conditions right side bottom */}
                <div className=" w-full flex justify-end text-white text-sm font-light">
                    <p>*Terms & Conditions</p>
                </div>



                {/* the pfemisure logo in the background */}
                <div className=" relative w-full flex justify-center">
                    <Image className=" absolute bottom-[30px]" src={pfemisureLogo} alt="" />
                </div>
            </div>

        </div>
    )
}


export default MobileFooter;