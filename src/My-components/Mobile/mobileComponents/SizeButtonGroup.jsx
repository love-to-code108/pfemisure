"use client"
import Button from "@/My-components/commonComponents/Button";
import { useEffect } from "react";

const SizeButtonGroup = ({ currentSize, setCurrentSize, sizeButtons }) => {
    if (!sizeButtons) return null;

    // 1. Create a clean array of lowercase sizes directly from your props
    const availableSizes = sizeButtons.split(",").map(item => item.toLowerCase().trim());

    // 2. Auto-select the first size on initial load
    useEffect(() => {
        if (availableSizes.length > 0 && !currentSize) {
            setCurrentSize(availableSizes[0]);
        }
    }, [availableSizes, currentSize, setCurrentSize]);

    // 3. Helper to make the button text look pretty (e.g., "xl" -> "XL", "large" -> "Large")
    const formatDisplayValue = (size) => {
        if (size.includes("x")) return size.toUpperCase();
        return size.charAt(0).toUpperCase() + size.slice(1);
    };

    return (
        <div className="flex flex-wrap justify-start">
            {availableSizes.map((sizeOption) => (
                <Button
                    key={sizeOption}
                    // INTERCEPT: Force the button to pass the strictly lowercase string!
                    functionCall={() => setCurrentSize(sizeOption)}
                    className="mr-[8px] mb-[10px]"
                    // DYNAMIC UI: If this option matches the current state, make it solid!
                    type={currentSize === sizeOption ? "outline-solid" : "outline"}
                    value={formatDisplayValue(sizeOption)} 
                />
            ))}
        </div>
    );
}

export default SizeButtonGroup;