import Image from "next/image";
import pfemisureName from "../../../../public/pfemisureName.svg"
import { Mail, MapPin, Phone } from "lucide-react";

const MobileFooter = () => {


    return (
        <div className="w-full bg-mainColour px-[13px] pt-4 pb-1">


            {/* company logo left side top */}
            <div className="mb-[30px]">
                <Image src={pfemisureName} alt="" />
            </div>




            {/* links right side */}
            <div className=" w-full flex flex-col items-end text-white font-semibold mb-[30px] text-lg">
                <p>Privacy Policy</p>
                <p>Shipping Policy</p>
                <p>Return & Refund Policy</p>
                <p>Careers</p>
            </div>






            {/* contact us details left side bottom */}
            <div className=" w-full flex flex-col mb-[30px]">


                {/* address */}
                <div className=" w-full flex text-white text-sm
                mb-[20px]
                ">
                    <MapPin className=" w-[20px] mr-[8px]"/>

                    <p>15/535 BAGHAJATIN PALLY <br />
                        CHINSURAH, NEAR BAGHAJATIN MATH, <br />
                        HOOGHLY - 713103 <br />
                        </p>
                </div>


                {/* phone number */}
                <div className="w-full flex text-white text-sm items-center">
                    <Phone className=" w-[15px] mr-[8px]"/>
                    <p>+91 9046241205</p>
                </div>



                {/* email */}
                <div className=" w-full flex text-white text-sm items-center">

                    <Mail className=" w-[15px] mr-[8px]"/>
                    <p>femisurepvtltd@gmail.com</p>
                </div>



            </div>






            {/* terms and conditions right side bottom */}
            <div className=" w-full flex justify-end text-white text-sm font-light">
                <p>*Terms & Conditions</p>
            </div>
        </div>
    )
}


export default MobileFooter;