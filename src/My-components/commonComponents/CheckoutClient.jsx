"use client"

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, CreditCard, AlertCircle, Loader2, Check, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"; // Add Input
import { AFFILIATE_DISCOUNT_PERCENTAGE } from "@/lib/utils";



// Import our secure server action!
import { createCheckoutSession, verifyPaymentSignature, validateAffiliateCode } from "@/actions/checkoutActions";






export default function CheckoutClient({ userProfile }) {
    const router = useRouter();
    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart); // Grab the clearCart function

    const [isProcessing, setIsProcessing] = useState(false);

    // --- New Affiliate State ---
    const [affiliateInput, setAffiliateInput] = useState("");
    const [appliedCode, setAppliedCode] = useState(null);
    const [isApplyingCode, setIsApplyingCode] = useState(false);

    // --- Updated Math Logic ---
    const subtotal = cart.reduce((total, item) => {
        const activePrice = item.price || item.totalPrice || item.unitPrice || 0;
        return total + (activePrice * item.quantity);
    }, 0);

    const discountAmount = appliedCode ? (subtotal * AFFILIATE_DISCOUNT_PERCENTAGE) / 100 : 0;
    const discountedSubtotal = subtotal - discountAmount;

    const deliveryFee = discountedSubtotal > 500 ? 0 : 50;
    const finalTotal = discountedSubtotal + deliveryFee;



    const handleApplyCode = async () => {
        if (!affiliateInput.trim()) return;
        setIsApplyingCode(true);

        const result = await validateAffiliateCode(affiliateInput);
        if (result.success) {
            setAppliedCode(affiliateInput.trim());
            toast.success(`${AFFILIATE_DISCOUNT_PERCENTAGE}% Discount Applied!`);
        } else {
            toast.error(result.error);
        }
        setIsApplyingCode(false);
    };


    // --- New Address Parsing Logic ---
    const rawAddresses = userProfile?.delivery_addresses || [];

    // Helper to format the object into a readable string
    const formatAddress = (addr) => {
        if (typeof addr === 'string') return addr; // Handle legacy strings
        if (!addr) return "";
        // If it's the new object format, combine it beautifully:
        return `${addr.addressLine}, ${addr.city}, ${addr.state} - ${addr.pincode}`;
    };


    const formattedAddresses = rawAddresses.map(formatAddress).filter(addr => addr !== "");

    const hasPhone = Boolean(userProfile?.phone_number && userProfile.phone_number.trim() !== "");
    const isProfileComplete = formattedAddresses.length > 0 && hasPhone;

    // Store the formatted string in state!
    const [selectedAddress, setSelectedAddress] = useState(formattedAddresses[0] || "");




    useEffect(() => {
        if (cart.length === 0) {
            router.push('/cart');
        }
    }, [cart, router]);

    // 1. Function to inject Razorpay into the browser
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // 2. The Main Payment Handler
    const handlePayment = async () => {
        setIsProcessing(true);

        // Step A: Load the script
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            setIsProcessing(false);
            return;
        }

        // Step B: Call our secure Server Action
        const result = await createCheckoutSession(cart, selectedAddress, userProfile.phone_number, appliedCode);

        if (!result.success) {
            toast.error(result.error || "Failed to initialize checkout");
            setIsProcessing(false);
            return;
        }

        // Step C: Configure Razorpay Window
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: result.amount,
            currency: result.currency,
            name: "Pfemisure",
            description: "Secure Checkout",
            order_id: result.razorpayOrderId,
            handler: async function (response) {
                // Razorpay gave us the success keys. Now we silently verify them on our backend.
                const verifyResult = await verifyPaymentSignature(
                    response.razorpay_order_id,
                    response.razorpay_payment_id,
                    response.razorpay_signature
                );

                if (verifyResult.success) {
                    // The backend confirmed it's real!
                    toast.success("Payment Successful & Verified!");
                    clearCart();
                    router.push('/home');
                } else {
                    // Someone tried to spoof the payment, or the network dropped
                    toast.error("Payment verification failed! Please contact support.");
                    setIsProcessing(false);
                }
            },
            prefill: {
                name: userProfile?.full_name || "",
                email: userProfile?.email || "",
                contact: userProfile?.phone_number || ""
            },
            theme: {
                color: "#CF2DFF" // Your brand purple!
            }
        };

        // Step E: Pop it open!
        const paymentObject = new window.Razorpay(options);

        paymentObject.on('payment.failed', function (response) {
            toast.error("Payment Failed or Cancelled.");
            setIsProcessing(false);
        });

        paymentObject.open();
    };

    if (cart.length === 0) return null;

    return (
        <div className="min-h-screen pb-32 bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center p-4 bg-white border-b border-gray-100">
                <button onClick={() => router.back()} className="p-2 mr-2 bg-gray-50 rounded-full">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Checkout</h1>
            </div>

            <div className="p-4 space-y-6">
                {/* Delivery Address Section */}
                <section>
                    <h2 className="flex items-center gap-2 mb-3 text-lg font-bold text-gray-800">
                        <MapPin className="w-5 h-5 text-[#CF2DFF]" />
                        Delivery Address
                    </h2>

                    {!isProfileComplete ? (
                        <div className="p-4 border border-red-100 bg-red-50 rounded-xl">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-red-800">Incomplete Profile</p>
                                    <p className="text-sm text-red-600 mt-1 mb-3">
                                        We need a valid phone number and at least one delivery address to process your order.
                                    </p>
                                    <Button
                                        onClick={() => router.push('/profile')}
                                        variant="outline"
                                        className="border-red-200 text-red-700 bg-white"
                                    >
                                        Complete Profile
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {formattedAddresses.map((formattedAddr, index) => (
                                <label
                                    key={index}
                                    className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${selectedAddress === formattedAddr
                                        ? "border-[#CF2DFF] bg-purple-50/50"
                                        : "border-gray-200 bg-white"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="address"
                                        value={formattedAddr}
                                        checked={selectedAddress === formattedAddr}
                                        onChange={(e) => setSelectedAddress(e.target.value)}
                                        className="w-4 h-4 mt-1 mr-3 text-[#CF2DFF] focus:ring-[#CF2DFF]"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">{userProfile?.full_name || "Delivery"}</p>
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{formattedAddr}</p>
                                        <p className="text-sm text-gray-500 mt-1">Phone: {userProfile?.phone_number}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </section>

                {/* Order Summary Section */}
                <section>
                    <h2 className="mb-3 text-lg font-bold text-gray-800">Order Summary</h2>
                    <div className="p-4 bg-white border border-gray-100 rounded-xl">
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between py-2 border-b border-gray-50 last:border-0 last:pb-0">
                                <div className="flex-1 pr-4">
                                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.productName}</p>
                                    <p className="text-xs text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-bold text-gray-800">
                                    ₹{((item.price || item.totalPrice || item.unitPrice || 0) * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>



                {/* Affiliate Code Section */}
                <section>
                    <h2 className="flex items-center gap-2 mb-3 text-lg font-bold text-gray-800">
                        <Tag className="w-5 h-5 text-[#CF2DFF]" />
                        Have an Affiliate Code?
                    </h2>
                    <div className="p-4 bg-white border border-gray-100 rounded-xl">
                        <div className="flex items-center gap-3">
                            <Input
                                placeholder="Enter code here"
                                value={affiliateInput}
                                onChange={(e) => setAffiliateInput(e.target.value)}
                                disabled={appliedCode || isApplyingCode}
                                className="uppercase bg-gray-50"
                            />
                            {appliedCode ? (
                                <Button
                                    onClick={() => { setAppliedCode(null); setAffiliateInput(""); toast.success("Code removed"); }}
                                    variant="outline"
                                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                                >
                                    Remove
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleApplyCode}
                                    disabled={!affiliateInput || isApplyingCode}
                                    className="bg-gray-800 hover:bg-gray-900 text-white"
                                >
                                    {isApplyingCode ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                                </Button>
                            )}
                        </div>
                        {appliedCode && (
                            <p className="flex items-center gap-1 mt-3 text-sm font-medium text-green-600">
                                <Check className="w-4 h-4" />
                                Awesome! You saved ₹{discountAmount.toFixed(2)}
                            </p>
                        )}
                    </div>
                </section>



                {/* Bill Details */}
                <section>
                    <h2 className="mb-3 text-lg font-bold text-gray-800">Bill Details</h2>
                    <div className="p-4 space-y-3 bg-white border border-gray-100 rounded-xl">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>


                        {/* NEW: Show the discount if applied */}
                        {appliedCode && (
                            <div className="flex justify-between text-sm text-green-600 font-medium">
                                <span>Discount ({AFFILIATE_DISCOUNT_PERCENTAGE}%)</span>
                                <span>- ₹{discountAmount.toFixed(2)}</span>
                            </div>
                        )}


                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Delivery Fee</span>
                            <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}
                            </span>
                        </div>
                        <div className="pt-3 mt-3 border-t border-dashed border-gray-200 flex justify-between items-center">
                            <span className="font-bold text-gray-800">To Pay</span>
                            <span className="text-xl font-bold text-[#CF2DFF]">₹{finalTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </section>
            </div>

            {/* Sticky Payment Footer */}
            <div className="fixed bottom-[60px] left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <Button
                    onClick={handlePayment}
                    disabled={!isProfileComplete || !selectedAddress || isProcessing}
                    className="w-full h-14 bg-[#CF2DFF] hover:bg-[#b026d9] text-white text-lg font-bold rounded-xl disabled:bg-gray-300 disabled:opacity-100"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <CreditCard className="w-5 h-5 mr-2" />
                            Pay ₹{finalTotal.toFixed(2)}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}