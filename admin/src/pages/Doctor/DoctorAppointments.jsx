// import React, { useEffect, useContext } from 'react';
// import { DoctorContext } from '../../context/DoctorContext';
// import { AppContext } from '../../context/AppContext';
// import { assets } from '../../assets/assets';

// const DoctorAppointments = () => {
//     const { dToken, appointments, getAppointments, backendUrl,completeAppointment,cancelAppointment } = useContext(DoctorContext);
//     const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

//     useEffect(() => {
//         if (dToken) {
//             getAppointments();
//         }
//     }, [dToken]);

//     return (
//         <div className='w-full max-w-6xl m-5'>
//             <p className='mb-3 text-lg font-medium'>All Appointments</p>

//             <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
//                 {/* Header Row: Defines the grid columns */}
//                 <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b'>
//                     <p>#</p>
//                     <p>Patient</p>
//                     <p>Age</p>
//                     <p>Date & Time</p>
//                     <p>Doctor</p>
//                     <p>Fees</p>
//                     <p>Actions</p>
//                 </div>

//                 {appointments.map((item, index) => {
//                     return (
//                         // ✅ Corrected: Use the same grid classes for alignment
//                         <div key={index} className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b items-center">
//                             <p>{index + 1}</p>

//                             {/* Patient Info with Image */}
//                             <div className="flex items-center gap-2">
//                                 <img
//                                     src={
//                                         item.userData?.image && item.userData.image.startsWith('http')
//                                             ? item.userData.image
//                                             : `${backendUrl}/images/${item.userData?.image}`
//                                     }
//                                     alt={item.userData?.name || "No Name"}
//                                     className="w-8 h-8 rounded-full object-cover"
//                                 />
//                                 <p>{item.userData?.name}</p>
//                             </div>

//                             {/* Age, Date, Time, Doctor Info, and Fees */}
//                             <p className='max-sm:hidden'>{item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}</p>
//                             <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

//                             <div className='flex items-center gap-2'>
//                                 <img className='w-8 rounded-full' src={item.docData?.image} alt="" />
//                                 <p>{item.docData?.name}</p>
//                             </div>

//                             <p>{currency}{item.amount}</p>

//                             {/* Action Buttons */}
//                             <div className='flex gap-2 items-center'>
//                                 <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="Cancel" />
//                                 <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="Tick" />
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default DoctorAppointments;
// In a file like `DoctorAppointments.jsx`
import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
    const { dToken, appointments, getAppointments, backendUrl, completeAppointment, cancelAppointment } = useContext(DoctorContext);
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

    useEffect(() => {
        if (dToken) {
            getAppointments();
        }
    }, [dToken]);

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>

            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
                {/* Header Row: Defines the grid columns */}
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>

                {appointments.reverse().map((item, index) => {
                    return (
                        <div key={index} className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b items-center">
                            <p>{index + 1}</p>

                            {/* Patient Info with Image */}
                            <div className="flex items-center gap-2">
                                <img
                                    src={
                                        item.userData?.image && item.userData.image.startsWith('http')
                                            ? item.userData.image
                                            : `${backendUrl}/images/${item.userData?.image}`
                                    }
                                    alt={item.userData?.name || "No Name"}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <p>{item.userData?.name}</p>
                            </div>

                            {/* Age, Date, Time, Doctor Info, and Fees */}
                            <p className='max-sm:hidden'>{item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}</p>
                            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

                            <div className='flex items-center gap-2'>
                                <img className='w-8 rounded-full' src={item.docData?.image} alt="" />
                                <p>{item.docData?.name}</p>
                            </div>

                            <p>{currency}{item.amount}</p>
                            {
                                item.cancelled ?
                                    <p className='text-red-500 text-s font-medium'>cancelled</p>
                                    : item.isCompleted
                                        ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                                        : <div className='flex gap-2 items-center'>

                                            <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="Cancel" />
                                            <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="Tick" />
                                        </div>
                            }

                            {/* Action Buttons */}

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DoctorAppointments;