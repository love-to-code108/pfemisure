

const MobileBadge = ({ text }) => {


    return (
        <div suppressHydrationWarning className=" bg-mainColour2 text-white text-sm
        px-[10px] py-[1px] flex items-center rounded-l-full
        h-[20px]
        ">
            <div className="w-[6px] h-[6px] bg-white rounded-full mr-[10px]"></div>
            <p>{text}</p>
        </div>
    )
}

export default MobileBadge