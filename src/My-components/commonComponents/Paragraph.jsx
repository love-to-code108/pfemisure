

const Paragraph = ({ children,className }) => {



    return (
        <p className={`
        text-lg text-darkGrey leading-[20px] mb-[30px]
        
        ${className}`}>
            {children}
        </p>
    )
}


export default Paragraph