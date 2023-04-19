

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

function ApartmentService() {





    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [pagination, setPagination] = useState({});

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [color, setColor] = useState();
    let [isOpen, setIsOpen] = useState(false)
    let [addFacilityOpen, setAddFacilityOpen] = useState(false)

    





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
        setAddFacilityOpen(false)
        
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


    function openAddFacilityModal(e) {
        e.preventDefault()
    
        setAddFacilityOpen(true)
    
      }

    return (
        <div>




<Transition appear show={addFacilityOpen} as={Fragment}>
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
                                  Add Facilities

                                </Dialog.Title>

                               
                                <div className="mt-4">
                                    <form action="">
                                        <div className="flex gap-2 mt-4">
                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Upload Image</label>
                                                <input type="file" name="" id="" className="border border-gray-200 p-1 focus:outline-none rounded-sm" placeholder="Enter Levy name" />
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Image Caption</label>
                                                <input type="text" name="" id="" className="border border-gray-200 p-1 focus:outline-none rounded-sm" placeholder="Enter Levy name" />
                                            </div>



                                        </div>

                                        <div className="flex gap-2 mt-4">
                                            <div className="flex flex-col w-1/2">
                                            <label htmlFor="" className="text-xs mb-1">Upload Image</label>

                                                <input 
                                                type="file" 
                                                name="" id="" 
                                                className="border border-gray-200 p-1 focus:outline-none rounded-sm" 
                                                placeholder="Enter Caption" />
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                            <label htmlFor="" className="text-xs mb-1">Image Caption</label>

                                                <input type="text" name="" id="" 
                                                className="border border-gray-200 p-1 focus:outline-none rounded-sm" 
                                                placeholder="Enter Caption" />
                                            </div>



                                        </div>



                                        <div className="flex gap-2 mt-4">
                                            <div className="flex flex-col w-1/2">
                                            <label htmlFor="" className="text-xs mb-1">Upload Image</label>

                                                <input type="file" name="" id="" className="border border-gray-200 p-1 focus:outline-none rounded-sm" placeholder="Enter Levy name" />
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                            <label htmlFor="" className="text-xs mb-1">Image Caption</label>

                                                <input type="text" 
                                                name="" id="" 
                                                className="border border-gray-200 p-1 focus:outline-none rounded-sm" 
                                                placeholder="Enter Caption" />

                                            </div>



                                        </div>


<div className="flex justify-end">
<button className="bg-transparent py-2 px-3 p-color font-semibold  text-xs  rounded-sm"> Add More</button>
<hr className="border-gray-400 border-t" />

</div>
                                       

                                       






                                    </form>
                                </div>

                                <div className="mt-4 flex gap-2">

                                    <button className="button-bg py-2 px-3 text-white font-semibold  text-xs  rounded-sm"> Add Staff</button>

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






            <div className="flex">
                <LeftNavbar />

                <div className="w-10/12 flex flex-col body-bg">
                    <TopNavbar user='Dashboard' />

                    <h5 className='ml-12 mt-8'>Residents / Keanu Repes</h5>

                    <div className="flex justify-between  ml-12 w-11/12 items-center mt-4 gap-6">


                       
                        <div className="w-9/12 bg-white rounded-lg p-4">
                        <div className="flex justify-between">
                        <h2>Apartment Details</h2>
                       
                        <button onClick={e => openAddFacilityModal(e)} className="button-bg py-2 px-3 text-white font-semibold  text-xs  rounded-sm">  Add Facilities</button>


                        </div>

                            <div className="flex  mt-8 justify-between  items-center">
                                <div className=" flex-col flex w-5/12">
                                    <p className="color-theme">Apartment ID #0052466623</p>
                                    <h4 className="font-bold">Queen Room Deluxe A09244</h4>
                                </div>
                                <div className="flex flex-col items-end gap-4  w-7/12">

                                  
                            
                                        <div className="flex  gap-2">
                                            <img src={calendar} alt="" className="w-4 h-4" />
                                            <p className="color-theme">Assigned Date</p>

                                        </div>
                                        <h5 className="font-bold">Oct 28th, 1991</h5>
                                    

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


                   



                </div>
            </div>
        </div>
    )
}

export default ApartmentService
