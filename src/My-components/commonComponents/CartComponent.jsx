"use client"

import { useCartStore } from "@/store/useCartStore";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartComponent({ item }) {
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    return (
        <div className="flex flex-col min-[400px]:flex-row gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-md min-[400px]:rounded-md transition-all">
            
            {/* 1. Product Image - Adapts from large banner to small square */}
            <div className="relative flex-shrink-0 w-full min-[400px]:w-24 h-48 min-[400px]:h-24 overflow-hidden bg-gray-50 rounded-md min-[400px]:rounded-md">
                <img
                    src={item.productImageUrl}
                    alt={item.productName || "Product image"}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* 2. Details & Controls */}
            <div className="flex flex-col flex-1 justify-between">
                
                {/* Top Row: Title, Size & Delete */}
                <div className="flex justify-between items-start w-full mb-3 min-[400px]:mb-0">
                    <div className="pr-3">
                        <h3 className="font-semibold text-gray-800 text-lg min-[400px]:text-base line-clamp-2 leading-tight">
                            {item.productName}
                        </h3>
                        <p className="text-sm font-medium min-[400px]:font-normal text-gray-500 mt-1">
                            Size: {item.size}
                        </p>
                    </div>
                    <button
                        onClick={() => removeFromCart(item.productId, item.size)}
                        className="p-2 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors flex-shrink-0"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Bottom Row: Price & Quantity */}
                {/* Adds a border-top on mobile, removes it on larger screens */}
                <div className="flex items-center justify-between pt-4 min-[400px]:pt-0 min-[400px]:mt-3 border-t border-gray-100 min-[400px]:border-t-0">
                    <p className="font-black min-[400px]:font-bold text-[#CF2DFF] text-xl min-[400px]:text-lg">
                        ₹{(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity Controls - Slightly larger on mobile for thumb-tapping */}
                    <div className="flex items-center gap-3 px-3 min-[400px]:px-2 py-1.5 min-[400px]:py-1 border border-gray-200 rounded-md min-[400px]:rounded-md bg-gray-50 shadow-sm min-[400px]:shadow-none">
                        <button
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                            className="p-1.5 min-[400px]:p-1 text-gray-500 hover:text-[#CF2DFF] transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 font-bold min-[400px]:font-semibold text-center text-gray-800 text-sm">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                            className="p-1.5 min-[400px]:p-1 text-gray-500 hover:text-[#CF2DFF] transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}