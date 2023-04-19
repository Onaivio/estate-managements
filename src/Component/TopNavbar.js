

import { Fragment, useState,useRef, useEffect } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import { render } from "react-dom";

import photo from '../Images/photo.png';


import { Dialog, Menu, Transition, Tab } from '@headlessui/react';

import { RiNotificationLine, RiDashboardLine, RiKeyLine, RiUserLine, RiSecurePaymentLine, RiCalendarLine, RiShape2Line, RiSearch2Line } from 'react-icons/ri';

// @ts-ignore
import reqwest from "reqwest";
import Dashboard from '../Modules/Admin/Dashboard/Dashboard';


import "antd/dist/antd.css";

import usericon from '../Images/usericon.png';
import notif from '../Images/notif.png';

function TopNavbar(props) {
    const { user } = props
    let [editProfileOpen, setEditProfileOpen] = useState(false)
    let [changePasswordOpen, setChangePasswordOpen] = useState(false)
    const [image, setImage] = useState()



    function openEditProfileModal(e) {
        e.preventDefault()
    
        setEditProfileOpen(true)
    
      }


      function openChangePasswordModal(e) {
        e.preventDefault()
    
        setChangePasswordOpen(true)
    
      }


      function closeModal() {
      
        setEditProfileOpen(false)
        setChangePasswordOpen(false)
        
    }

   
    const fileInputRef = useRef()



    return (
        <>


<Transition appear show={editProfileOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-3xl border border-gray-100">
                                <Dialog.Title
                                    as="h3"
                                    className="text-base font-medium leading-6 text-gray-900"
                                >
                                 Edit Profile

                                </Dialog.Title>
                                <div className="w-12 h-12 bg-gray-300">
                  <img src={photo} alt=""
                  className="cursor-pointer"
                                        onClick={(event) => {
                            event.preventDefault()
                            fileInputRef.current.click()
                        }}
                   />


                   
<input
                                        type="file"
                                        style={{ display: 'none' }}
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.target.files[0]
                                            if (file) {
                                                setImage(file)
                                            }
                                            else {
                                                setImage(null)
                                            }
                                        }} />
                </div>


                               
                                <div className="mt-4">
                                    <form action="">
                                        <div className="flex gap-2 mt-4">
                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">First Name</label>
                                                <input type="text" name="" id="" 
                                                className="border border-gray-200 p-1 focus:outline-none rounded-sm" 
                                                placeholder="First Name" />
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Last Name</label>
                                                <input type="text" name="" id="" 
                                                className="border border-gray-200 p-1 focus:outline-none rounded-sm" 
                                                placeholder="Last Name" />
                                            </div>



                                        </div>

                                        <div className="flex gap-2 mt-4">
                                            <div className="flex flex-col w-1/2">
                                            <label htmlFor="" className="text-xs mb-1">Email Address</label>

                                                <input 
                                                type="text" 
                                                name="" id="" 
                                                className="border border-gray-200 p-1 focus:outline-none rounded-sm" 
                                                placeholder="Email Address" />
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                            <label htmlFor="" className="text-xs mb-1">Phone Number</label>

                                                <input type="text" name="" id="" 
                                                className="border border-gray-200 p-1 focus:outline-none rounded-sm" 
                                                placeholder="Phone Number" />
                                            </div>



                                        </div>



                                        



                                       

                                       






                                    </form>
                                </div>

                                <div className="mt-4 flex gap-2">

                                    <button className="button-bg py-2 px-3 text-white font-semibold  text-xs  rounded-sm"> Save Changes</button>

                                    <button
                                        type="button"
                                        className=" bg-customm p-color py-2  px-3 text-sm font-medium    rounded-sm  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>



            <Transition appear show={changePasswordOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-3xl border border-gray-100">
                                <Dialog.Title
                                    as="h3"
                                    className="text-base font-medium leading-6 text-gray-900"
                                >
                                Change Password

                                </Dialog.Title>

                               
                                <div className="mt-4">
                                    <form action="">
                                        <div className="flex gap-2 mt-4">
                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Current Password</label>
                                                <input type="text" name="" id="" 
                                                className="border border-gray-200 p-1 focus:outline-none rounded-sm" 
                                                placeholder="Enter current password" />
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">New Password</label>
                                                <input type="text" name="" id="" 
                                                className="border border-gray-200 p-1 focus:outline-none rounded-sm" 
                                                placeholder="Enter new password" />
                                            </div>



                                        </div>

                                        <div className="flex gap-2 mt-4">
                                            <div className="flex flex-col w-1/2">
                                            <label htmlFor="" className="text-xs mb-1">Confirm Password</label>

                                                <input 
                                                type="text" 
                                                name="" id="" 
                                                className="border border-gray-200 p-1 focus:outline-none rounded-sm" 
                                                placeholder="Re-enter new password" />
                                            </div>


                                           



                                        </div>



                                        



                                       

                                       






                                    </form>
                                </div>

                                <div className="mt-4 flex gap-2">

                                    <button className="button-bg py-2 px-3 text-white font-semibold  text-xs  rounded-sm"> Save Changes</button>

                                    <button
                                        type="button"
                                        className=" bg-customm p-color py-2  px-3 text-sm font-medium    rounded-sm  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>



            <div className="flex px-12 bg-white h-1/6 py-4 items-center justify-between">
                <div className="w-full  flex  items-center justify-between">
                    <h1 className="text-black text-lg font-semibold">{user}</h1>
                    <div className="w-5/12 bg-gray-100 h-00 rounded-3xl py-2 flex items-center px-8">
                        <input
                            type="text"
                            name=""
                            placeholder="search here..."
                            id=""
                            className="focus:outline-none bg-transparent w-11/12"
                        />

                        <RiSearch2Line />

                    </div>

                    <div className="border-r-1 text-lg">

                        <img src={notif} alt="" className="w-10 h-10" />

                       

                    </div>

                    <div className="w-3/12 flex justify-between gap-4">
                        <div className="bg-black w-12 h-12 rounded-full">




                            <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className=" text-xl font-medium text-black font-bold">
                        <img src={usericon} alt=""  />


                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute z-10 right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                         onClick={e => openEditProfileModal(e)}   

                                            className={`${active ? 'color-theme text-white' : 'text-black'
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >

                                           Edit Profile
                                        </button>
                                    )}
                                </Menu.Item>

                            </div>
                            

                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                         onClick={e => openChangePasswordModal(e)}   

                                            className={`${active ? 'color-theme text-white' : 'text-black'
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >

                                           Change Password
                                        </button>
                                    )}
                                </Menu.Item>

                            </div>


                            <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active ? ' text-white' : 'text-red-500'
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >

                                            Logout
                                        </button>
                                    )}
                                </Menu.Item>


                            </div>


                        </Menu.Items>
                    </Transition>
                </Menu>



                        </div>
                        <div className="flex flex-col">
                            <h4>Giovanni</h4>
                            <p className="text-xs -mt-1">Superadmin</p>
                        </div>

                        <div className="w-4/12">
                            <select name="" id="" className="border rounded-3xl px-4 py-2 w-11/12">
                                <option value="English">EN</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default TopNavbar
