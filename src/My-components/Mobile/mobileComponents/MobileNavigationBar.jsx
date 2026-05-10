"use client"

import Link from "next/link";
import { Heart, Menu, ShoppingCart, User, Home, Loader2 } from "lucide-react"; 
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa"; 
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr'; 
import { useCartStore } from "@/store/useCartStore"; 

// Shadcn Sheet
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// Shadcn Dialog 
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const MobileNavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentPath = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Optimized Supabase client
    const [supabase] = useState(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ));

    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [authLoading, setAuthLoading] = useState(null); 

    const totalItems = useCartStore((state) => state.getTotalItems());

    // The Real-Time Auth Listener
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setIsLoggedIn(true);
                setIsDialogOpen(false); 
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => {
            subscription.unsubscribe(); 
        };
    }, [supabase]);

    const handleProfileIconClick = () => {
        if (isLoggedIn) {
            router.push('/profile');
        } else {
            setIsDialogOpen(true);
        }
    }

    const handleGoogleLogin = async () => {
        setAuthLoading('google'); 
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
    };

    const handleFacebookLogin = async () => {
        setAuthLoading('facebook'); 
        await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
    };

    const closingTheSheet = () => setIsOpen(false);

    const navbarLinkStyling = (href) => {
        const activeRouteStyle = " font-semibold text-[#CF2DFF] underline underline-offset-1"
        const baseRouteStyle = "mb-[8px]"
        return currentPath === href ? baseRouteStyle + activeRouteStyle : baseRouteStyle;
    }

    return (
        <div className="fixed bottom-0 w-full bg-white flex justify-center items-center rounded-t-xl h-[60px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 lg:hidden">



            <div className="flex justify-between w-[250px] xs:w-[300px]">

                {/* --- UPDATED: Home Button instead of Orders --- */}
                <button onClick={() => router.push('/home')}>
                    <Home color="#CF2DFF" className="w-6 h-6" />
                </button>

                <button onClick={handleProfileIconClick} className=" relative">
                    <User color="#CF2DFF" />
                    <div className={` ${!isLoggedIn && "bg-red-500 w-[8px] h-[8px] rounded-full absolute top-0 right-[3px]"} `} />
                </button>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="w-[90vw] max-w-[400px] rounded-xl bg-white p-6">
                        <DialogHeader>
                            <DialogTitle className=" text-2xl font-bold  text-center text-brand-dark mb-2">
                                Welcome to Pfemisure
                            </DialogTitle>
                            <DialogDescription className="text-center font-poppins text-gray-500 pb-4">
                                Log in or create an account to access your cart, track orders, and save your favorites.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col gap-3 font-poppins">
                            <button onClick={handleGoogleLogin} disabled={authLoading !== null} className="w-full flex items-center justify-center gap-3 py-3 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                {authLoading === 'google' ? <Loader2 className="w-5 h-5 text-gray-400 animate-spin" /> : <FcGoogle className="w-5 h-5" />}
                                {authLoading === 'google' ? "Connecting..." : "Continue with Google"}
                            </button>

                            <button onClick={handleFacebookLogin} disabled={authLoading !== null} className="w-full flex items-center justify-center gap-3 py-3 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                {authLoading === 'facebook' ? <Loader2 className="w-5 h-5 text-gray-400 animate-spin" /> : <FaFacebookSquare className="w-5 h-5 text-blue-600" />}
                                {authLoading === 'facebook' ? "Connecting..." : "Continue with Facebook"}
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* --- UPDATED: cart with Notification Badge --- */}
                <Link href={"/cart"} className="relative flex items-center justify-center">
                    <ShoppingCart color="#CF2DFF" />
                    {totalItems > 0 && (
                        <span className="absolute -top-1.5 -right-2.5 flex px-1 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm border border-white">
                            {totalItems > 9 ? "9+" : totalItems}
                        </span>
                    )}
                </Link>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <button><Menu color="#CF2DFF" /></button>
                    </SheetTrigger>
                    <SheetContent side="left" className="!w-[250px] bg-white">
                        <SheetHeader><SheetTitle className="sr-only">Menu</SheetTitle></SheetHeader>
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="w-full flex flex-col text-lg pl-[20px]">
                                <Link onClick={closingTheSheet} className={navbarLinkStyling("/home")} href="/home">Home</Link>
                                <Link onClick={closingTheSheet} className={navbarLinkStyling("/product1")} href="/product1">Green AN-ION Pad</Link>
                                <Link onClick={closingTheSheet} className={navbarLinkStyling("/product2")} href="/product2">Graphene AN-ION Pad</Link>
                                <Link onClick={closingTheSheet} className={navbarLinkStyling("/product3")} href="/product3">AN-ION Period Panty</Link>
                                
                                {/* --- NEW: My Orders Link --- */}
                                <Link onClick={closingTheSheet} className={navbarLinkStyling("/orders")} href="/orders">My Orders</Link>
                                
                                <Link onClick={closingTheSheet} className={navbarLinkStyling("/affiliate")} href="/affiliate">Affiliate</Link>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default MobileNavigationBar