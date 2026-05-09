"use client"

import { useRouter } from "next/navigation";
import { ArrowLeft, Users, TrendingUp, Tag, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AffiliateClient({ referredOrders, myCode }) {
    const router = useRouter();
    const [hasCopied, setHasCopied] = useState(false);

    // Calculate Dashboard Metrics
    // ADD "DELIVERED" TO THIS FILTER:
    const successfulOrders = referredOrders.filter(o => 
        o.payment_status === "PAID" || 
        o.payment_status === "SHIPPED" || 
        o.payment_status === "PROCESSING" || 
        o.payment_status === "DELIVERED"
    );
    
    // Calculate 10% of the total amount for legacy orders, or use the locked commission for new orders
    const totalEarnings = successfulOrders.reduce((sum, order) => {
        const commission = order.affiliate_commission || (order.total_amount * 0.10);
        return sum + commission;
    }, 0);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(myCode);
        setHasCopied(true);
        toast.success("Code copied!");
        setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <div className="min-h-screen pb-24 bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center p-4 bg-white border-b border-gray-100 shadow-sm">
                <button onClick={() => router.back()} className="p-2 mr-2 bg-gray-50 rounded-full transition-colors hover:bg-gray-100">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Affiliate Dashboard</h1>
            </div>

            <div className="p-4 space-y-6">
                {/* Code Sharing Card */}
                <div className="p-5 bg-gradient-to-br from-[#CF2DFF] to-[#9b21bf] rounded-2xl shadow-md text-white flex flex-col items-center text-center">
                    <Tag className="w-8 h-8 mb-2 opacity-80" />
                    <p className="text-sm font-medium opacity-90 mb-1">Your Unique Code</p>
                    <h2 className="text-3xl font-black tracking-widest mb-4">{myCode}</h2>
                    <button 
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-sm font-bold transition-all"
                    >
                        {hasCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {hasCopied ? "Copied!" : "Copy & Share"}
                    </button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center text-center">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                            <Users className="w-5 h-5" />
                        </div>
                        <p className="text-xs text-gray-500 font-medium">Total Referrals</p>
                        <p className="text-xl font-black text-gray-800">{successfulOrders.length}</p>
                    </div>
                    <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center text-center">
                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-2">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <p className="text-xs text-gray-500 font-medium">Your Earnings (10%)</p>
                        <p className="text-xl font-black text-green-600">₹{totalEarnings.toFixed(0)}</p>
                    </div>
                </div>

                {/* History Table */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 ml-1">Referral History</h3>
                    {referredOrders.length === 0 ? (
                        <div className="p-8 bg-white border border-gray-100 rounded-2xl text-center">
                            <p className="text-gray-500">No one has used your code yet. Share it with friends to see stats here!</p>
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                            {referredOrders.map((order, index) => (
                                <div key={order.id} className={`p-4 flex items-center justify-between ${index !== referredOrders.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">
                                            #{order.id.substring(0, 6).toUpperCase()}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        {/* Show their 10% cut instead of the total order value */}
                                        <p className="text-sm font-bold text-green-600">
                                            + ₹{(order.affiliate_commission || (order.total_amount * 0.10)).toFixed(0)}
                                        </p>
                                        <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
                                            order.payment_status === "PAID" ? "text-green-600" :
                                            order.payment_status === "FAILED" ? "text-red-500" : "text-orange-500"
                                        }`}>
                                            {order.payment_status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}