import React from 'react'
import userIcon from '../../Images/usericon.png';








function PasswordResetForm() {
    return (
        <>
          <form action="">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="Password" className='p-color font-semibold'>Password</label>
                            <input type="password" name="" id="" className='border border-gray-500 p-2 rounded-md' placeholder='Enter new password' />
                        </div>


                        <div className="mt-4 flex flex-col gap-1">
                            <label htmlFor="Password" className='p-color font-semibold'>Confirm Password</label>
                            <input type="password" name="" id="" className='border border-gray-500 p-2 rounded-md' placeholder='Confirm new password' />
                        </div>


                        <button type="submit" className='button-bg p-2 mt-4 w-full text-white rounded-md'>Reset Password</button>
                    </form>
</>
    )
}

export default PasswordResetForm;
