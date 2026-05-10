"use client"

import { useState } from "react";
import { Copy, Check, LogOut, MapPin, Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { updateProfileData } from "@/actions/profileActions";

import { useCartStore } from "@/store/useCartStore";

export default function MobileUserProfile({ initialProfile }) {
    const router = useRouter();

    const clearCart = useCartStore((state) => state.clearCart); 

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Safely parse old string addresses into objects so the app doesn't crash during transition
    const parsedAddresses = (initialProfile?.delivery_addresses || []).map(addr => {
        if (typeof addr === 'string') return { addressLine: addr, city: "", state: "", pincode: "" };
        return addr;
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);
    
    // Address Management State
    const [addresses, setAddresses] = useState(parsedAddresses);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isFetchingPin, setIsFetchingPin] = useState(false);
    const [isSavingAddress, setIsSavingAddress] = useState(false);
    
    const [addressForm, setAddressForm] = useState({
        addressLine: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [formData, setFormData] = useState({
        full_name: initialProfile?.full_name || "",
        phone_number: initialProfile?.phone_number || "",
    });

    // --- Address Logic ---

    const handlePincodeChange = async (e) => {
        const pin = e.target.value.replace(/\D/g, '').slice(0, 6); // Only allow 6 numbers
        setAddressForm(prev => ({ ...prev, pincode: pin }));

        // Magic Auto-Fill
        if (pin.length === 6) {
            setIsFetchingPin(true);
            try {
                const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
                const data = await res.json();
                if (data[0].Status === "Success") {
                    const postOffice = data[0].PostOffice[0];
                    setAddressForm(prev => ({
                        ...prev,
                        city: postOffice.District,
                        state: postOffice.State
                    }));
                    toast.success("City and State auto-filled!");
                } else {
                    toast.error("Invalid PIN code. Please check again.");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsFetchingPin(false);
            }
        }
    };

    const openAddressModal = (index = null) => {
        if (index !== null) {
            setAddressForm(addresses[index]);
            setEditingIndex(index);
        } else {
            setAddressForm({ addressLine: "", city: "", state: "", pincode: "" });
            setEditingIndex(null);
        }
        setIsDialogOpen(true);
    };

    const saveAddress = async () => {
        if (!addressForm.addressLine || !addressForm.city || !addressForm.state || addressForm.pincode.length !== 6) {
            toast.error("Please fill all fields with a valid 6-digit PIN code.");
            return;
        }

        setIsSavingAddress(true);

        const newAddresses = [...addresses];
        if (editingIndex !== null) {
            newAddresses[editingIndex] = addressForm;
        } else {
            newAddresses.push(addressForm);
        }

        // Package the data with the existing name/phone to prevent overwriting them with null
        const dataToSave = {
            ...formData,
            delivery_addresses: newAddresses,
        };

        // Call the database immediately
        const result = await updateProfileData(dataToSave);
        
        if (result.success) {
            setAddresses(newAddresses);
            setIsDialogOpen(false);
            toast.success("Address saved successfully!");
        } else {
            toast.error("Failed to save address to database.");
        }
        
        setIsSavingAddress(false);
    };





    const deleteAddress = async (indexToRemove) => {
        const newAddresses = addresses.filter((_, idx) => idx !== indexToRemove);
        
        const dataToSave = {
            ...formData,
            delivery_addresses: newAddresses,
        };

        // Delete from database immediately
        const result = await updateProfileData(dataToSave);
        
        if (result.success) {
            setAddresses(newAddresses);
            toast.success("Address removed!");
        } else {
            toast.error("Failed to remove address.");
        }
    };

    // --- Standard Logic ---

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

        const dataToSave = {
            ...formData,
            delivery_addresses: addresses, // Now passing the clean array of objects
        };

        const result = await updateProfileData(dataToSave);
        
        if (result.success) {
            toast.success("Profile updated successfully!");
        } else {
            toast.error("Failed to save changes. Please try again.");
        }
        setIsLoading(false);
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        const { error } = await supabase.auth.signOut();
        
        if (!error) {
            clearCart(); // <--- WIPE THE CART!
            toast.success("Logged out successfully");
            router.push('/home');
            router.refresh(); 
        } else {
            toast.error("Failed to log out.");
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="w-full max-w-md p-6 mx-auto bg-white rounded-md">
            <h2 className="mb-6 text-2xl font-bold text-brand-dark">My Profile</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Basic Info */}
                <div className="flex flex-col gap-2">
                    <Label className="text-gray-600">Email Address</Label>
                    <Input value={initialProfile?.email || ""} disabled className="bg-gray-50 text-gray-500" />
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-gray-600">Full Name</Label>
                    <Input 
                        value={formData.full_name} 
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-gray-600">Phone Number</Label>
                    <Input 
                        type="tel"
                        value={formData.phone_number} 
                        onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                    />
                </div>

                {/* The New Delivery Address Section */}
                <div className="flex flex-col gap-3 mt-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-gray-600">Saved Addresses</Label>
                        <span className="text-xs text-gray-400">{addresses.length}/3 Saved</span>
                    </div>

                    {/* Address Cards */}
                    <div className="space-y-3">
                        {addresses.map((addr, index) => (
                            <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-md bg-gray-50">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 mt-0.5 text-[#CF2DFF]" />
                                    <div>
                                        <p className="font-medium text-gray-800 line-clamp-2">{addr.addressLine}</p>
                                        <p className="text-sm text-gray-500 mt-1">{addr.city}, {addr.state} - {addr.pincode}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <button type="button" onClick={() => openAddressModal(index)} className="p-2 text-gray-400 hover:text-[#CF2DFF] bg-white border border-gray-200 rounded-md shadow-sm">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button type="button" onClick={() => deleteAddress(index)} className="p-2 text-gray-400 hover:text-red-500 bg-white border border-gray-200 rounded-md shadow-sm">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Address Button */}
                    {addresses.length < 3 && (
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => openAddressModal()}
                            className="w-full py-8 border-2 border-dashed border-gray-300 text-gray-500 hover:text-[#CF2DFF] hover:border-[#CF2DFF] hover:bg-purple-50 rounded-md transition-all"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add New Address
                        </Button>
                    )}
                </div>

                {/* Affiliate Code */}
                <div className="flex flex-col gap-2 mt-4 p-4 border border-purple-100 bg-purple-50 rounded-md">
                    <Label className="text-purple-800 font-semibold">Your Affiliate Code</Label>
                    <div className="flex items-center gap-2">
                        <Input value={initialProfile?.affiliate_code || "Generating..."} readOnly className="bg-white border-purple-200 font-mono text-lg font-bold text-center text-purple-700" />
                        <Button type="button" variant="outline" size="icon" onClick={copyToClipboard} className="shrink-0 border-purple-200 hover:bg-purple-100">
                            {hasCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-purple-700" />}
                        </Button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-4">
                    <Button type="submit" disabled={isLoading} className="w-full bg-[#CF2DFF] hover:bg-[#b026d9] text-white py-6 text-lg font-semibold rounded-md">
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button type="button" variant="outline" disabled={isLoggingOut} onClick={handleLogout} className="w-full py-6 text-lg font-semibold text-red-600 border-red-200 rounded-md hover:bg-red-50 hover:text-red-700">
                        <LogOut className="w-5 h-5 mr-2" />
                        {isLoggingOut ? "Logging out..." : "Log Out"}
                    </Button>
                </div>
            </form>

            {/* --- Address Dialog Modal --- */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="w-[90%] max-w-md rounded-md">
                    <DialogHeader>
                        <DialogTitle>{editingIndex !== null ? "Edit Address" : "Add New Address"}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                        
                        <div className="flex flex-col gap-2">
                            <Label>PIN Code</Label>
                            <div className="relative">
                                <Input 
                                    placeholder="e.g. 110001" 
                                    value={addressForm.pincode}
                                    onChange={handlePincodeChange}
                                    maxLength={6}
                                />
                                {isFetchingPin && <Loader2 className="absolute right-3 top-2.5 w-4 h-4 animate-spin text-gray-400" />}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>City / District</Label>
                                <Input 
                                    value={addressForm.city} 
                                    onChange={(e) => setAddressForm({...addressForm, city: e.target.value})} 
                                    placeholder="City"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>State</Label>
                                <Input 
                                    value={addressForm.state} 
                                    onChange={(e) => setAddressForm({...addressForm, state: e.target.value})} 
                                    placeholder="State"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Flat, House no., Building, Company, Apartment</Label>
                            <Input 
                                value={addressForm.addressLine} 
                                onChange={(e) => setAddressForm({...addressForm, addressLine: e.target.value})} 
                                placeholder="Enter full address"
                            />
                        </div>

                    </div>
                    <DialogFooter>
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsDialogOpen(false)} 
                            disabled={isSavingAddress}
                            className="w-full"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="button" 
                            onClick={saveAddress} 
                            disabled={isSavingAddress}
                            className="w-full bg-[#CF2DFF] hover:bg-[#b026d9] text-white"
                        >
                            {isSavingAddress ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Address"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}