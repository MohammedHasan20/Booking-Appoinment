import React from 'react'
import groupprofile from '../assets/assets_frontend/group_profiles.png'
import arrowicon from '../assets/assets_frontend/arrow_icon.svg'
import headerimg from '../assets/assets_frontend/header_img.png'


const Header = () => {
    return (
        <>
            <div className='flex flex-col md:flex-row flex-wrap  rounded-lg px-6 md:px-10 lg:px-20' style={{backgroundColor:'#5f6fff'}}>
                {/*------------------Left side ------------------ */}
                <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                    <p className=' text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                        Book Appointment <br />With Trusted Doctors
                    </p>
                    <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                        <img src={groupprofile} alt="" className='w-28' />
                        <p>Simply browse through our extensive list of trusted doctors,<br  className='hidden sm:block'/> Schedule your appointment hassele-free</p>
                    </div>
                    <a href="#speciality" className='flex items-center gap-2 bg-white px-8  py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                        Book appointment <img src={arrowicon} alt=""  className='w-3'/>
                    </a>

                </div>
                {/*------------------Right side ------------------ */}
                <div className='md:w-1/2 relative'>
                    <img src={headerimg} alt=""  className='w-full md:absolute bottom-0 h-auto rounded-lg'/>

                </div>
            </div>
        </>
    )
}

export default Header
