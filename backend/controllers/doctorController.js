// import doctorModel from "../models/doctorsModel.js"

// const changeAvailablity =async(req,res)=>{
//     try {

//         const {docId}=req.body

//         const docData =await doctorModel.findById(docId)
//         await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
//         res.json({success:true,message:'Availablity Changed'})


//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})

//     }
// }

// export {changeAvailablity}


import doctorModel from "../models/doctorsModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

const changeAvailablity = async (req, res) => {
    try {
        const { docId, avaiable } = req.body; // take the value from frontend
        await doctorModel.findByIdAndUpdate(docId, { avaiable });
        res.json({ success: true, message: 'Availablity Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}

// API for doctor login 

const loginDoctor = async (req, res) => {
    try {

        const { email, password } = req.body

        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {

            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)

            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "Invalid credentials" })


        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}

// API to get doctor appointments for doctor panel


const appointmentsDoctors = async (req, res) => {
    try {
        const docId = req.user.id;

        // ✅ Corrected: Use .populate() to get patient and doctor data
        const appointments = await appointmentModel.find({ docId })
            .populate('userId', 'name image dob')
            .populate('docId', 'name image');

        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API to mark appointment completed for doctor panel


const appointmentComplete = async (req, res) => {
    try {
        // Assume an authentication middleware has set req.docId from the token
        const docId = req.user.id; // Corrected: Get ID from req.user.id
        const { appointmentId } = req.body;

        if (!docId || !appointmentId) {
            return res.json({ success: false, message: "Missing required data" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId.toString() === docId.toString()) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: "Appointment Completed" });
        } else {
            return res.json({ success: false, message: "Mark Failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const appointmentCancel = async (req, res) => {
    try {
        const docId = req.user.id; // Corrected: Get docId from req.user.id
        const { appointmentId } = req.body;

        if (!docId || !appointmentId) {
            return res.json({ success: false, message: "Missing required data" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId.toString() === docId.toString()) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: "Appointment Cancelled" });
        } else {
            return res.json({ success: false, message: "Cancellation Failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Api to dashboard data for doctor panel

const doctorDashboard=async(req,res)=>{
    try {
        

        const docId = req.user.id;
        const appointments =await appointmentModel.find({docId})

        let earnings=0

        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings+= item.amount
            }
        })
        let patients=[]

        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData={
            earnings,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//API to create the doctor profile c
// Corrected doctorProfile function
const doctorProfile = async (req, res) => {
    try {
        const docId = req.user.id; // Correctly get docId from the authenticated user
        const profileData = await doctorModel.findById(docId).select('-password');
        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Corrected updateDoctorProfile function
const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.user.id; // Correctly get docId from the authenticated user
        const { fees, address, avaiable } = req.body;
        await doctorModel.findByIdAndUpdate(docId, { fees, address, avaiable });
        res.json({ success: true, message: "Profile updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { changeAvailablity, doctorList, loginDoctor, appointmentsDoctors, appointmentCancel, appointmentComplete  ,doctorDashboard
     ,updateDoctorProfile, doctorProfile};
