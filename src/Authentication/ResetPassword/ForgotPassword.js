import React from 'react'
import userIcon from '../../Images/usericon.png';
import { NavLink } from "react-router-dom";
import ForgotPasswordForm from "./ForgetPasswordForm";

function ForgotPassword() {
    return (
        <div className='w-full bg-white  flex justify-center items-center h-screen'>

            <div className="flex flex-col w-3/12 justify-center shad">
                <div className="p-6 bg-top relative">
                    <h4>Reset Password</h4>
                    <p>Re-Password with Estate Management.</p>

                    <img src={userIcon} alt="" className=' w-12 h-12 absolute top-24' />
                </div>
                <div className="bg-white p-6">
                    <p className='p-bg-color text-xx font-medium text-center p-color p-2 mt-12 rounded-md'>
                    Enter your Email and instructions will be sent to you!
                    </p>
                    <ForgotPasswordForm/>

                </div>

            </div>
        </div>
    )
}

export default ForgotPassword
