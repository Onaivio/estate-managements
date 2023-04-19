import React from 'react'
import userIcon from '../../Images/usericon.png';
import { NavLink } from "react-router-dom";

function ForgotPasswordForm() {
    return (
        <>
         <form action="">
                        <div className="flex flex-col mt-6">
                            <label htmlFor="email" className='p-color text-xs font-semibold'>Email Address</label>
                            <input type="email" name="" id="" className='border border-gray-500 p-2 rounded-md mt-2' placeholder='Email Address' />
                        </div>





                        <button type="submit" className='button-bg p-2 mt-6 w-full text-white rounded-md font-medium'>Reset Password</button>


                        <span className='flex justify-center item-center gap-1 mt-3'>
                            <p className='p-color text-xs font-normal'>Remember It ? </p>
                            <NavLink className="color-theme text-xs font-normal" exact to="/login"> Sign In here</NavLink>
                        </span>
                    </form>
                </>
    )
}

export default ForgotPasswordForm;
