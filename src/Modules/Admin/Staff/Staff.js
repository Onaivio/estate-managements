

import { Fragment,useState, useEffect } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import { render } from "react-dom";

import { Dialog, Transition } from '@headlessui/react'
import { RiNotificationLine,RiDashboardLine,RiKeyLine,RiUserLine,RiSecurePaymentLine,RiCalendarLine,RiShape2Line,RiSearch2Line } from 'react-icons/ri';

// @ts-ignore
import reqwest from "reqwest";
import LeftNavbar from '../../../Component/LeftNavbar';
import TopNavbar from '../../../Component/TopNavbar';


import "antd/dist/antd.css";


function Staff() {

    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [pagination, setPagination] = useState({});

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [color, setColor] = useState();
    let [isOpen, setIsOpen] = useState(false)
    let [staffOpen, setStaffOpen] = useState(false)



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
  setStaffOpen(false)

  }

  function openModal(e) {
    e.preventDefault()
    setIsOpen(true)
  }

  function openStaffModal(e) {
    e.preventDefault()

    setStaffOpen(true)

  }

    const columns = [

        {
            title: "Staff Name",
            dataIndex: "name",
            sorter: (a, b) => (a.name.first > b.name.first ? 1 : -1),
            render: (name) => `${name.first} ${name.last}`,
            width: "20%"
        },
        {
            title: "Email Address",
            dataIndex: "email"
        }, 
        {
            title: "Date Created",
            dataIndex: "gender",

            render: () =>
                <div>
                    <p className="font-semibold text-xs">Oct 24th, 2020</p>

                </div>,
            sorter: (a, b) => (a.gender.male > <b className="gender female"></b> ? 1 : -1),

            width: "20%"
        },
       

        {
            title: "Role",
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
            render: () => <button
          type="submit"
onClick={e => openModal(e)}
          className="px-4 py-2 text-xl font-medium text-black font-extrabold"
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
        setColor('red');
      }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;




    return (
        <div>


<Transition appear show={staffOpen} as={Fragment}>
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
                                    Add Staff

                                </Dialog.Title>

                               
                                <div className="mt-4">
                                    <form action="">
                                        <div className="flex gap-2 mt-4">
                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Firstname</label>
                                                <input type="text" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm"
                                                 placeholder="Enter First name" />
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Lastname</label>
                                                <input type="text" name="" id="" className="border border-gray-200 p-2 focus:outline-none rounded-sm"
                                                 placeholder="Enter Last name" />
                                            </div>



                                        </div>


                                        <div className="flex gap-2 mt-4">
                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Email</label>
                                                <input type="email" name="" id="" 
                                                className="border border-gray-200 p-2 focus:outline-none rounded-sm" placeholder="Enter Email Address" />
                                            </div>


                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="" className="text-xs mb-1">Role</label>
                                                <select name="" className="border border-gray-200 p-2 focus:outline-none rounded-sm" id="">
                                                    <option value="">Choose</option>
                                                    <option value="">Admin</option>
                                                   
                                                </select>
                                            </div>



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
           <LeftNavbar/>

                <div className="w-10/12 flex flex-col body-bg">
                 <TopNavbar user ='Staffs'/>


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

<RiSearch2Line/>

                        </div>


                        <div className="flex gap-4">
                        <button onClick={e => openStaffModal(e)} className="button-bg py-2 px-3 text-white font-semibold  text-xs  rounded-sm"> Add Staff</button>



                           


                        </div>
                    </div>




                    <div className="w-11/12 ml-12 mt-8">
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

export default Staff
