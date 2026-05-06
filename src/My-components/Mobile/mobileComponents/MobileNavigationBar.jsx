"use client"

import Link from "next/link";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa"; // Added for social buttons
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr'; // Added for auth

// Shadcn Sheet
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

// Shadcn Dialog (New)
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const MobileNavigationBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const currentPath = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // Initialize Supabase inside the component
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );




    // checking if the user is logged in or not
    useEffect(() => {

        const cookieChecker = async () => {
            const {data , error} = await supabase.auth.getSession();
            // console.log(data)
            if(data.session){
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false); 
            }
        }

        cookieChecker()

    })








    // Auth Handlers
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    const handleFacebookLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };










    // sheet closing login and animation
    const closingTheSheet = () => {
        setIsOpen(false);
    }

    // active navbar link logic
    const navbarLinkStyling = (href) => {
        const activeRouteStyle = " font-semibold text-[#CF2DFF] underline underline-offset-1"
        const baseRouteStyle = "mb-[8px]"
        return currentPath === href ? baseRouteStyle + activeRouteStyle : baseRouteStyle;
    }









    return (
        <div className="fixed bottom-0 w-full bg-white flex justify-center items-center rounded-t-xl h-[60px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">

            <div className="flex justify-between w-[300px]">

                {/* wishlist */}
                <button>
                    <Heart color="#CF2DFF" />
                </button>

                {/* USER AUTH DIALOG */}
                <Dialog>
                    {/* The icon triggers the dialog */}
                    <DialogTrigger asChild>
                        <button className=" relative">
                            <User color="#CF2DFF" />
                            <div className={` ${!isLoggedIn && "bg-red-500 w-[8px] h-[8px] rounded-full absolute top-0 right-[3px]"} `} />
                        </button>
                    </DialogTrigger>

                    {/* The Dialog Popup */}
                    <DialogContent className="w-[90vw] max-w-[400px] rounded-xl bg-white p-6">
                        <DialogHeader>
                            <DialogTitle className="font-serif text-2xl font-bold italic text-center text-brand-dark mb-2">
                                Welcome to Pfemisure
                            </DialogTitle>
                            <DialogDescription className="text-center font-poppins text-gray-500 pb-4">
                                Log in or create an account to access your cart, track orders, and save your favorites.
                            </DialogDescription>
                        </DialogHeader>

                        {/* Social Buttons */}
                        <div className="flex flex-col gap-3 font-poppins">
                            <button
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center justify-center gap-3 py-3 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <FcGoogle className="w-5 h-5 text-blue-500" />
                                Continue with Google
                            </button>

                            <button
                                onClick={handleFacebookLogin}
                                className="w-full flex items-center justify-center gap-3 py-3 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <FaFacebookSquare className="w-5 h-5 text-blue-600" />
                                Continue with Facebook
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* cart */}
                <button>
                    <ShoppingCart color="#CF2DFF" />
                </button>

                {/* hamburger menu button */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <button>
                            <Menu color="#CF2DFF" />
                        </button>
                    </SheetTrigger>

                    <SheetContent side="left" className="!w-[250px] bg-white">
                        <SheetHeader>
                            <SheetTitle className="sr-only">Menu</SheetTitle>
                        </SheetHeader>

                        <div className="w-full h-full flex justify-center items-center">
                            <div className="w-full flex flex-col text-lg pl-[20px]">
                                <Link onClick={closingTheSheet} className={navbarLinkStyling("/home")} href="/home">Home</Link>
                                <Link onClick={closingTheSheet} className={navbarLinkStyling("/product1")} href="/product1">Green AN-ION Pad</Link>
                                <Link onClick={closingTheSheet} className={navbarLinkStyling("/product2")} href="/product2">Graphene AN-ION Pad</Link>
                                <Link onClick={closingTheSheet} className={navbarLinkStyling("/product3")} href="/product3">AN-ION Period Panty</Link>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

            </div>
        </div>
    )
}

export default MobileNavigationBar