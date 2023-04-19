import React from 'react'

import mail_icon from '../Images/mail_icon.png';
import { NavLink } from "react-router-dom";

function EmailSent() {
    return (
        <div className='w-full bg-gray-100  flex flex-col justify-center items-center h-screen'>

            <div className="flex flex-col w-3/12 justify-center items-center bg-white p-6">

                <div className="rounded-full w-16 h-16 bg-gray-300 ">
                    <img src={mail_icon} alt="" />
                </div>

                <div className="mt-4 text-center">
                    <h4 className='p-color'>Email Sent!</h4>

                    <p className='p-color text-xs'>An email with instruction to reset your password as been sent to your registered email address</p>


                    <button type="submit" className='button-bg p-2 mt-4 w-6/12 text-white rounded-md'>Back to Sign In</button>

                </div>

            </div>

            <span className='flex justify-center item-center gap-1 mt-3'>
                            <p className='p-color text-xs font-normal'>Didn't receive an email ?  </p>

                            <NavLink className="color-theme  text-xs font-normal" exact to="/login"> Resend</NavLink>
                        </span>
        </div>

    )
}

export default EmailSent