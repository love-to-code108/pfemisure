"use client"

const Button = ({ type,size, value, functionCall,className }) => {


    // outline type button
    if(type === "outline"){
        return(<button className={` text-black text-lg border-[2px] border-buttonGrey rounded-md
            px-[10px] py-[2px]
            
            ${size === "md" && "px-[20px] py-[5px]"}
            ${className}`}>
                {value}
            </button>)
    }



    // outline type button
    else if(type === "outline-solid"){
        return(<button className={` text-black text-lg border-[2px] border-mainColour2 rounded-md
            px-[10px] py-[2px]
            
            ${size === "md" && "px-[20px] py-[5px]"}
            ${className}`}>
                {value}
            </button>)
    }




    else if(type === "rounded"){
        return(
            <button className={` rounded-full border-[2px] border-buttonGrey px-1 py-1
            
            ${size === "md" && "px-[20px] py-[5px]"}
            ${className}`}>
                {value}
            </button>
        )
    }


    else if(type === "solid"){
        return(<button className={` text-white text-lg rounded-md
            px-[10px] py-[2px] bg-mainColour2
            
            ${size === "md" && "px-[20px] py-[5px]"}
            ${className}`}>
                {value}
            </button>)
    }


    return (

        


            <button className="">{value}</button>
    )
}

export default Button