"use client"

import { useRouter } from "next/navigation";
import { ArrowLeft, Package, Clock, CheckCircle2, XCircle, Truck } from "lucide-react";

export default function OrdersClient({ initialOrders }) {
    const router = useRouter();

    // Helper function to color-code and label the order status
    const getStatusUI = (status) => {
        switch (status?.toUpperCase()) {
            case "PAID":
                return { color: "text-green-600 bg-green-50 border-green-200", icon: <CheckCircle2 className="w-4 h-4 mr-1" />, text: "Confirmed" };
            case "PROCESSING":
                return { color: "text-blue-600 bg-blue-50 border-blue-200", icon: <Clock className="w-4 h-4 mr-1" />, text: "Processing" };
            case "SHIPPED":
                return { color: "text-purple-600 bg-purple-50 border-purple-200", icon: <Truck className="w-4 h-4 mr-1" />, text: "Shipped" };
            case "FAILED":
                return { color: "text-red-600 bg-red-50 border-red-200", icon: <XCircle className="w-4 h-4 mr-1" />, text: "Failed" };
            default:
                return { color: "text-orange-600 bg-orange-50 border-orange-200", icon: <Clock className="w-4 h-4 mr-1" />, text: "Pending" };
        }
    };

    return (
        <div className="min-h-screen pb-24 bg-gray-50
        
        w-full flex justify-center
        ">




            <div className=" w-full max-w-[500px]">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center p-4 bg-white border-b border-gray-100 shadow-sm">
                    <button onClick={() => router.push('/home')} className="p-2 mr-2 bg-gray-50 rounded-full transition-colors hover:bg-gray-100">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">My Orders</h1>
                </div>

                <div className="p-4 flex flex-col gap-10">
                    {initialOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center mt-24 text-center">
                            <div className="p-6 bg-purple-50 rounded-full mb-4">
                                <Package className="w-12 h-12 text-[#CF2DFF]" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">No orders yet</h2>
                            <p className="mt-2 text-gray-500">When you place an order, it will appear here.</p>
                            <button
                                onClick={() => router.push('/home')}
                                className="mt-6 px-8 py-3 bg-[#CF2DFF] text-white font-bold rounded-xl shadow-md hover:bg-[#b026d9] transition-colors"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        initialOrders.map((order) => {
                            const statusUI = getStatusUI(order.payment_status);

                            return (
                                <div key={order.id} className="flex flex-col gap-3">

                                    {/* 1. Order Metadata Header */}
                                    <div className="flex items-start justify-between px-2 mb-1">
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                                                Order #{order.id.substring(0, 8)}
                                            </p>
                                            <p className="text-sm font-semibold text-gray-800">
                                                {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                    day: 'numeric', month: 'short', year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className={`flex items-center px-3 py-1.5 text-xs font-bold border rounded-full ${statusUI.color}`}>
                                            {statusUI.icon}
                                            {statusUI.text}
                                        </div>
                                    </div>

                                    {/* 2. Order Items (Vertical Cards exactly like Cart) */}
                                    <div className="flex flex-col gap-4">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex flex-col p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">

                                                {/* Product Image - Large & Vertical */}
                                                <div className="relative w-full h-48 overflow-hidden bg-gray-50 rounded-xl mb-4">
                                                    <img
                                                        src={item.product?.productImageUrl}
                                                        alt={item.product?.name || "Product image"}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>

                                                {/* Title */}
                                                <div className="mb-1">
                                                    <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                                                        {item.product?.name || "Product Unavailable"}
                                                    </h3>
                                                </div>

                                                {/* Size & Qty */}
                                                <p className="text-sm font-medium text-gray-500 mb-4">
                                                    Size: {item.size || "Standard"} <span className="mx-2 text-gray-300">|</span> Qty: {item.quantity}
                                                </p>

                                                {/* Price Row */}
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                    <p className="text-sm font-medium text-gray-500">Item Total</p>
                                                    <p className="font-black text-[#CF2DFF] text-xl">
                                                        ₹{(Number(item.unit_price) * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 3. Order Footer - Total Bill */}
                                    {/* <div className="p-4 mt-2 bg-gray-900 rounded-2xl flex items-center justify-between shadow-md">
                                    <span className="text-sm font-bold text-gray-300">Total Paid</span>
                                    <span className="text-lg font-black text-white">₹{Number(order.total_amount).toFixed(2)}</span>
                                </div> */}

                                    {/* Divider Line */}
                                    {/* <div className="h-px w-full bg-gray-200 mt-6 rounded-full"></div> */}
                                </div>
                            );
                        })
                    )}
                </div>


            </div>
        </div>
    );
}