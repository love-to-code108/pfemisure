
import Button from "./Button";


const SizeButtonGroup = ({currentSize,setCurrentSize}) => {



    return(
        <div className=" flex flex-wrap justify-start">
            <Button className={"mr-[8px] mb-[10px]"} type={"outline"} value={"Small"}/>
            <Button className={"mr-[8px] mb-[10px]"} type={"outline"} value={"Medium"}/>
            <Button className={"mr-[8px] mb-[10px]"} type={"outline"} value={"Large"}/>
            <Button className={"mr-[8px] mb-[10px]"} type={"outline"} value={"XL"}/>
            <Button className={"mr-[8px] mb-[10px]"} type={"outline"} value={"XXL"}/>
            <Button className={"mr-[8px] mb-[10px]"} type={"outline"} value={"XXXL"}/>
        </div>
    )
}

export default SizeButtonGroup;