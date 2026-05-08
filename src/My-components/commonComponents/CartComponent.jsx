"use client"

import { useCartStore } from "@/store/useCartStore";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function CartComponent({ item }) {
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const cart = useCartStore((state) => state.cart);








    return (
        <div className="flex gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
            {/* Product Image */}
            <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-50 rounded-lg">
                <img
                    src={item.productImageUrl}
                    alt={item.productName || "Product image"}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Details & Controls */}
            <div className="flex flex-col flex-1 justify-between">
                <div className="flex justify-between items-start w-full">
                    <div>
                        <h3 className="font-semibold text-gray-800 line-clamp-2 leading-tight">
                            {item.productName}
                        </h3>
                        {/* Size is read-only here */}
                        <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                    </div>
                    <button
                        onClick={() => removeFromCart(item.productId, item.size)}
                        className="p-2 text-red-400 hover:text-red-600 bg-red-50 rounded-full"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <p className="font-bold text-brand-purple text-lg">
                        {/* It instantly multiplies the unit price by whatever the current quantity is! */}
                        ₹{(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 px-2 py-1 border border-gray-200 rounded-lg bg-gray-50">
                        <button
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:text-brand-purple"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 font-semibold text-center text-gray-800">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:text-brand-purple"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}