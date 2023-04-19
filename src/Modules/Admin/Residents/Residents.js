

import { Fragment, useState, useEffect,useRef} from "react";


import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import { render } from "react-dom";

import { Dialog, Transition } from '@headlessui/react'
import { RiNotificationLine, RiDashboardLine, RiKeyLine, RiUserLine, RiSearch2Line, RiSecurePaymentLine, RiCalendarLine, RiShape2Line } from 'react-icons/ri';

// @ts-ignore
import reqwest from "reqwest";

import "antd/dist/antd.css";
import TopNavbar from "../../../Component/TopNavbar";
import LeftNavbar from "../../../Component/LeftNavbar";
import add from '../../../Images/add.png';
  


function Residents() {

    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [img, setImg] = useState([]);
    const [pagination, setPagination] = useState({});

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [file, setFile] = useState()
    const [image, setImage] = useState()

    
    const fileInputRef = useRef()

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
        console.log("response.results phone", response.results.phone);

        setUserList(response.results);
        setIsLoading(false);
    };

    useEffect(() => {
        customFetch({});
    }, []);

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal(e) {
        e.preventDefault()
        setIsOpen(true)
    }

    const columns = [

        {
            title: "Resident",
            dataIndex: "picture",

            sorter: (a, b) => (a.picture.thumbnail > b.picture.thumbnail ? 1 : -1),
            render: (picture) => <div>
                <img className="rounded-full -mr-16" src={picture.thumbnail} />
            </div>,
            width: "1%"

        },

        {

            dataIndex: "name",

            render: (name) =>
                <div>
                    <label htmlFor="" className="text-xx color-theme font-semibold">#GS-2234</label>
                    <p className="font-semibold">{name.first} {name.last}</p>
                </div>,
            width: "25%"
        },
        {
            title: "Email Address",
            dataIndex: "email",
            sorter: (a, b) => (a.email.first > b.email.first ? 1 : -1)
        },
        {
            title: "Date Added",
            dataIndex: "gender",
            sorter: (a, b) => (a.gender.male > <b className="gender female"></b> ? 1 : -1),

            // filters: [
            //     { text: "Male", value: "male" },
            //     { text: "Female", value: "female" }
            // ],
            width: "20%"
        },
        {
            title: "Apartment Type",
            dataIndex: "gender",
            // filters: [
            //     { text: "Male", value: "male" },
            //     { text: "Female", value: "female" }
            // ],
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
            render: () => <button
                type="button"
                // onClick={e => openModal(e)}
                className="px-4 py-2 text-xl font-medium text-black font-bold"
            >
                ...
            </button>,
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
        // setSelectedRowKeys({ selectedRowKeys });
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;




    return (
        <div>

            <Transition appear show={isOpen} as={Fragment}>
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
                                    Add Resident

                                </Dialog.Title>

                                <div className="w-12 h-12 rounded-full bg-gray-300">
                                    <img src={add} alt="" className="cursor-pointer" onClick={(event) => {
                            event.preventDefault()
                            fileInputRef.current.click()
                        }} />

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
                                                <label htmlFor="" className="text-xs mb-1">Firstname</label>
                                                <input type="text" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" placeholder="Enter Levy name" />
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Lastname</label>
                                                <input type="text" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" placeholder="Enter Levy name" />
                                            </div>



                                        </div>


                                        <div className="flex gap-2 mt-4">
                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Email</label>
                                                <input type="email" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" placeholder="Enter Levy name" />
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Phone Number</label>
                                                <input type="phone" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" placeholder="Enter Levy name" />
                                            </div>



                                        </div>


                                        <div className="flex gap-2 mt-4">
                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Date of Birth</label>
                                                <input type="date" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" placeholder="Enter Levy name" />
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Gender</label>
                                                <select name="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" id="">
                                                    <option value="">Choose</option>
                                                    <option value="">Male</option>
                                                    <option value="">Female</option>
                                                </select>

                                            </div>



                                        </div>



                                        <div className="flex gap-2 mt-4">
                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Marital Status</label>
                                                <select name="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" id="">
                                                    <option value="">Choose</option>
                                                    <option value="">Male</option>
                                                    <option value="">Female</option>
                                                </select>
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Apartment Type</label>
                                                <select name="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" id="">
                                                    <option value="">Choose</option>
                                                    <option value="">Male</option>
                                                    <option value="">Female</option>
                                                </select>

                                            </div>



                                        </div>







                                    </form>
                                </div>

                                <div className="mt-4 flex gap-2">

                                    <button className="button-bg py-2 px-3 text-white font-semibold  text-xs  rounded-sm"> Add Resident</button>

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


                <div className="w-10/12 flex flex-col  body-bg">
                    <TopNavbar user='Residents' />

                    <div className="flex justify-between ml-12 w-11/12 items-center mt-8">
                        <div
                            className="flex items-center bg-white p-2 mt-8 w-3/12 rounded-2xl px-6 flex items-center"
                        >
                            <input
                                type="text"
                                name=""
                                placeholder="search here..."
                                id=""
                                className="focus:outline-none bg-transparent w-11/12"
                            />

                            <RiSearch2Line />

                        </div>


                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 bg-customm py-2 px-3 color-theme font-semibold text-xs  rounded-sm">
                                <RiCalendarLine />
                                Date Filter</button>
                            <button className="flex items-center gap-2 bg-customm py-2 px-3 color-theme font-semibold text-xs  rounded-sm">
                                <RiCalendarLine />
                                Generate Report</button>
                            <button onClick={e => openModal(e)} className="button-bg py-2 px-3 text-white font-semibold  text-xs  rounded-sm"> Add New Resident</button>
                        </div>
                    </div>






                    <div className=" w-11/12 ml-12 mt-8">
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

export default Residents
