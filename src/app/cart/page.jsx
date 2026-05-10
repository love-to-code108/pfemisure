"use client"

import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartComponent from "@/My-components/commonComponents/CartComponent";





export default function MobileCartPage() {
    const router = useRouter();
    const cart = useCartStore((state) => state.cart);
    const getCartTotal = useCartStore((state) => state.getCartTotal);
    const setCheckoutMode = useCartStore((state) => state.setCheckoutMode);

    // Calculate the total directly here!
    const totalAmount = cart.reduce((total, item) => {
        // We check for 'price', but add fallbacks just in case 
        // your browser is holding onto older test items!
        const activePrice = item.price || item.totalPrice || item.unitPrice || 0;
        return total + (activePrice * item.quantity);
    }, 0);

    return (
        <div className="min-h-screen pb-24 bg-gray-50">
            {/* Simple Header */}
            <div className="sticky top-0 z-10 flex items-center p-4 bg-white border-b border-gray-100">
                <button onClick={() => router.back()} className="p-2 mr-2 bg-gray-50 rounded-full">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Shopping Cart</h1>
            </div>

            {/* Cart Content */}
            <div className="p-4 flex flex-col gap-4">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
                        <div className="p-6 bg-gray-100 rounded-full mb-4">
                            <ShoppingCart className="w-12 h-12 text-gray-300" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-600">Your cart is empty</h2>
                        <p className="mt-2 text-sm">Looks like you haven't added anything yet.</p>
                        <Button
                            onClick={() => router.push('/home')}
                            className="mt-6 bg-[#CF2DFF] text-white px-8"
                        >
                            Start Shopping
                        </Button>
                    </div>
                ) : (
                    cart.map((item, index) => (
                        <CartComponent
                            key={`${item.productId}-${item.size}-${index}`}
                            item={item}
                        />
                    ))
                )}
            </div>

            {/* Sticky Checkout Bar */}
            {cart.length > 0 && (
                <div className="fixed bottom-[70px] left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="text-2xl font-bold text-[#CF2DFF]">
                            ₹{totalAmount.toFixed(2)}
                        </span>
                    </div>
                    <Button
                        onClick={() => {
                            setCheckoutMode("cart"); // Add this line!
                            router.push('/checkout');
                        }}
                        className="w-full h-14 bg-[#CF2DFF] hover:bg-[#b026d9] text-white text-lg font-bold rounded-xl"
                    >
                        Proceed to Checkout
                    </Button>
                </div>
            )}
        </div>
    );
}