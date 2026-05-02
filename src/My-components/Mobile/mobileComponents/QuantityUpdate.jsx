"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import Button from "./Button"

const QuantityUpdate = ({ quantityState, setQuantityState }) => {


    return (
        <div className=" flex items-center w-[120px] justify-between">
            
            <Button type={"rounded"} value={<MinusIcon className=""/>}/>

            <p className=" text-2xl">0</p>

            
            <Button type={"rounded"} value={<PlusIcon className=""/>}/>
        </div>
        )

}


export default QuantityUpdate