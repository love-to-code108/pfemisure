"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IndianRupee, CheckCircle, Loader2 } from "lucide-react";
import { processAffiliatePayout } from "@/actions/adminActions";
import { Button } from "@/components/ui/button";

export default function AffiliatePayoutClient({ payoutData, totalUnpaidOverall }) {
    const router = useRouter();
    const [processingCode, setProcessingCode] = useState(null);

    const handlePayout = async (affiliateCode, amount) => {
        // Double-check with the admin before wiping the debt
        if (!confirm(`Are you sure you have manually transferred ₹${amount} to the owner of code ${affiliateCode}?`)) {
            return;
        }

        setProcessingCode(affiliateCode);
        const result = await processAffiliatePayout(affiliateCode);

        if (result.success) {
            toast.success(result.message);
            router.refresh(); // Automatically re-fetch the data to clear the row!
        } else {
            toast.error(result.error);
        }
        setProcessingCode(null);
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Affiliate Commission Desk</h1>
                    <p className="mt-2 text-gray-500">Manage and settle unpaid affiliate earnings.</p>
                </div>
                
                {/* Total Unpaid Stat Card */}
                <div className="flex items-center gap-4 px-6 py-4 bg-red-50 border border-red-100 rounded-2xl">
                    <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                        <IndianRupee className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-red-800 uppercase tracking-wider">Total Unpaid Debt</p>
                        <p className="text-2xl font-black text-red-600">₹{totalUnpaidOverall.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            {/* The Data Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Affiliate Details</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Affiliate Code</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Pending Commission</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {payoutData.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                                    <p className="text-lg font-bold text-gray-800">All settled up!</p>
                                    <p>No pending commissions to pay at this time.</p>
                                </td>
                            </tr>
                        ) : (
                            payoutData.map((data, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">{data.full_name || "Unknown User"}</p>
                                        <p className="text-sm text-gray-500">{data.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-purple-700 bg-purple-100 border border-purple-200 rounded-full">
                                            {data.affiliate_code}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-lg font-black text-gray-800">₹{data.totalUnpaid.toFixed(2)}</p>
                                        <p className="text-xs text-gray-500">Across {data.orderCount} orders</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button 
                                            onClick={() => handlePayout(data.affiliate_code, data.totalUnpaid)}
                                            disabled={processingCode === data.affiliate_code}
                                            className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-6"
                                        >
                                            {processingCode === data.affiliate_code ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                "Pay Commission"
                                            )}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}