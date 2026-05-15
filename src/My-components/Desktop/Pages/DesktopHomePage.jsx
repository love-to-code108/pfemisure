import DesktopNavbar from "../DesktopComponents/desktopNavbar";



const DesktopHomePage = () => {



    return (
        <div>


            {/* navbar */}
            <DesktopNavbar />


            {/* page under development */}
            <div className=" w-full h-[90vh] flex flex-col justify-center items-center">
                <h1 className="text-2xl mb-[30px] font">Website Under Development</h1>
                <div className=" p-2 bg-accent rounded-md mb-4">
                    <img src="/qrcodeToGoToMobile.svg" alt="" />
                </div>
                <h1 className="">Scan QR Code to open in mobile</h1>
            </div>
        </div>
    )
}


export default DesktopHomePage;