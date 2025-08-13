// import { createContext, useState } from "react";
// import axios from 'axios'
// import { toast } from 'react-toastify'


// export const AdminContext = createContext();

// const AdminContextProvider = (props) => {

//     const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "")

//     const [doctors, setDoctors] = useState([])

//     const backendUrl = import.meta.env.VITE_BACKEND_URL;

//     const getAllDoctors = async () => {
//         try {
//             const response = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } })
//             const data = response.data; // Extract the data from the Axios response

//             // --- IMPORTANT DEBUGGING LINE ---
//             // console.log("Full backend response data for all-doctors:", data);
//             // --------------------------------

//             if (data.success) {
//                 // *** FIX APPLIED HERE: Accessing 'docotrs' instead of 'doctors' ***
//                 setDoctors(data.docotrs);
//                 // console.log("Doctors data array (after fix):", data.docotrs);

//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message)

//         }
//     }

//    const changeAvaiablity = async(docId)=>{ 
//     try {
//         // Now 'docId' is correctly available from the function's parameters
//         const response =await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}})
//         const data  =response.data
//         console.log(data)

//         if(data.success){
//             toast.success(data.message)
//             getAllDoctors() // Re-fetch doctors to update the UI
//         }else{
//             toast.error(data.message)
//         }
//     } catch (error) {
//         console.error("Error changing availability:", error); // Log the detailed error
//         toast.error(error.message)
        
//     }
// }

// // const changeAvaiablity= async()=>{
// //     try {

// //         const {data }=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}})

// //         if(data.success){
// //             toast.success(error.message)
// //             getAllDoctors()
// //         }else{
// //             toast.error(data.message)

// //         }
// //     } catch (error) {
// //         toast.error(error.message)
// //     }
// // }



//     const value = {
//         aToken, setAToken,
//         backendUrl,
//         doctors,
//         getAllDoctors,
//         changeAvaiablity,

//     }
//     return (
//         <AdminContext.Provider value={value}>
//             {props.children}

//         </AdminContext.Provider>
//     )
// }

// export default AdminContextProvider;











import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments]=useState([])

    const [dashData,setDashData]=useState(false)



    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } });
            const data = response.data;

            if (data.success) {
                setDoctors(data.docotrs); // keep your spelling
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const changeAvaiablity = async (docId, value) => { 
        try {
            const response = await axios.post(
                backendUrl + '/api/admin/change-availability',
                { docId, avaiable: value }, // send actual value from checkbox
                { headers: { aToken } }
            );
            const data = response.data;

            if (data.success) {
                toast.success(data.message);
                setDoctors((prev) =>
                    prev.map((doc) =>
                        doc._id === docId ? { ...doc, avaiable: value } : doc
                    )
                );
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error changing availability:", error);
            toast.error(error.message);
        }
    };


   const getAllAppointments = async () => {
    try {
        const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
            headers: { aToken }
        });

        console.log("📦 API Response:", data);

        if (data.success) {
            setAppointments(data.appointments);
            console.log("✅ Appointments:", data.appointments);
        } else {
            toast.error(data.message);
        }

    } catch (error) {
        console.error("❌ API Error:", error);
        toast.error(error.message);
    }
};

const cancelAppointment = async(appointmentId)=>{
    try {
        

        const { data }= await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})

        if(data.success){
            toast.success(data.message)
            getAllAppointments()
        }else{
            toast.error(data.message)
        }
    } catch (error) {
         toast.error(error.message);

        
    }
}

const getDashData=async()=>{
    try {
       const { data }= await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}})
       
       if(data.success){
        setDashData(data.dashData)
        console.log(data.dashData);
        
       }else{
        toast.error(data.message)
       }
    } catch (error) {
        toast.error(error.message);
        
    }
}


    const value = {
        aToken, setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvaiablity,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
