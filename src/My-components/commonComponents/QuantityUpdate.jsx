"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import Button from "./Button"

const QuantityUpdate = ({ quantityState, setQuantityState }) => {


    const increaseQuantity = () => {
        setQuantityState((val) => ++val)
    }


    const decreateQuantity = () => {

        if(quantityState > 1){
            setQuantityState((val) => --val)
        }
    }



    return (
        <div className=" flex items-center w-[120px] justify-between">
            
            <Button
            functionCall={decreateQuantity}
            type={"rounded"} value={<MinusIcon className=""/>}/>

            <p className=" text-2xl">{quantityState}</p>

            
            <Button
            functionCall={increaseQuantity}
            type={"rounded"} value={<PlusIcon className=""/>}/>
        </div>
        )

}


export default QuantityUpdate