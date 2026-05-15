"use client"

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Package, Truck, Clock, CheckCircle2, MapPin, Phone, Loader2, Search, Filter, ArrowUpDown } from "lucide-react";
import { updateOrderStatus } from "@/actions/adminActions";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrdersFulfillmentClient({ initialOrders }) {
    const router = useRouter();
    const [updatingId, setUpdatingId] = useState(null);

    // --- Filters & Sort State ---
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [sortOrder, setSortOrder] = useState("NEWEST");

    // --- Derived Data (The Magic Filter Engine) ---
    const processedOrders = useMemo(() => {
        let result = [...initialOrders];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(o => 
                o.id.toLowerCase().includes(q) || 
                o.contact_number.includes(q)
            );
        }

        if (filterStatus !== "ALL") {
            result = result.filter(o => o.payment_status === filterStatus);
        }

        result.sort((a, b) => {
            if (sortOrder === "NEWEST") return new Date(b.created_at) - new Date(a.created_at);
            if (sortOrder === "OLDEST") return new Date(a.created_at) - new Date(b.created_at);
            if (sortOrder === "AMOUNT_DESC") return b.total_amount - a.total_amount;
            if (sortOrder === "AMOUNT_ASC") return a.total_amount - b.total_amount;
            return 0;
        });

        return result;
    }, [initialOrders, searchQuery, filterStatus, sortOrder]);

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingId(orderId);
        const result = await updateOrderStatus(orderId, newStatus);
        
        if (result.success) {
            toast.success(result.message);
            router.refresh(); 
        } else {
            toast.error(result.error);
        }
        setUpdatingId(null);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "PAID": return "bg-green-100 text-green-700 border-green-200";
            case "PROCESSING": return "bg-blue-100 text-blue-700 border-blue-200";
            case "SHIPPED": return "bg-purple-100 text-purple-700 border-purple-200";
            case "DELIVERED": return "bg-teal-100 text-teal-700 border-teal-200";
            case "FAILED": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-orange-100 text-orange-700 border-orange-200"; 
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Order Fulfillment</h1>
                    <p className="mt-2 text-gray-500">Track, process, and dispatch customer orders.</p>
                </div>
            </div>

            {/* --- The Toolbar --- */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                        placeholder="Search by Order ID or Phone..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-[#CF2DFF]"
                    />
                </div>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[220px] bg-gray-50 border-gray-200 focus:ring-[#CF2DFF]">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <SelectValue placeholder="Filter by Status" />
                        </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="ALL">All Statuses</SelectItem>
                        <SelectItem value="PAID">Paid (Needs Packing)</SelectItem>
                        <SelectItem value="PROCESSING">Processing (Needs Shipping)</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="FAILED">Failed</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200 focus:ring-[#CF2DFF]">
                        <div className="flex items-center gap-2">
                            <ArrowUpDown className="w-4 h-4 text-gray-500" />
                            <SelectValue placeholder="Sort Orders" />
                        </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="NEWEST">Newest First</SelectItem>
                        <SelectItem value="OLDEST">Oldest First</SelectItem>
                        <SelectItem value="AMOUNT_DESC">Highest Amount</SelectItem>
                        <SelectItem value="AMOUNT_ASC">Lowest Amount</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* --- The Data Table --- */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[1100px]">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Items</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {processedOrders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-16 text-center text-gray-500">
                                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-lg font-bold text-gray-800">No orders found</p>
                                    <p>Try adjusting your filters or search query.</p>
                                </td>
                            </tr>
                        ) : (
                            processedOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors align-top">
                                    
                                    {/* 1. Order ID & Date */}
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <p className="font-bold text-gray-900 tracking-wide">#{order.id.substring(0, 8).toUpperCase()}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(order.created_at).toLocaleString('en-IN', { 
                                                day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                                            })}
                                        </p>
                                    </td>

                                    {/* 2. Amount */}
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <p className="text-sm font-black text-gray-800">₹{order.total_amount.toFixed(2)}</p>
                                    </td>

                                    {/* 3. Status Badge */}
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className={`inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border rounded-full ${getStatusBadge(order.payment_status)}`}>
                                            {order.payment_status}
                                        </div>
                                    </td>

                                    {/* 4. Items List */}
                                    <td className="px-6 py-5 min-w-[200px]">
                                        <ul className="space-y-2">
                                            {order.items.map(item => (
                                                <li key={item.id} className="flex items-start text-sm">
                                                    <span className="font-bold text-gray-800 mr-2">•</span>
                                                    <div>
                                                        <p className="font-semibold text-gray-800 leading-tight">{item.product?.name || "Unknown Product"}</p>
                                                        <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                                                            Size: {item.size} <span className="mx-1">|</span> Qty: {item.quantity}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>

                                    {/* 5. Customer & Delivery */}
                                    <td className="px-6 py-5 min-w-[280px]">
                                        <div className="flex items-start gap-2 mb-2">
                                            <Phone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                                            <p className="text-sm font-semibold text-gray-800">{order.contact_number}</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                                            <p className="text-[13px] text-gray-600 font-medium leading-relaxed">
                                                {order.delivery_address}
                                            </p>
                                        </div>
                                    </td>

                                    {/* 6. Quick Actions */}
                                    <td className="px-6 py-5 text-right whitespace-nowrap w-[240px]">
                                        <div className="flex flex-col items-end gap-2">
                                            {order.payment_status === "PAID" && (
                                                <button 
                                                    onClick={() => handleStatusChange(order.id, "PROCESSING")}
                                                    disabled={updatingId === order.id}
                                                    className="w-full max-w-[190px] flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                                                >
                                                    {updatingId === order.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Clock className="w-4 h-4"/> Pack Order</>}
                                                </button>
                                            )}

                                            {order.payment_status === "PROCESSING" && (
                                                <button 
                                                    onClick={() => handleStatusChange(order.id, "SHIPPED")}
                                                    disabled={updatingId === order.id}
                                                    className="w-full max-w-[190px] flex items-center justify-center gap-2 px-4 py-2 bg-[#CF2DFF] hover:bg-[#b026d9] text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                                                >
                                                    {updatingId === order.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Truck className="w-4 h-4"/> Mark as Shipped</>}
                                                </button>
                                            )}

                                            {order.payment_status === "SHIPPED" && (
                                                <div className="flex flex-col items-end w-full">
                                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-green-700 mb-2 bg-green-50 px-2.5 py-1.5 rounded-md border border-green-200">
                                                        <Truck className="w-3.5 h-3.5" />
                                                        Order Shipped
                                                    </div>
                                                    <button 
                                                        onClick={() => handleStatusChange(order.id, "DELIVERED")}
                                                        disabled={updatingId === order.id}
                                                        className="text-[11px] font-bold text-gray-500 hover:text-gray-800 underline underline-offset-2 transition-colors"
                                                    >
                                                        {updatingId === order.id ? "Updating..." : "Mark as Delivered"}
                                                    </button>
                                                </div>
                                            )}

                                            {order.payment_status === "DELIVERED" && (
                                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1.5 rounded-md border border-teal-200">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Successfully Delivered
                                                </div>
                                            )}
                                        </div>
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