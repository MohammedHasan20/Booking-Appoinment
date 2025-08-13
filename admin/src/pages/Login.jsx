import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify'; // Ensure this is imported
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken, backendUrl , } = useContext(AdminContext);
    const {setDToken}=useContext(DoctorContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (state === 'Admin') {
                const response = await axios.post(backendUrl + '/api/admin/login', { email, password });
                const data = response.data; // Access data from response

                if (data.success) {
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                    toast.success('Admin login successful!'); // Success message
                    console.log('Admin token:', data.token);
                } else {
                    toast.error(data.message || 'Admin login failed. Please check credentials.'); // Error message from backend
                }
            } else {

                const { data }=await axios.post(backendUrl+"/api/doctor/login",{email,password})

                    if (data.success) {
                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);
                    
                    toast.success('Doctor login successful!'); // Success message
                    console.log('Doctor token:', data.token);
                } else {
                    toast.error(data.message || 'Admin login failed. Please check credentials.'); // Error message from backend
                }


                
               
            }
        } catch (error) {
            // This block handles network errors or errors from the axios request itself
            console.error('Login error:', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // Show error message from backend response
            } else if (error.message) {
                toast.error(`Error: ${error.message}`); // Show generic network error message
            } else {
                toast.error('An unknown error occurred during login.');
            }
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-#5F6FFF'>{state}</span>Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
                </div>

                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
                </div>

                <button type="submit" className='bg-blue-800 text-white w-full py-2 rounded-md text-base'>Login</button>

                {state === "Admin"
                    ? <p>Doctor Login? <span className='text-blue-600 underline cursor-pointer' onClick={() => setState('Doctor')}>Click here </span></p>
                    : <p>Admin Login? <span className='text-blue-600 underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>
        </form>
    );
};

export default Login;