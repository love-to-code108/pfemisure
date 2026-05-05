

const Paragraph = ({ children,className }) => {



    return (
        <p className={`
         text-darkGrey leading-[20px] mb-[30px]
        
        ${className}`}>
            {children}
        </p>
    )
}


export default Paragraph