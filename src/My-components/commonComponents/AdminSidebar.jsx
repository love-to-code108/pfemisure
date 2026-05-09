"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Users, LogOut } from "lucide-react";
import { createBrowserClient } from '@supabase/ssr';
import { toast } from "sonner";

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Removed Products and Settings from this list!
    const navItems = [
        { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: "Orders & Logistics", href: "/admin/orders", icon: <ShoppingCart className="w-5 h-5" /> },
        { name: "Affiliate Payouts", href: "/admin/affiliates", icon: <Users className="w-5 h-5" /> },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        toast.success("Admin logged out safely.");
        router.push('/home');
    };

    return (
        <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col shrink-0 sticky top-0">
            {/* Header */}
            <div className="h-16 flex items-center px-6 border-b border-gray-800">
                <span className="text-lg font-black tracking-wider text-[#CF2DFF]">PFEMISURE</span>
                <span className="ml-2 text-xs font-bold text-gray-400 uppercase">Admin</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all ${
                                isActive 
                                    ? "bg-[#CF2DFF] text-white shadow-md" 
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Logout */}
            <div className="p-4 border-t border-gray-800">
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg font-medium transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Secure Logout
                </button>
            </div>
        </aside>
    );
}