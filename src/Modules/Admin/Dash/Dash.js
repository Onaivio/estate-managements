

import { Fragment, useState, useRef, useEffect } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { render } from 'react-dom';

import { Dialog, Menu, Transition, Tab } from '@headlessui/react';

import { ChevronDownIcon } from '@heroicons/react/solid'


import { RiNotificationLine, RiDashboardLine, RiKeyLine, RiUserLine, RiSecurePaymentLine, RiCalendarLine, RiShape2Line, RiSearch2Line } from 'react-icons/ri';

// @ts-ignore
import reqwest from "reqwest";
import LeftNavbar from '../../../Component/LeftNavbar';
import TopNavbar from '../../../Component/TopNavbar';

import { NavLink } from "react-router-dom";

import "antd/dist/antd.css";
import totalResident from '../../../Images/totalresident.png';
import activevisitor from '../../../Images/activevisitor.png';
import checkin from '../../../Images/checkin.png';
import checkout from '../../../Images/checkout.png';
import totalRevenue from '../../../Images/totalRevenue.png';
import pieChart from '../../../Images/pieChart.png';
import schedule from '../../../Images/schedule.png';
import news from '../../../Images/news.png';
import placeholder from '../../../Images/placeholder.png';
import call from '../../../Images/call.png';
import message from '../../../Images/message.png';
import pp from '../../../Images/pp.png';
import overlay from '../../../Images/overlay.png';
import bed from '../../../Images/bed.png';
import calendar from '../../../Images/calendar.png';
import info from '../../../Images/info.png';

function Dash() {





    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [pagination, setPagination] = useState({});

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [color, setColor] = useState();
    let [isOpen, setIsOpen] = useState(false)







    const customFetch = async (params = {}) => {
        console.log("params:", params);
        setIsLoading(true);
        const response = await reqwest({
            url: "https://randomuser.me/api",
            method: "get",
            data: {
                results: 5
            },
            type: "json"
        });
        console.log("response.results", response.results);
        setUserList(response.results);
        setIsLoading(false);
    };

    useEffect(() => {
        customFetch({});
    }, []);


    function closeModal() {
        setIsOpen(false)
    }

    function openModal(e) {
        e.preventDefault()
        setIsOpen(true)
    }

    const columns = [

        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Name",
            dataIndex: "name",
            sorter: (a, b) => (a.name.first > b.name.first ? 1 : -1),
            render: (name) => `${name.first} ${name.last}`,
            width: "20%"
        },

        {
            title: "Gender",
            dataIndex: "gender",
            filters: [
                { text: "Male", value: "male" },
                { text: "Female", value: "female" }
            ],
            width: "20%"
        },
        {
            title: "Status",
            dataIndex: "nat"
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: () =>

                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="px-4 py-2 text-xl font-medium text-black font-bold">
                            ...

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
                        <Menu.Items className="absolute z-10 right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active ? ' text-white' : 'text-red-500'
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >

                                            Suspend Access
                                        </button>
                                    )}
                                </Menu.Item>


                            </div>

                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active ? 'color-theme text-white' : 'text-black'
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >

                                            View Checks
                                        </button>
                                    )}
                                </Menu.Item>

                            </div>

                        </Menu.Items>
                    </Transition>
                </Menu>
        },
    ];

    const handleTableChange = (
        pagination,
        filters,
        sorter
    ) => {
        setPagination(pagination);
        customFetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters
        });
    };

    const onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setColor('red');
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;




    return (
        <div>








            <div className="flex">
                <LeftNavbar />

                <div className="w-10/12 flex flex-col body-bg">
                    <TopNavbar user='Dashboard' />

                    <h5 className='ml-12 mt-8'>Residents / Keanu Repes</h5>

                    <div className="flex justify-between  ml-12 w-11/12 items-center mt-4 gap-6">


                        <div className="w-3/12 bg-white rounded-lg p-4 flex flex-col items-center">
                            <div className="bg-gray-100 w-full h-28 relative mb-16 rounded-lg">


                                <div className="absolute flex mt-8 items-center justify-center w-full  top-8">
                                    <img src={placeholder} alt="" className="w-24" />
                                </div>

                            </div>

                            <p className="color-theme">#GS-223</p>
                            <h4 className="font-bold">Keanu Repes</h4>

                            <div className="flex mt-8 justify-start items-center gap-4 w-full">
                                <img src={call} alt="" className="w-6" />
                                <p className="color-theme mt-2">+12 3456 678</p>

                            </div>


                            <div className="flex  justify-start items-center gap-4 w-full">
                                <img src={message} alt="" className="w-7" />
                                <p className="color-theme mt-2">keanurepes@mail.com</p>

                            </div>


                        </div>
                        <div className="w-9/12 bg-white rounded-lg p-4">
                            <h2>Apartment Details</h2>

                            <div className="flex gap-10 mt-8 items-center">
                                <div className=" flex-col flex w-5/12">
                                    <p className="color-theme">Apartment ID #0052466623</p>
                                    <h4 className="font-bold">Queen Room Deluxe A09244</h4>
                                </div>
                                <div className="flex gap-4 w-7/12">

                                    <div className="">
                                        <div className="flex items-start gap-2">
                                            <img src={calendar} alt="" className="w-4 h-4" />
                                            <p className="color-theme">Date of Birth</p>

                                        </div>
                                        <h5 className="font-bold">Oct 28th, 1991</h5>
                                    </div>

                                    <div className="">
                                        <div className="flex items-start gap-2">
                                            <img src={bed} alt="" className="w-4 h-4" />
                                            <p className="color-theme">Marital Status</p>

                                        </div>
                                        <h5 className="font-bold">Married</h5>
                                    </div>

                                    <div className="">
                                        <div className="flex items-start gap-2">
                                            <img src={calendar} alt="" className="w-4 h-4" />
                                            <p className="color-theme">Assigned Date</p>

                                        </div>
                                        <h5 className="font-bold">Oct 28th, 1991</h5>
                                    </div>

                                </div>
                            </div>



                            <div className="w-full mt-4">


                                <div className="flex justify-between mt-12 mb-4">
                                    <div className="flex gap-2">
                                        <h4>Room Facilities</h4>

                                        <img src={info} alt="" className="w-4 h-4 mt-1" />
                                    </div>
                                    <p className="font-semibold text-xs">AC, Shower, Douxxble Bed, Towel, Bathup, Coffee Set, LED TV, Wifi</p>

                                </div>

                                <div className="flex gap-6  overflow-x-scroll ">
                                    <div className="w-3/12 shrink-0">
                                        <img src={pp} alt="" />
                                    </div>
                                    <div className="w-3/12 shrink-0">
                                        <img src={overlay} alt="" />
                                    </div>

                                    <div className="w-3/12 shrink-0">
                                        <img src={pp} alt="" />
                                    </div>

                                    <div className="w-3/12 shrink-0">
                                        <img src={pp} alt="" />
                                    </div>








                                </div>




                            </div>


                        </div>




                    </div>


                    <div className="bg-white p-3 ml-12 mt-8 w-11/12">
                        <div className="flex justify-between">
                            <div className="flex gap-3 ml-12 mb-4 p-color">

                                <NavLink className="p-color font-semibold activee" exact to="/dash">Visitors</NavLink>
                                <NavLink className="p-color font-semibold " exact to="/dashpayment">Payments</NavLink>

                            </div>
                            <hr />
                            <div className="flex gap-6 mb-4">

                            <button className="flex items-center gap-2 bg-customm py-1 px-3 color-theme font-semibold text-xs  rounded-lg">
                                    <RiCalendarLine />
                                    Date Filter</button>

                                <button className="flex items-center gap-2 bg-customm py-1 px-3 color-theme font-semibold text-xs  rounded-lg">

                                    <RiCalendarLine />
                                    Generate Report</button>
                            </div>
                        </div>

                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={userList}
                            loading={isLoading}
                            onChange={handleTableChange}
                            pagination={pagination}
                            rowKey="email"
                        />

                    </div>



                </div>
            </div>
        </div>
    )
}

export default Dash
