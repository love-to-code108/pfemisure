"use client"

import { useState } from "react";
// Added LogOut icon and Next.js router
import { Copy, Check, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateProfileData } from "@/app/actions/profileActions";

export default function MobileUserProfile({ initialProfile }) {
    const router = useRouter();

    // Initialize Supabase to handle the logout on the client side
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const defaultAddresses = initialProfile?.delivery_addresses || [];
    const paddedAddresses = [
        defaultAddresses[0] || "",
        defaultAddresses[1] || "",
        defaultAddresses[2] || "",
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);
    const [formData, setFormData] = useState({
        full_name: initialProfile?.full_name || "",
        phone_number: initialProfile?.phone_number || "",
        addresses: paddedAddresses,
    });

    const handleAddressChange = (index, value) => {
        const newAddresses = [...formData.addresses];
        newAddresses[index] = value;
        setFormData({ ...formData, addresses: newAddresses });
    };

    const copyToClipboard = () => {
        if (!initialProfile?.affiliate_code) return;
        navigator.clipboard.writeText(initialProfile.affiliate_code);
        setHasCopied(true);
        toast.success("Affiliate code copied!");
        setTimeout(() => setHasCopied(false), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const cleanAddresses = formData.addresses.filter(addr => addr.trim() !== "");

        const dataToSave = {
            full_name: formData.full_name,
            phone_number: formData.phone_number,
            delivery_addresses: cleanAddresses,
        };

        const result = await updateProfileData(dataToSave);
        
        if (result.success) {
            toast.success("Profile updated successfully!");
        } else {
            toast.error("Failed to save changes. Please try again.");
        }
        
        setIsLoading(false);
    };

    // The new Logout Function
    const handleLogout = async () => {
        setIsLoggingOut(true);
        
        // 1. Tell Supabase to destroy the session cookie
        const { error } = await supabase.auth.signOut();
        
        if (!error) {
            toast.success("Logged out successfully");
            // 2. Send them to the home page
            router.push('/home');
            // 3. CRUCIAL: Force Next.js to clear its server cache so it registers the missing cookie
            router.refresh(); 
        } else {
            toast.error("Failed to log out.");
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="w-full max-w-md p-6 mx-auto bg-white rounded-xl">
            <h2 className="mb-6 font-serif text-2xl font-bold text-brand-dark">My Profile</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-gray-600">Email Address</Label>
                    <Input 
                        id="email" 
                        value={initialProfile?.email || ""} 
                        disabled 
                        className="bg-gray-50 text-gray-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-gray-600">Full Name</Label>
                    <Input 
                        id="name" 
                        value={formData.full_name} 
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        placeholder="e.g. Jane Doe"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="phone" className="text-gray-600">Phone Number</Label>
                    <Input 
                        id="phone" 
                        type="tel"
                        value={formData.phone_number} 
                        onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                        placeholder="+91 98765 43210"
                    />
                </div>

                <div className="flex flex-col gap-3 mt-2">
                    <Label className="text-gray-600">Saved Delivery Addresses (Max 3)</Label>
                    {formData.addresses.map((address, index) => (
                        <Input 
                            key={index}
                            value={address}
                            onChange={(e) => handleAddressChange(index, e.target.value)}
                            placeholder={`Address ${index + 1} (Street, City, PIN)`}
                        />
                    ))}
                </div>

                <div className="flex flex-col gap-2 mt-4 p-4 border border-purple-100 bg-purple-50 rounded-lg">
                    <Label className="text-purple-800 font-semibold">Your Affiliate Code</Label>
                    <div className="flex items-center gap-2">
                        <Input 
                            value={initialProfile?.affiliate_code || "Generating..."} 
                            readOnly 
                            className="bg-white border-purple-200 font-mono text-lg font-bold text-center text-purple-700"
                        />
                        <Button 
                            type="button" 
                            variant="outline" 
                            size="icon"
                            onClick={copyToClipboard}
                            className="shrink-0 border-purple-200 hover:bg-purple-100"
                        >
                            {hasCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-purple-700" />}
                        </Button>
                    </div>
                    <p className="text-xs text-purple-600 mt-1">Share this code with friends to earn rewards!</p>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-[#CF2DFF] hover:bg-[#b026d9] text-white py-6 text-lg font-semibold rounded-lg"
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    
                    {/* The New Logout Button */}
                    <Button 
                        type="button"
                        variant="outline"
                        disabled={isLoggingOut}
                        onClick={handleLogout}
                        className="w-full py-6 text-lg font-semibold text-red-600 border-red-200 rounded-lg hover:bg-red-50 hover:text-red-700"
                    >
                        <LogOut className="w-5 h-5 mr-2" />
                        {isLoggingOut ? "Logging out..." : "Log Out"}
                    </Button>
                </div>
            </form>
        </div>
    );
}