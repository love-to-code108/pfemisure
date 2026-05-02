import { RulerDimensionLine } from "lucide-react";


const SizeGuide = () => {


    return(
        <div className=" flex items-center
        text-sm xs:text-lg min-w-[120px]
        ">
            <RulerDimensionLine className=" mr-[5px]"/>
            <p>Size Guide</p>
        </div>
    )
}


export default SizeGuide;