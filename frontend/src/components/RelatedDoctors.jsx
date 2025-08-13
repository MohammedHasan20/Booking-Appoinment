import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
    // Access the 'doctors' array from the global AppContext
    const { doctors } = useContext(AppContext);
    // Initialize the navigate function for programmatic navigation
    const navigate = useNavigate();

    // State to store the filtered related doctors
    const [relDoc, setRelDoc] = useState([]);
    // State to manage loading status
    const [isLoading, setIsLoading] = useState(true);

    // useEffect hook to filter doctors whenever 'doctors', 'speciality', or 'docId' changes
    useEffect(() => {
        // Check if doctors data is available and speciality is provided
        if (doctors.length > 0 && speciality) {
            // Filter doctors:
            // 1. Match the 'speciality'
            // 2. Exclude the current doctor using 'docId'
            const doctorsData = doctors.filter(
                (doc) => doc.speciality === speciality && doc._id !== docId
            );
            setRelDoc(doctorsData); // Update the state with filtered doctors
            setIsLoading(false); // Set loading to false once data is processed
        } else if (doctors.length === 0) {
            // If the main 'doctors' array is empty, set loading to false as there's nothing to load
            setIsLoading(false);
        }
    }, [doctors, speciality, docId]); // Dependencies for the useEffect hook

    // Function to handle the "More Doctors" button click
    const handleMoreDoctorsClick = () => {
        navigate('/doctors'); // Navigate to the doctors listing page
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    // Show a loading message while data is being fetched or processed
    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-48'>
                <p className='text-gray-600'>Loading related doctors...</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-bold'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            {/* Conditional rendering: Show message if no related doctors are found */}
            {relDoc.length === 0 ? (
                <div className='text-center text-gray-600 mt-8'>
                    <p>No other doctors found in this specialty.</p>
                    <p>Please check back later or explore other specialties.</p>
                </div>
            ) : (
                // Render the grid of related doctors if 'relDoc' is not empty
                <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                    {/* Slice to show only the first 5 related doctors */}
                    {relDoc.slice(0, 5).map((item, index) => (
                        <div
                            // Navigate to the appointment page for the clicked doctor
                            onClick={() => navigate(`/appointment/${item._id}`)}
                            key={index}
                            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                        >
                            <img
                                className='bg-blue-50 w-full h-48 object-cover'
                                // Use item.image or a placeholder if image is not available
                                src={item.image || 'https://placehold.co/400x300/E0F2F7/000000?text=No+Image'}
                                alt={item.name}
                            />
                            <div className='p-4'>
                                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                    <p>Available</p>
                                </div>
                                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                <p className='text-gray-600 text-sm'>{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Button to navigate to the full list of doctors */}
            <button
                onClick={handleMoreDoctorsClick}
                className='mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-200'
            >
                More Doctors
            </button>
        </div>
    );
};

export default RelatedDoctors;
