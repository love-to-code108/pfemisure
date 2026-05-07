
import Button from "@/My-components/commonComponents/Button";


const SizeButtonGroup = ({ currentSize, setCurrentSize, sizeButtons }) => {

    let arr;

    if (sizeButtons) {

        arr = sizeButtons
            .split(",")
            .map(item => item.toLowerCase());


        return (
            <div className=" flex flex-wrap justify-start">

                {
                    arr.includes("small") && <Button className={"mr-[8px] mb-[10px]"} type={"outline"} value={"Small"} />
                }



                {
                    arr.includes("medium") && <Button className={"mr-[8px] mb-[10px]"} type={"outline"} value={"Medium"} />
                }


                {
                    arr.includes("large") && <Button className={"mr-[8px] mb-[10px]"} type={"outline"} value={"Large"} />
                }


                {
                    arr.includes("xl") && <Button className={"mr-[8px] mb-[10px]"} type={"outline"} value={"XL"} />
                }


                {
                    arr.includes("xxl") && <Button className={"mr-[8px] mb-[10px]"} type={"outline"} value={"XXL"} />
                }


                {
                    arr.includes("xxxl") && <Button className={"mr-[8px] mb-[10px]"} type={"outline"} value={"XXXL"} />
                }





            </div>
        )

    }




}

export default SizeButtonGroup;