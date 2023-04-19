

import { Fragment, useState, useEffect,useRef } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import { render } from "react-dom";

import { Dialog, Transition } from '@headlessui/react'
import { RiNotificationLine, RiDashboardLine, RiKeyLine, RiUserLine, RiSecurePaymentLine, RiCalendarLine, RiShape2Line, RiSearch2Line } from 'react-icons/ri';

// @ts-ignore
import reqwest from "reqwest";

import "antd/dist/antd.css";
import LeftNavbar from '../../../Component/LeftNavbar';
import TopNavbar from '../../../Component/TopNavbar';
import photo from '../../../Images/photo.png';



function Payments() {


    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [img, setImg] = useState([]);
    const [pagination, setPagination] = useState({});

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    let [isOpen, setIsOpen] = useState(false)
    let [isLevy, setIsLevy] = useState(false)

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


    function closeModal() {
        setIsOpen(false)
        setIsLevy(false)

    }

    function closeLevyModal() {
        setIsLevy(false)
    }

    function openModal(e) {
        e.preventDefault()
        setIsOpen(true)
    }

    function openLevy(e) {
        e.preventDefault()
        setIsLevy(true)
    }

    const columns = [

        {
            title: "Name",
            dataIndex: "picture",

            sorter: (a, b) => (a.picture.thumbnail > b.picture.thumbnail ? 1 : -1),
            render: (picture) => <div>
                <img className="-mr-16 rounded-md" src={picture.thumbnail} />
            </div>,
            width: "1%"

        },

        {

            dataIndex: "name",

            render: (name) =>
                <div>
                    <p className="font-semibold">General Cleaning Estate</p>
                    <p className="text-xx text-gray-600 font-light">Updated 1 day ago</p>
                </div>,
            width: "25%"
        },
        {
            title: "Amount",

            render: () =>
                <div>
                    <p className="font-semibold text-sm color-theme">#45,000</p>

                </div>,

            sorter: (a, b) => (a.email.first > b.email.first ? 1 : -1)
        },
        {
            title: "Date Created",
            dataIndex: "gender",

            render: () =>
                <div>
                    <p className="font-semibold text-xs">Oct 24th, 2020</p>
                    <p className="font-light text-xx text-black">

                        08:29AM

                    </p>

                </div>,
            sorter: (a, b) => (a.gender.male > <b className="gender female"></b> ? 1 : -1),

            width: "20%"
        },
        {
            title: "Due Date",
            dataIndex: "gender",
            render: () =>
                <div>
                    <p className="font-semibold text-xs">Oct 24th, 2020</p>
                    <p className="font-light text-xx text-black">

                        08:29AM

                    </p>

                </div>,
            sorter: (a, b) => (a.gender.male > <b className="gender female"></b> ? 1 : -1),
        },
        {
            title: "Paid",
            dataIndex: "dob",

            render: (dob) =>
                <div>
                    <p className="text-xs text-black font-semibold">{dob.age}</p>

                </div>,
            sorter: (a, b) => (a.gender.male > <b className="gender female"></b> ? 1 : -1),
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
                // onClick={e => pop(e)}
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
                                    Add New Levy

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
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="">Name</label>
                                            <input type="text" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" placeholder="Enter Levy name" />

                                        </div>


                                        <div className="flex gap-1 mt-4">
                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="">Amount</label>
                                                <input type="text" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" placeholder="Enter Levy name" />
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="">Validity</label>
                                                <input type="date" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" placeholder="Enter Levy name" />
                                            </div>



                                        </div>

                                        <div className="flex flex-col gap-1 mt-4">
                                            <label htmlFor="">Description</label>

                                            <textarea name="" id="" cols="10" rows="3" placeholder="Write Description" className="border border-gray-200 p-2">

                                            </textarea>
                                        </div>



                                    </form>
                                </div>

                                <div className="mt-4 flex gap-2">

                                    <button className="button-bg py-2 px-3 text-white font-semibold  text-xs  rounded-sm"> Add Levy</button>

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




            <Transition appear show={isLevy} as={Fragment}>
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
                                    Levy Detail

                                </Dialog.Title>
                                <div className="mt-4">
                  <form action="">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="">Name</label>
                      <input type="text" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" placeholder="Enter news Title" />

                    </div>


                    <div className="flex gap-2 mt-4 ">



                      <div className="flex flex-col w-1/2">
                        <label htmlFor="" className="text-xs mb-1">Amount</label>
                        <input type="text" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" placeholder="Enter news Title" />


                      </div>


                      <div className="flex flex-col w-1/2">
                        <label htmlFor="" className="text-xs mb-1">Validity</label>
                        <input type="date" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" placeholder="Enter news Title" />


                      </div>






                    </div>


                    <div className="flex flex-col gap-1 mt-2">
                      <label htmlFor="">Purpose</label>
                      <textarea name="" id="" cols="10" rows="3" placeholder="Write Description" className="border border-gray-200 p-2">

                                            </textarea>
                    </div>


                    <h3 className="mt-6">Payment List</h3>
                    <div className="mt-2">
                      <table class="table-fixed w-full">
                        <thead>
                          <tr className="border-b border-t border-gray-300">
                            <th className="font-semibold">Payment ID</th>
                            <th className="font-semibold">Name</th>
                            <th className="font-semibold">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b  border-gray-100 ">
                            <td className="text-xs font-semibold">98450375635</td>
                            <td className="text-xs font-semibold">James Okafor Kingley</td>
                            <td className="text-xs font-semibold">Oct 24th, 2020</td>
                          </tr>
                          <tr className="border-b  border-gray-100 p-2">
                            <td className="text-xs font-semibold">98450375635</td>
                            <td className="text-xs font-semibold">Keanu Rappers</td>
                            <td className="text-xs font-semibold">Oct 24th, 2020</td>

                          </tr>
                          <tr className="border-b  border-gray-100 mt-4">
                            <td className="text-xs font-semibold">98450375635</td>
                            <td className="text-xs font-semibold">James Okafor </td>
                            <td className="text-xs font-semibold">Oct 24th, 2020</td>
                          </tr>

                          <tr className="border-b  border-gray-100 mt-4">
                            <td className="text-xs font-semibold">98450375635</td>
                            <td className="text-xs font-semibold">James Okafor Kingsley</td>

                            <td className="text-xs font-semibold">Oct 24th, 2020</td>
                          </tr>
                          <tr className="border-b  border-gray-100 mt-4">
                            <td className="text-xs font-semibold">98450375635</td>
                            <td className="text-xs font-semibold">Keanu Rappers</td>
                            <td className="text-xs font-semibold">Oct 24th, 2020</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>


                  </form>
                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>



            <div className="flex">
                <LeftNavbar />


                <div className="w-10/12 flex flex-col  body-bg">
                    <TopNavbar user='Payments' />



                    <div className="flex justify-between ml-12 w-11/12 items-center mt-8">
                        <div
                            className="bg-white p-2  w-3/12 rounded-2xl px-6 flex items-center"
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

                            <button onClick={e => openLevy(e)} className="flex items-center gap-2 bg-customm py-2 px-3 color-theme font-semibold text-xs  rounded-sm">

                                <RiCalendarLine />
                                Generate Report</button>

                            <button onClick={e => openModal(e)} className="button-bg py-2 px-3 text-white font-semibold  text-xs  rounded-sm"> Add New Levy</button>
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

export default Payments
