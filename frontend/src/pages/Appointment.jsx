// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets_frontend/assets';
// import RelatedDoctors from '../components/RelatedDoctors';

// const Appointment = () => {
//     // Get the doctor ID from the URL parameters
//     const { docId } = useParams();
//     // Access the 'doctors' array and 'currencySymbol' from the global AppContext
//     const { doctors, currencySymbol ,backendUrl,token ,  getDoctorsData } = useContext(AppContext);
//     // Array of day names for displaying slots
//     const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

//     const navigate= useNavigate()

//     // State to store the information of the selected doctor
//     const [docInfo, setDocInfo] = useState(null);
//     // State to store the available time slots for the doctor
//     const [docSlots, setDocSlots] = useState([]);
//     // State to track the currently selected day index for slots
//     const [selectedDayIndex, setSelectedDayIndex] = useState(0);
//     // State to track the currently selected time slot ID
//     const [selectedSlotId, setSelectedSlotId] = useState(null);
//     // State to manage loading status of the doctor information
//     const [isLoading, setIsLoading] = useState(true);

//     // Function to fetch the doctor's information based on docId
//     const fetchDocInfo = () => {
//         // Find the doctor in the 'doctors' array that matches the docId
//         const foundDoc = doctors.find(doc => doc._id === docId);
//         setDocInfo(foundDoc); // Update the docInfo state
//         setIsLoading(false); // Set loading to false once doctor info is found or not found
//     };

//     // Function to generate available time slots for the next 7 days
//     const getAvailabelSlots = () => {
//         const allDaysSlots = [];
//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // Reset time to start of the day for accurate date comparison

//         for (let i = 0; i < 7; i++) {
//             let currentDay = new Date(today);
//             currentDay.setDate(today.getDate() + i); // Set current day for iteration

//             let endtime = new Date(currentDay);
//             endtime.setHours(21, 0, 0, 0); // Set end time to 9 PM for slots

//             let currentDate = new Date(currentDay);

//             // Adjust start time for the current day to be from the current time onwards
//             if (currentDay.getDate() === new Date().getDate() && currentDay.getMonth() === new Date().getMonth() && currentDay.getFullYear() === new Date().getFullYear()) {
//                 currentDate = new Date(); // Use current time for today
//                 const minutes = currentDate.getMinutes();
//                 // Round up to the next half hour
//                 if (minutes > 30) {
//                     currentDate.setMinutes(0);
//                     currentDate.setHours(currentDate.getHours() + 1);
//                 } else {
//                     currentDate.setMinutes(30);
//                 }
//                 // Ensure start time is not before 10 AM, even for today
//                 if (currentDate.getHours() < 10) {
//                     currentDate.setHours(10, 0, 0, 0);
//                 }
//             } else {
//                 // For future days, start slots from 10 AM
//                 currentDate.setHours(10, 0, 0, 0);
//             }

//             const timeSlotsForDay = [];
//             // Generate 30-minute time slots until the end time
//             while (currentDate < endtime) {
//                 const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
//                 timeSlotsForDay.push({
//                     datetime: new Date(currentDate), // Store full datetime object
//                     time: formattedTime, // Formatted string for display
//                     id: `${i}-${currentDate.getTime()}` // Unique ID for each slot
//                 });
//                 currentDate.setMinutes(currentDate.getMinutes() + 30); // Move to next 30-minute interval
//             }

//             // Only add days that have available slots
//             if (timeSlotsForDay.length > 0) {
//                 allDaysSlots.push({
//                     dayName: daysOfWeek[currentDay.getDay()], // Day name (e.g., SUN, MON)
//                     date: currentDay.getDate(), // Day of the month
//                     slots: timeSlotsForDay // Array of time slots for this day
//                 });
//             }
//         }
//         setDocSlots(allDaysSlots); // Update the docSlots state
//     };

//     // Effect to fetch doctor info when 'doctors' data or 'docId' changes
//     useEffect(() => {
//         if (doctors.length > 0 && docId) {
//             fetchDocInfo();
//         }
//     }, [doctors, docId]);

//     // Effect to get available slots once doctor info is loaded
//     useEffect(() => {
//         if (docInfo) {
//             getAvailabelSlots();
//         }
//     }, [docInfo]); // Re-run when docInfo changes

//     // Effect to set the first available day as selected when slots are loaded
//     useEffect(() => {
//         if (docSlots.length > 0) {
//             setSelectedDayIndex(0);
//         }
//     }, [docSlots]); // Re-run when docSlots changes

//     // Display loading message while doctor info is being fetched
//     if (isLoading || !docInfo) {
//         return (
//             <div className='flex justify-center items-center h-screen'>
//                 <p className='text-xl text-gray-600'>Loading doctor information...</p>
//             </div>
//         );
//     }

//     // Handler for clicking on a day to select it
//     const handleDayClick = (index) => {
//         setSelectedDayIndex(index);
//         setSelectedSlotId(null); // Reset time slot selection when a new day is chosen
//     };

//     // Handler for clicking on a time slot to select it
//     const handleSlotClick = (slotId) => {
//         setSelectedSlotId(slotId);
//     };

//     // Get the slots for the currently selected day
//     const selectedDaySlots = docSlots[selectedDayIndex] ? docSlots[selectedDayIndex].slots : [];

//     const bookAppointment = async()=>{
//         toast.warn("Login To book appointment")
//         return navigate('/login')
//     }

//     return (
//         <>
//             <div className='flex flex-col sm:flex-row gap-8 items-start p-4 sm:p-8'>
//                 {/* Doctor Image Section */}
//                 <div className='w-full sm:w-1/3'>
//                     <img className='w-full rounded-lg shadow-md' src={docInfo.image} alt={docInfo.name} />
//                 </div>

//                 {/* Doctor Details and Booking Section */}
//                 <div className='flex-1 border border-gray-200 rounded-lg p-6 py-7 bg-white shadow-lg w-full'>
//                     <div className='flex items-center justify-between mb-2'>
//                         <p className='flex items-center gap-2 text-2xl font-semibold text-gray-900'>
//                             {docInfo.name} <img className='w-5' src={assets.verified_icon} alt='Verified' />
//                         </p>
//                     </div>

//                     <div className='flex flex-wrap items-center gap-2 text-sm mt-1 text-gray-600'>
//                         <p>{docInfo.degree} - {docInfo.speciality}</p>
//                         <button className='py-0.5 px-2 border border-gray-300 text-xs rounded-full bg-gray-50 text-gray-700'>
//                             {docInfo.experience}
//                         </button>
//                     </div>

//                     <div className='mt-4'>
//                         <div className='flex items-center gap-1 text-base font-medium text-gray-900'>
//                             <p>About</p>
//                             <img src={assets.info_icon} alt='Info' className='w-4 h-4' />
//                         </div>
//                         <p className='text-sm text-gray-500 max-w-[700px] mt-1 leading-relaxed'>{docInfo.about}</p>
//                     </div>

//                     <p className='text-lg font-semibold text-gray-900 mt-6'>
//                         Appointment Fee: <span className='text-blue-600'>{currencySymbol}{docInfo.fees}</span>
//                     </p>

//                     {/* Booking Slots Section */}
//                     <div className='mt-8 font-medium text-gray-700'>
//                         <p className='text-xl font-bold mb-4'>Booking Slots</p>
//                         {/* Day Selection */}
//                         <div className='flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide'>
//                             {docSlots.length > 0 ? docSlots.map((day, index) => (
//                                 <div
//                                     key={index}
//                                     className={`flex-shrink-0 w-20 h-20 flex flex-col items-center justify-center rounded-full cursor-pointer transition-all duration-300 ease-in-out
//                                         ${index === selectedDayIndex ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                                     onClick={() => handleDayClick(index)}
//                                 >
//                                     <p className='text-sm font-bold'>{day.dayName}</p>
//                                     <p className='text-xl font-bold'>{day.date}</p>
//                                 </div>
//                             )) : (
//                                 <p className='text-gray-500'>No available days for booking.</p>
//                             )}
//                         </div>

//                         {/* Time Slot Selection */}
//                         <div className='mt-6 flex flex-wrap gap-3 overflow-x-auto pb-2 scrollbar-hide'>
//                             {selectedDaySlots.length > 0 ? selectedDaySlots.map((slot) => (
//                                 <div
//                                     key={slot.id}
//                                     className={`flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out text-center
//                                         ${selectedSlotId === slot.id ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
//                                     onClick={() => handleSlotClick(slot.id)}
//                                 >
//                                     <p className='text-sm font-medium'>{slot.time}</p>
//                                 </div>
//                             )) : (
//                                 <p className='text-gray-500'>No available slots for the selected day.</p>
//                             )}
//                         </div>

//                         {/* Book Appointment Button */}
//                         <button
//                             onClick={bookAppointment}
//                             className='mt-8 w-full sm:w-auto px-12 py-3 rounded-full text-white font-semibold transition-colors duration-200 bg-blue-600 hover:bg-blue-700 shadow-md'
//                             disabled={!selectedSlotId} // Disable button if no slot is selected
//                         >
//                             Book Appointment
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Related Doctors Component - Conditionally rendered after docInfo is loaded */}
//             {docInfo && <RelatedDoctors docId={docId} speciality={docInfo.speciality} />}
//         </>
//     );
// };

// export default Appointment;
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const navigate = useNavigate();

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDocInfo = () => {
        const foundDoc = doctors.find(doc => doc._id === docId);
        setDocInfo(foundDoc);
        setIsLoading(false);
    };

    const getAvailabelSlots = () => {
        const allDaysSlots = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const now = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDay = new Date(today);
            currentDay.setDate(today.getDate() + i);

            let endtime = new Date(currentDay);
            endtime.setHours(21, 0, 0, 0);

            let currentDate = new Date(currentDay);

            if (
                currentDay.getDate() === now.getDate() &&
                currentDay.getMonth() === now.getMonth() &&
                currentDay.getFullYear() === now.getFullYear()
            ) {
                if (now.getHours() < 10) {
                    currentDate.setHours(10, 0, 0, 0);
                } else {
                    currentDate = new Date(now);
                    const minutes = currentDate.getMinutes();
                    if (minutes > 30) {
                        currentDate.setMinutes(0);
                        currentDate.setHours(currentDate.getHours() + 1);
                    } else {
                        currentDate.setMinutes(30);
                    }
                }
            } else {
                currentDate.setHours(10, 0, 0, 0);
            }

            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();
            const slotDate = `${day}_${month}_${year}`;

            const timeSlotsForDay = [];
            while (currentDate < endtime) {
                const formattedTime = currentDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });

                // ✅ Filter out booked slots
                const isSlotAvailable = !(
                    docInfo.slots_booked &&
                    docInfo.slots_booked[slotDate] &&
                    docInfo.slots_booked[slotDate].includes(formattedTime)
                );

                if (isSlotAvailable) {
                    timeSlotsForDay.push({
                        datetime: new Date(currentDate),
                        time: formattedTime,
                        id: `${i}-${currentDate.getTime()}`
                    });
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            if (timeSlotsForDay.length > 0) {
                allDaysSlots.push({
                    dayName: daysOfWeek[currentDay.getDay()],
                    date: currentDay.getDate(),
                    slots: timeSlotsForDay
                });
            }
        }
        setDocSlots(allDaysSlots);
    };

    useEffect(() => {
        if (doctors.length > 0 && docId) {
            fetchDocInfo();
        }
    }, [doctors, docId]);

    useEffect(() => {
        if (docInfo) {
            getAvailabelSlots();
        }
    }, [docInfo]);

    useEffect(() => {
        if (docSlots.length > 0) {
            setSelectedDayIndex(0);
        }
    }, [docSlots]);

    if (isLoading || !docInfo) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p className='text-xl text-gray-600'>Loading doctor information...</p>
            </div>
        );
    }

    const handleDayClick = (index) => {
        setSelectedDayIndex(index);
        setSelectedSlotId(null);
    };

    const handleSlotClick = (slotId) => {
        setSelectedSlotId(slotId);
    };

    const selectedDaySlots = docSlots[selectedDayIndex] ? docSlots[selectedDayIndex].slots : [];

    const bookAppointment = async () => {
        if (!token) {
            toast.warn("Login to book appointment");
            return navigate('/login');
        }

        try {
            const selectedSlot = selectedDaySlots.find(slot => slot.id === selectedSlotId);
            if (!selectedSlot) {
                toast.error("Please select a slot");
                return;
            }

            const dateObj = selectedSlot.datetime;

            let day = dateObj.getDate();
            let month = dateObj.getMonth() + 1;
            let year = dateObj.getFullYear();

            const slotDate = `${day}_${month}_${year}`;
            const slotTime = selectedSlot.time;

            const { data } = await axios.post(
                backendUrl + "/api/user/book-appointment",
                { docId, slotDate, slotTime },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                getDoctorsData();
                navigate("/my-appointments");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <div className='flex flex-col sm:flex-row gap-8 items-start p-4 sm:p-8'>
                <div className='w-full sm:w-1/3'>
                    <img className='w-full rounded-lg shadow-md' src={docInfo.image} alt={docInfo.name} />
                </div>

                <div className='flex-1 border border-gray-200 rounded-lg p-6 py-7 bg-white shadow-lg w-full'>
                    <div className='flex items-center justify-between mb-2'>
                        <p className='flex items-center gap-2 text-2xl font-semibold text-gray-900'>
                            {docInfo.name} <img className='w-5' src={assets.verified_icon} alt='Verified' />
                        </p>
                    </div>

                    <div className='flex flex-wrap items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border border-gray-300 text-xs rounded-full bg-gray-50 text-gray-700'>
                            {docInfo.experience}
                        </button>
                    </div>

                    <div className='mt-4'>
                        <div className='flex items-center gap-1 text-base font-medium text-gray-900'>
                            <p>About</p>
                            <img src={assets.info_icon} alt='Info' className='w-4 h-4' />
                        </div>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1 leading-relaxed'>{docInfo.about}</p>
                    </div>

                    <p className='text-lg font-semibold text-gray-900 mt-6'>
                        Appointment Fee: <span className='text-blue-600'>{currencySymbol}{docInfo.fees}</span>
                    </p>

                    <div className='mt-8 font-medium text-gray-700'>
                        <p className='text-xl font-bold mb-4'>Booking Slots</p>
                        <div className='flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide'>
                            {docSlots.length > 0 ? docSlots.map((day, index) => (
                                <div
                                    key={index}
                                    className={`flex-shrink-0 w-20 h-20 flex flex-col items-center justify-center rounded-full cursor-pointer transition-all duration-300 ease-in-out
                                        ${index === selectedDayIndex ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    onClick={() => handleDayClick(index)}
                                >
                                    <p className='text-sm font-bold'>{day.dayName}</p>
                                    <p className='text-xl font-bold'>{day.date}</p>
                                </div>
                            )) : (
                                <p className='text-gray-500'>No available days for booking.</p>
                            )}
                        </div>

                        <div className='mt-6 flex flex-wrap gap-3 overflow-x-auto pb-2 scrollbar-hide'>
                            {selectedDaySlots.length > 0 ? selectedDaySlots.map((slot) => (
                                <div
                                    key={slot.id}
                                    className={`flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out text-center
                                        ${selectedSlotId === slot.id ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                    onClick={() => handleSlotClick(slot.id)}
                                >
                                    <p className='text-sm font-medium'>{slot.time}</p>
                                </div>
                            )) : (
                                <p className='text-gray-500'>No available slots for the selected day.</p>
                            )}
                        </div>

                        <button
                            onClick={bookAppointment}
                            className='mt-8 w-full sm:w-auto px-12 py-3 rounded-full text-white font-semibold transition-colors duration-200 bg-blue-600 hover:bg-blue-700 shadow-md'
                            disabled={!selectedSlotId}
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>

            {docInfo && <RelatedDoctors docId={docId} speciality={docInfo.speciality} />}
        </>
    );
};

export default Appointment;
