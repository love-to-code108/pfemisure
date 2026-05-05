
"use client"

import Link from "next/link";
import Image from "next/image";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"; // Adjust path if your shadcn installed elsewhere
import { useState } from "react";
import { usePathname } from "next/navigation";

function Nav() {
    const navLinks = [
        { name: "Home", href: "/home" },
        { name: "AN-ION Pad", href: "/product1" },
        { name: "Graphene Pad", href: "/product2" },
        { name: "Period Panty", href: "/product3" },
    ];

    return (
        <Sheet>

            {/* 2. THE BUTTON: Clicking whatever is inside here toggles the state to 'true'. */}
            <SheetTrigger>
                <button>Open Menu</button>
            </SheetTrigger>

            {/* 3. THE DRAWER: This is the panel that slides in. 'side' controls direction. */}
            <SheetContent side="right">

                {/* 4. ACCESSIBILITY REQUIREMENT: Screen readers need a title to know what opened. */}
                <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>

                {/* 5. YOUR STUFF: Anything you put here shows up inside the drawer. */}
                <div className="mt-4 flex flex-col gap-4">
                    <a href="/home">Home</a>
                    <a href="/products">Products</a>
                </div>

            </SheetContent>

        </Sheet>
    );
}


const MobileNavigationBar = () => {


    const [isOpen,setIsOpen] = useState(false);

    const currentPath = usePathname(); 



    // sheet closing login and animation
    const closingTheSheet = () => {

        setIsOpen(false);
    }




    // active navbar link logic
    const navbarLinkStyling = (href) => {

        console.log(href)
        console.log("working")
        const activeRouteStyle = " font-semibold text-[#CF2DFF] underline underline-offset-1"
        const baseRouteStyle = "mb-[8px]"


        return currentPath === href ? baseRouteStyle + activeRouteStyle : baseRouteStyle;


    }
 






    return (
        <div className=" fixed bottom-0 w-full  bg-white flex justify-center items-center
        
         rounded-t-xl
        h-[60px]">



            <div className=" flex justify-between 
            
            w-[300px]">


                {/* wishlist */}
                <Heart color="#CF2DFF" className="" />


                {/* user */}
                <User color="#CF2DFF" className="" />



                {/* cart */}
                <ShoppingCart color="#CF2DFF" className="" />














                {/* hamburger menu button */}

                <Sheet open={isOpen} onOpenChange={setIsOpen}>

                    {/* 2. THE BUTTON: Clicking whatever is inside here toggles the state to 'true'. */}
                    <SheetTrigger>
                        <Menu color="#CF2DFF" className="" />
                    </SheetTrigger>

                    {/* 3. THE DRAWER: This is the panel that slides in. 'side' controls direction. */}
                    <SheetContent side="left" className={" !w-[250px]"}>

                        {/* 4. ACCESSIBILITY REQUIREMENT: Screen readers need a title to know what opened. */}
                        <SheetHeader>
                            <SheetTitle></SheetTitle>
                        </SheetHeader>

                        {/* 5. YOUR STUFF: Anything you put here shows up inside the drawer. */}
                        <div className="w-full h-full flex justify-center items-center">
                            <div className=" w-full flex flex-col text-lg pl-[20px]">
                                <Link 
                                onClick={closingTheSheet}
                                className={navbarLinkStyling("/home")} href="/home">Home</Link>

                                <Link
                                onClick={closingTheSheet} 
                                className={navbarLinkStyling("/product1")} href="/product1">Green AN-ION Pad</Link>

                                <Link
                                onClick={closingTheSheet} 
                                className={navbarLinkStyling("/product2")} href="/product2">Graphene AN-ION Pad</Link>

                                <Link 
                                onClick={closingTheSheet}
                                className={navbarLinkStyling("/product3")} href="/product3">AN-ION Period Panty</Link>

                            </div>
                        </div>

                    </SheetContent>

                </Sheet>


            </div>
        </div>
    )
}



export default MobileNavigationBar