"use client"

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Settings, Percent, Users, Save, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGlobalSettings, updateGlobalSettings, getAffiliateUsers, updateVipRates } from "@/actions/affiliateSettingsActions";

// Mini-component to safely handle state for individual rows
function VipRow({ user, onSave, isSaving }) {
    const [discount, setDiscount] = useState(user.custom_discount_percent ?? "");
    const [earning, setEarning] = useState(user.custom_earning_percent ?? "");

    return (
        <tr className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0">
            <td className="px-4 py-4 font-semibold text-gray-900">{user.full_name || "Unknown"}</td>
            <td className="px-4 py-4">
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold font-mono tracking-wider">
                    {user.affiliate_code}
                </span>
            </td>
            <td className="px-4 py-4">
                <Input
                    type="number"
                    placeholder="Global Default"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-32 bg-white focus-visible:ring-[#CF2DFF]"
                />
            </td>
            <td className="px-4 py-4">
                <Input
                    type="number"
                    placeholder="Global Default"
                    value={earning}
                    onChange={(e) => setEarning(e.target.value)}
                    className="w-32 bg-white focus-visible:ring-[#CF2DFF]"
                />
            </td>
            <td className="px-4 py-4 text-right">
                <Button
                    onClick={() => onSave(user.id, discount, earning)}
                    disabled={isSaving}
                    variant="outline"
                    className="border-[#CF2DFF] text-[#CF2DFF] hover:bg-[#CF2DFF] hover:text-white transition-colors"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update"}
                </Button>
            </td>
        </tr>
    );
}

export default function AffiliateSettingsClient() {
    const [globalDiscount, setGlobalDiscount] = useState("");
    const [globalEarning, setGlobalEarning] = useState("");
    const [isSavingGlobal, setIsSavingGlobal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [savingUserId, setSavingUserId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        const globalRes = await getGlobalSettings();
        if (globalRes.success) {
            setGlobalDiscount(globalRes.settings.globalDiscountPercent);
            setGlobalEarning(globalRes.settings.globalEarningPercent);
        }

        const usersRes = await getAffiliateUsers();
        if (usersRes.success) {
            setUsers(usersRes.users);
        }
        setIsLoading(false);
    };

    const handleSaveGlobal = async () => {
        setIsSavingGlobal(true);
        const res = await updateGlobalSettings(globalDiscount, globalEarning);
        if (res.success) {
            toast.success("Global baseline settings updated successfully!");
        } else {
            toast.error(res.error);
        }
        setIsSavingGlobal(false);
    };

    const handleSaveVip = async (userId, discount, earning) => {
        setSavingUserId(userId);
        const res = await updateVipRates(userId, discount, earning);
        if (res.success) {
            toast.success(res.message);
            await fetchData(); 
        } else {
            toast.error(res.error);
        }
        setSavingUserId(null);
    };

    const filteredUsers = users.filter(u =>
        u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.affiliate_code?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#CF2DFF]" />
                <p className="text-gray-500 font-medium">Loading configurations...</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Affiliate Configuration</h1>
                <p className="mt-2 text-gray-500">Manage global commission rates and individual VIP influencer overrides.</p>
            </div>

            {/* --- Global Settings Card --- */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6">
                    <Settings className="w-5 h-5 text-[#CF2DFF]" />
                    Global Baseline Settings
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Global Affiliate Code Discount Percentage (For Everyone)
                        </label>
                        <div className="relative">
                            <Input
                                type="number"
                                value={globalDiscount}
                                onChange={(e) => setGlobalDiscount(e.target.value)}
                                className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-[#CF2DFF] text-lg font-semibold"
                            />
                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">The default discount anyone gets when using a standard code.</p>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Global Affiliate Earning Percentage (For Everyone)
                        </label>
                        <div className="relative">
                            <Input
                                type="number"
                                value={globalEarning}
                                onChange={(e) => setGlobalEarning(e.target.value)}
                                className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-[#CF2DFF] text-lg font-semibold"
                            />
                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">The default commission an influencer earns per sale.</p>
                    </div>
                </div>

                <Button
                    onClick={handleSaveGlobal}
                    disabled={isSavingGlobal}
                    className="bg-[#CF2DFF] hover:bg-[#b026d9] text-white font-bold px-6 py-2 h-auto"
                >
                    {isSavingGlobal ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                    ) : (
                        <><Save className="w-4 h-4 mr-2" /> Save Global Settings</>
                    )}
                </Button>
            </div>

            {/* --- VIP Overrides Table --- */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                            <Users className="w-5 h-5 text-[#CF2DFF]" />
                            VIP Influencer Overrides
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Leave inputs blank to revert an influencer to the global defaults.</p>
                    </div>
                    
                    <div className="relative w-full md:w-72 shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search by name or code..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-[#CF2DFF]"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-lg">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Influencer Name</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Affiliate Code</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Custom Discount %</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Custom Earning %</th>
                                <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <VipRow 
                                    key={user.id} 
                                    user={user} 
                                    onSave={handleSaveVip} 
                                    isSaving={savingUserId === user.id} 
                                />
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-4 py-12 text-center text-gray-500">
                                        <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                        <p className="font-medium">No influencers found matching your search.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}