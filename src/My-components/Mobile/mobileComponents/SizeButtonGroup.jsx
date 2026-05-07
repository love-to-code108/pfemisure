"use client"
import Button from "@/My-components/commonComponents/Button";
import { useEffect, useState } from "react";


const SizeButtonGroup = ({ currentSize, setCurrentSize, sizeButtons }) => {




    // small button state
    const [smallSizeButton, setSmallSizeButton] = useState("outline");

    // medium button state
    const [mediumSizeButton, setMediumSizeButton] = useState("outline");


    // large button state
    const [largeSizeButton, setlargeSizeButton] = useState("outline");


    // xl button state
    const [xlSizeButton, setXlSizeButton] = useState("outline");


    // xxl button state
    const [xxlSizeButton, setXxlSizeButton] = useState("outline");


    // xxxl button state
    const [xxxlSizeButton, setXxxlSizeButton] = useState("outline");






    const handleOnClick = (buttonData, changeType) => {

        setSmallSizeButton("outline");
        setMediumSizeButton("outline");
        setlargeSizeButton("outline");
        setXlSizeButton("outline");
        setXxlSizeButton("outline");
        setXxxlSizeButton("outline");



        changeType("outline-solid")
        setCurrentSize(buttonData);


    }




    let arr;

    arr = sizeButtons
        .split(",")
        .map(item => item.toLowerCase());



    useEffect(() => {


        if(arr[0] === "small"){
             setSmallSizeButton("outline-solid");
             setCurrentSize(arr[0]);
        }
        if(arr[0] === "medium"){
            setMediumSizeButton("outline-solid");
            setCurrentSize(arr[0]);
        } 
        if(arr[0] === "large"){
            setlargeSizeButton("outline-solid");
            setCurrentSize(arr[0]);
        } 
        if(arr[0] === "xl"){
            setXlSizeButton("outline-solid");
            setCurrentSize(arr[0]);
        } 
        if(arr[0] === "xxl"){
            setXxlSizeButton("outline-solid");
            setCurrentSize(arr[0]);
        } 
        if(arr[0] === "xxxl"){
            setXxxlSizeButton("outline-solid");
            setCurrentSize(arr[0]);
        } 

    },[])






    
    if (sizeButtons) {








        return (
            <div className=" flex flex-wrap justify-start">

                {
                    arr.includes("small") &&
                    <Button
                        functionCall={handleOnClick}
                        className={"mr-[8px] mb-[10px]"} type={smallSizeButton}
                        changeType={setSmallSizeButton}
                        value={"Small"} />
                }



                {
                    arr.includes("medium") &&
                    <Button
                        functionCall={handleOnClick}
                        changeType={setMediumSizeButton}
                        className={"mr-[8px] mb-[10px]"} type={mediumSizeButton} value={"Medium"} />
                }


                {
                    arr.includes("large") &&
                    <Button
                        functionCall={handleOnClick}
                        changeType={setlargeSizeButton}
                        className={"mr-[8px] mb-[10px]"} type={largeSizeButton} value={"Large"} />
                }


                {
                    arr.includes("xl") &&
                    <Button
                        functionCall={handleOnClick}
                        changeType={setXlSizeButton}
                        className={"mr-[8px] mb-[10px]"} type={xlSizeButton} value={"XL"} />
                }


                {
                    arr.includes("xxl") &&
                    <Button
                        functionCall={handleOnClick}
                        changeType={setXxlSizeButton}
                        className={"mr-[8px] mb-[10px]"} type={xxlSizeButton} value={"XXL"} />
                }


                {
                    arr.includes("xxxl") &&
                    <Button
                        functionCall={handleOnClick}
                        changeType={setXxxlSizeButton}
                        className={"mr-[8px] mb-[10px]"} type={xxxlSizeButton} value={"XXXL"} />
                }





            </div>
        )

    }




}

export default SizeButtonGroup;