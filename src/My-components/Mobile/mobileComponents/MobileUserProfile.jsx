"use client"

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

// Shadcn UI (Make sure you have these installed: npx shadcn@latest add input label button)
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";







export default function MobileUserProfile({ initialProfile }) {

    // We pad the addresses array so there are always exactly 3 inputs rendered
    const defaultAddresses = initialProfile?.delivery_addresses || [];
    const paddedAddresses = [
        defaultAddresses[0] || "",
        defaultAddresses[1] || "",
        defaultAddresses[2] || "",
    ];

    const [isLoading, setIsLoading] = useState(false);
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

        // Clean up empty addresses before sending to the database
        const cleanAddresses = formData.addresses.filter(addr => addr.trim() !== "");

        const dataToSave = {
            full_name: formData.full_name,
            phone_number: formData.phone_number,
            delivery_addresses: cleanAddresses,
        };

        // TODO: Call your Server Action here to update Prisma!
        console.log("Saving to database:", dataToSave);
        
        // Simulate network delay for the UI
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Profile updated successfully!");
        }, 1000);
    };

    return (
        <div className="w-full max-w-md p-6 mx-auto bg-white rounded-xl">
            <h2 className="mb-6 font-serif text-2xl font-bold text-brand-dark">My Profile</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Email (Read-Only because it comes from Auth) */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-gray-600">Email Address</Label>
                    <Input 
                        id="email" 
                        value={initialProfile?.email || ""} 
                        disabled 
                        className="bg-gray-50 text-gray-500"
                    />
                </div>

                {/* Full Name */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-gray-600">Full Name</Label>
                    <Input 
                        id="name" 
                        value={formData.full_name} 
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        placeholder="e.g. Jane Doe"
                    />
                </div>

                {/* Phone Number */}
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

                {/* Delivery Addresses (Max 3) */}
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

                {/* Affiliate Code (Read-Only + Copy Button) */}
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

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full mt-4 bg-[#CF2DFF] hover:bg-[#b026d9] text-white py-6 text-lg font-semibold rounded-lg"
                >
                    {isLoading ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </div>
    );
}