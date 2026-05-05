

const PurpleBadges = ({children,className}) => {



    return(
        <div className={` bg-mainColour2 px-3 text-white rounded-full text-sm my-1
        
        ${className}`}>
            <p>{children}</p>
        </div>
    )
}

export default PurpleBadges