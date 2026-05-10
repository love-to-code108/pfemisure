"use client"

import { Ruler } from "lucide-react"; 
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const SizeGuide = () => {
    return (
        <Dialog>
            {/* The Trigger Button */}
            <DialogTrigger asChild>
                <button className="flex items-center text-sm xs:text-lg min-w-[120px] text-gray-500 hover:text-[#CF2DFF] transition-colors mt-2">
                    <Ruler className="mr-[6px] w-5 h-5" />
                    <p className="underline underline-offset-4 font-medium">Size Guide</p>
                </button>
            </DialogTrigger>
            
            {/* The Popup Modal */}
            <DialogContent className="w-[95%] max-w-md rounded-xl p-4 bg-white max-h-[85svh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center mb-1 text-gray-800">
                        Size Chart
                    </DialogTitle>
                </DialogHeader>
                
                {/* The Image */}
                <div className="w-full flex justify-center mt-2">
                    <img 
                        src="https://diwhqxynbnsxewewvxyy.supabase.co/storage/v1/object/public/products/pfemisureMobile/sizeGuidePeriodPanty.jpeg" 
                        alt="Period Panty Size Guide" 
                        className="w-full h-auto rounded-lg object-contain border border-gray-100 shadow-sm"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SizeGuide;