export default function ProductSkeleton() {


    return (
        <div className="flex flex-col justify-center  items-center xs:max-w-[360px] w-full mb-[100px] animate-pulse
        
        px-[10px]">
            {/* Image Placeholder */}
            <div className="w-full aspect-square bg-gray-200 rounded-2xl mb-4"></div>
            
            {/* Badge Placeholder */}
            <div className="w-full flex justify-end mb-2">
                <div className="w-24 h-6 bg-purple-100 rounded-full"></div>
            </div>
            
            {/* Title Placeholder */}
            <div className="w-full flex justify-start mb-4">
                <div className="w-3/4 h-8 bg-gray-200 rounded-md"></div>
            </div>
            
            {/* Paragraph Placeholder */}
            <div className="w-full space-y-2 mb-6">
                <div className="w-full h-4 bg-gray-100 rounded-md"></div>
                <div className="w-5/6 h-4 bg-gray-100 rounded-md"></div>
                <div className="w-4/6 h-4 bg-gray-100 rounded-md"></div>
            </div>
            
            {/* Price Placeholder */}
            <div className="w-full mb-6">
                <div className="w-32 h-10 bg-purple-50 rounded-md"></div>
            </div>
            
            {/* Sizes Placeholder */}
            <div className="w-full space-y-2 mb-6">
                <div className="w-16 h-5 bg-gray-200 rounded-md"></div>
                <div className="flex gap-2">
                    <div className="w-12 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-12 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-12 h-10 bg-gray-200 rounded-full"></div>
                </div>
            </div>
            
            {/* Quantity Placeholder */}
            <div className="w-full mb-6 flex justify-start">
                <div className="w-32 h-10 bg-gray-200 rounded-full"></div>
            </div>
            
            {/* Buttons Placeholder */}
            <div className="w-full flex gap-3">
                <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
            </div>
        </div>
    );
}