// import React, { useContext, useEffect } from 'react';
// import { AdminContext } from '../../context/AdminContext';

// const DoctorsList = () => {
//   const { doctors, aToken, getAllDoctors, changeAvaiablity } = useContext(AdminContext);

//   useEffect(() => {
//     // Only fetch doctors if an authentication token is available
//     if (aToken) {
//       getAllDoctors();
//     }
//   }, [aToken, getAllDoctors]); // Dependency array: re-run effect if aToken or getAllDoctors changes

//   return (
//     <div className='p-5 w-full'>
//       <h1 className='text-2xl font-bold mb-6'>All Doctors</h1>
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
//         {
//           doctors.length > 0 ? (
//             doctors.map((item, index) => {
//               return (
//                 <div 
//                   key={index} 
//                   className='bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center 
//                              hover:bg-sky-100 transition-colors duration-200 cursor-pointer' 
//                 >
//                   <img 
//                     src={item.image} 
//                     alt={item.name || "Doctor Image"} 
//                     className='w-24 h-24 object-cover rounded-full mb-4 border-2 border-blue-300' 
//                     // Add an onerror handler for broken image links
//                     onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/96x96/cccccc/333333?text=No+Image"; }}
//                   />
//                   <h3 className='font-semibold text-lg text-gray-800'>{item.name}</h3>
//                   <p className='text-sm text-gray-600'>{item.speciality}</p>
//                   <div className='flex items-center gap-2 mt-2'>
//                     {/* *** FIXES APPLIED HERE *** */}
//                     {/* 1. Corrected 'avaiable' to 'available' for proper data binding. */}
//                     {/* 2. REMOVED the 'readOnly' attribute to allow user interaction. */}
//                     <input 
//                         onChange={(e) => changeAvaiablity(item._id, e.target.checked)}
//                         type="checkbox" 
//                         checked={item.avaiable} // Corrected typo here
//                         // 'readOnly' attribute has been removed
//                         className="form-checkbox h-4 w-4 text-blue-600 rounded cursor-pointer" 
//                     />
//                     {/* Also corrected the 'Avaliable' typo in the paragraph for consistency */}
//                     <p className='text-sm text-gray-700'>Available</p>
//                   </div>
//                   <p className='text-sm text-gray-500 mt-1'>Exp: {item.experience}</p>
//                   <p className='text-sm text-gray-500'>Fees: ₹{item.fees}</p>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="col-span-full text-center text-gray-500">Loading doctors or no doctors found...</p>
//           )
//         }
//       </div>
//     </div>
//   );
// };

// export default DoctorsList;


import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvaiablity } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  return (
    <div className='p-5 w-full'>
      <h1 className='text-2xl font-bold mb-6'>All Doctors</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {
          doctors.length > 0 ? (
            doctors.map((item, index) => (
              <div 
                key={index} 
                className='bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center 
                           hover:bg-sky-100 transition-colors duration-200 cursor-pointer' 
              >
                <img 
                  src={item.image} 
                  alt={item.name || "Doctor Image"} 
                  className='w-24 h-24 object-cover rounded-full mb-4 border-2 border-blue-300' 
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/96x96/cccccc/333333?text=No+Image"; }}
                />
                <h3 className='font-semibold text-lg text-gray-800'>{item.name}</h3>
                <p className='text-sm text-gray-600'>{item.speciality}</p>
                <div className='flex items-center gap-2 mt-2'>
                  <input 
                      onChange={(e) => changeAvaiablity(item._id, e.target.checked)}
                      type="checkbox" 
                      checked={item.avaiable} 
                      className="form-checkbox h-4 w-4 text-blue-600 rounded cursor-pointer" 
                  />
                  <p className='text-sm text-gray-700'>Available</p>
                </div>
                <p className='text-sm text-gray-500 mt-1'>Exp: {item.experience}</p>
                <p className='text-sm text-gray-500'>Fees: ₹{item.fees}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Loading doctors or no doctors found...</p>
          )
        }
      </div>
    </div>
  );
};

export default DoctorsList;

