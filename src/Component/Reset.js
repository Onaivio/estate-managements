import React from 'react'


import mark from '../Images/mark.png';
import { NavLink } from "react-router-dom";

function Reset() {
    return (
        <div className='w-full bg-gray-100  flex flex-col justify-center items-center h-screen'>

            <div className="flex flex-col w-3/12 justify-center items-center bg-white p-6">

                <div className="rounded-full w-16 h-16 bg-gray-300 ">
                    <img src={mark} alt="" />
                </div>

                <div className="mt-4 text-center">
                    <h4 className='p-color'>Success!</h4>

                    <p className='p-color text-xs'>You have successfully reset your password
                        sign in to continue to dashboard</p>


                    <button type="submit" className='button-bg p-2 mt-4 w-6/12 text-white rounded-md'>Back to Sign In</button>

                </div>

            </div>


        </div>

    )
}

export default Reset