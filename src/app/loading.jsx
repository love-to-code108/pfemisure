import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm z-[9999]">
            <div className="p-8 flex flex-col items-center ">
                <div className="relative flex items-center justify-center w-16 h-16 mb-1 bg-purple-50 rounded-full">
                    <Loader2 className="w-8 h-8 text-[#CF2DFF] animate-spin" />
                </div>
                <p className="text-sm font-black text-gray-800 uppercase tracking-widest">
                    Loading
                </p>
                
            </div>
        </div>
    );
}