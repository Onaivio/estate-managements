

import { Fragment, useState, useEffect } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import { render } from "react-dom";

import { Dialog, Transition } from '@headlessui/react'
import { RiNotificationLine, RiDashboardLine, RiKeyLine, RiUserLine, RiSecurePaymentLine, RiCalendarLine, RiShape2Line, RiSearch2Line } from 'react-icons/ri';

// @ts-ignore
import reqwest from "reqwest";
import Dashboard from '../Modules/Admin/Dashboard/Dashboard';


import "antd/dist/antd.css";


import { NavLink } from "react-router-dom";
import dashboard from '../Images/dashboard.png';
import usericon from '../Images/usericon.png';
import key from '../Images/key.png';
import user from '../Images/user.png';
import payment from '../Images/payment.png';
import calendar from '../Images/calendar.png';
import puzzle from '../Images/puzzle.png';
import apartment from '../Images/apartment.png';


function Dash() {






    return (
        <>

            <div
                className="w-2/12 h-screen bg-white items-center flex flex-col pt-6 shad"
            >
                <div className="rounded-full w-12 h-12 bg-black mb-12">
                    <img src={usericon} alt="" />
                </div>

                <div className="flex gap-7 flex-col">
                    <div className="flex flex-col items-center gap-2 text-2xl">
                        {/* <RiDashboardLine /> */}

                        <img src={dashboard} alt="" className="w-6 h-6" />

                        <NavLink className="text-xs font-medium text-gray-700" exact to="/dashboard">Dashboard</NavLink>

                    </div>

                    <div className="flex flex-col items-center gap-2 text-2xl">

                        <img src={key} alt="" className="w-6 h-6" />


                        <NavLink className="text-xs font-medium text-gray-700" exact to="/residents">Residents</NavLink>



                    </div>

                    <div className="flex flex-col items-center gap-2 text-2xl">

                        <img src={user} alt="" className="w-6 h-6" />

                        <NavLink className="text-xs font-medium text-gray-700" exact to="/visitors">Visitors</NavLink>


                    </div>

                    <div className="flex flex-col items-center gap-2 text-2xl">

<img src={apartment} alt="" className="w-6 h-6" />

<NavLink className="text-xs font-medium text-gray-700" exact to="/apartment">Apartment</NavLink>


</div>



                    <div className="flex flex-col items-center gap-2 text-2xl">

                        <img src={payment} alt="" className="w-6 h-6" />


                        <NavLink className="text-xs font-medium text-gray-700" exact to="/payments">Payments</NavLink>

                    </div>

                    <div className="flex flex-col items-center gap-2 text-2xl">

                        <img src={calendar} alt="" className="w-6 h-6" />



                        <NavLink className="text-xs font-medium text-gray-700" exact to="/news">Estate News</NavLink>

                    </div>

                    <div className="flex flex-col items-center gap-2  text-2xl">

                        <img src={puzzle} alt="" className="w-6 h-6" />


                        <NavLink className="text-xs font-medium text-gray-700" exact to="/staff">Staffs </NavLink>

                    </div>

                    <div className="flex flex-col items-center ">

                        <p className="text-xs ">Estate Management</p>
                        <p className="text-xs ">&copy; All Rights Reserved</p>
                    </div>
                </div>
            </div>









        </>
    )
}

export default Dash
