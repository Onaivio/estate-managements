

import { Fragment, useState, useEffect } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import { render } from "react-dom";

import { Dialog, Transition } from '@headlessui/react'
import { RiNotificationLine, RiDashboardLine, RiKeyLine, RiUserLine, RiSecurePaymentLine, RiCalendarLine, RiShape2Line, RiSearch2Line } from 'react-icons/ri';

// @ts-ignore
import reqwest from "reqwest";
import LeftNavbar from '../../../Component/LeftNavbar';
import TopNavbar from '../../../Component/TopNavbar';


import "antd/dist/antd.css";
import totalResident from '../../../Images/totalresident.png';
import activevisitor from '../../../Images/activevisitor.png';
import checkin from '../../../Images/checkin.png';
import checkout from '../../../Images/checkout.png';
import wave from '../../../Images/wave.png';
import chevron from '../../../Images/chevron.png';

import totalRevenue from '../../../Images/totalRevenue.png';
import pieChart from '../../../Images/pieChart.png';
import schedule from '../../../Images/schedule.png';
import news from '../../../Images/news.png';
import DatePicker from 'sassy-datepicker';
import BarChart from 'react-bar-chart';

import { Bar } from "react-chartjs-2"

import {
  MainContainer,
  Container,
  BarChartContainer,
  Number,
  BlackLine,
  MakeBar
} from "./style";

function Dashboard() {

  const __DATA__ = [
    { distance: 13, colors: ["#185C66", "#F0F0F0"] },
    { distance: 20, colors: ["#185C66", "#F0F0F0"] },
    { distance: 16, colors: ["#185C66", "#F0F0F0"] },
    { distance: 30, colors: ["#185C66", "#F0F0F0"] },
    { distance: 22, colors: ["#185C66", "#F0F0F0"] },
    { distance: 13, colors: ["#185C66", "#F0F0F0"] },
    { distance: 20, colors: ["#185C66", "#F0F0F0"] },
    { distance: 16, colors: ["#185C66", "#F0F0F0"] },
    { distance: 30, colors: ["#185C66", "#F0F0F0"] },
    { distance: 22, colors: ["#185C66", "#F0F0F0"] },
    { distance: 13, colors: ["#185C66", "#F0F0F0"] },
    { distance: 20, colors: ["#185C66", "#F0F0F0"] },
    { distance: 16, colors: ["#185C66", "#F0F0F0"] },
    { distance: 30, colors: ["#185C66", "#F0F0F0"] },
    { distance: 22, colors: ["#185C66", "#F0F0F0"] },
  ];



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


  const onChange = (date) => {
    console.log(date.toString());
  };




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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
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


          <div className="flex justify-between  ml-12 w-11/12 items-center mt-12 gap-6">



            <div className="flex w-3/12 bg-white p-3 justify-between items-center rounded-xl relative">

              <div className="button-bg h-16 w-1 rounded-lg absolute left-0">

              </div>
              <div className="flex flex-col ml-4">
                <h4>Total Resident</h4>
                <h1 className="text-2xl color-theme">48</h1>
              </div>

              <img src={totalResident} alt="" className="w-12 h-12 mr-4" />
            </div>


            <div className="flex w-3/12 bg-white p-3 justify-between items-center rounded-xl relative">

              <div className="button-bg h-16 w-1 rounded-lg absolute left-0">

              </div>
              <div className="flex flex-col ml-4">
                <h4>Total Resident</h4>
                <h1 className="text-2xl color-theme">136</h1>
              </div>

              <img src={activevisitor} alt="" className="w-12 h-12 mr-4" />
            </div>

            <div className="flex w-3/12 bg-white p-3 justify-between items-center rounded-xl relative">

              <div className="button-bg h-16 w-1 rounded-lg absolute left-0">

              </div>
              <div className="flex flex-col ml-4">
                <h4>Check In</h4>
                <h1 className="text-2xl color-theme">97</h1>
              </div>

              <img src={checkin} alt="" className="w-12 h-12 mr-4" />
            </div>


            <div className="flex w-3/12 bg-white p-3 justify-between items-center rounded-xl relative">

              <div className="button-bg h-16 w-1 rounded-lg absolute left-0">

              </div>
              <div className="flex flex-col ml-4">
                <h4>Check Out</h4>
                <h1 className="text-2xl color-theme">48</h1>
              </div>

              <img src={checkout} alt="" className="w-12 h-12 mr-4" />
            </div>
          </div>


          <div className="flex gap-8 ml-12 mt-8  w-11/12">
            <div className="w-9/12 flex gap-6">
              <div className="w-8/12 bg-white pl-3 pr-3 pt-3 pb-5">
                <div className="flex justify-between items-center font-bold">
                  <p>Total Payment</p>
                  <button className="text-xl">...</button>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <h1 className="font-bold text-xl">#87,561</h1>
                    <p className="p-color">last month #563,443</p>

                  </div>


                  <div className="flex gap-2 items-center">
                    <img src={wave} alt="" className="w-12 h-6" />
                    <div className="flex items-center gap-2">
                    7% 
                    <img src={chevron} alt="" />

                    </div>
                  </div>
                </div>

                <Container>
                  <MainContainer>
                    {__DATA__.map(({ distance, colors }, i) => {
                      return (
                        <>
                          <BarChartContainer key={i}>
                            <MakeBar height={distance * 2} colors={colors} />
                            <Number color={colors[1]}>{distance}</Number>


                          </BarChartContainer>
                        </>
                      );
                    })}
                  </MainContainer>
                  <BlackLine />
                </Container>




              </div>

              <div className="w-4/12 button-bg rounded-lg flex flex-col justify-center items-center p-3">

                <img src={pieChart} alt="" className="w-28 " />
                <div className="flex justify-between items-center mt-4 w-8/12">
                  <div className="flex flex-col items-center">
                    <h1 className="text-white text-2xl">70%</h1>
                    <p className="text-white">Check In</p>

                  </div>


                  <div className="flex flex-col items-center">
                    <h1 className="text-white  text-2xl">30%</h1>

                    <p className="text-white">Check Out</p>

                  </div>


                </div>


              </div>


            </div>

            <div className="flex flex-col w-56">
              {/* <img src={schedule} alt="" /> */}

              <DatePicker onChange={onChange} />
            </div>
          </div>




          <div className="w-11/12 ml-12 mt-8 flex gap-8 ">

            <div className="w-9/12 bg-white p-4 rounded-lg">
              <h1 className="ml-6 text-lg mb-6">Recent News</h1>

              <table class="w-full text-sm text-left text-gray-500 ">
                <thead class="text-xs text-gray-700  bg-white">
                  <tr>

                    <th scope="col" class="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Priority
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span class="sr-only"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="bg-white border-b">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                      <div className="flex gap-4">
                        <img src={news} alt="" />
                        <div className="flex flex-col">
                          <h5 className="font-semibold text-sm">Contact Email not Linked</h5>
                          <p className="text-xs font-light">Updated 1 day ago</p>
                        </div>
                      </div>
                    </th>
                    <td class="px-6 py-4 flex items-start">
                      <h5 className="font-semibold text-sm">  Maintenance</h5>

                    </td>
                    <td class="px-6 py-4">
                      <h3 className="font-semibold text-xs">May 26, 2019</h3>
                      <p className="text-xs font-light">5:00PM</p>


                    </td>
                    <td class="px-6 py-4">
                      <div className="bg-red-100 text-black p-1 rounded-lg h-8 flex items-start justify-center">
                        <p className="text-red-600">High</p>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <a href="#" class="font-medium text-blue-600  hover:underline">...</a>
                    </td>
                  </tr>
                  <tr
                    class="bg-white border-b">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                      <div className="flex gap-4">
                        <img src={news} alt="" />
                        <div className="flex flex-col">
                          <h5 className="font-semibold text-sm">Contact Email not Linked</h5>
                          <p className="text-xs font-light">Updated 1 day ago</p>
                        </div>
                      </div>
                    </th>
                    <td class="px-6 py-4 flex items-start">
                      <h5 className="font-semibold text-sm">  Maintenance</h5>

                    </td>
                    <td class="px-6 py-4">
                      <h3 className="font-semibold text-xs">May 26, 2019</h3>
                      <p className="text-xs font-light">5:00PM</p>


                    </td>
                    <td class="px-6 py-4">
                      <div className="bg-orange-100 text-black p-1 rounded-lg h-8 flex items-start justify-center">
                        <p className="text-orange-500">Low</p>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <a href="#" class="font-medium text-blue-600  hover:underline">...</a>
                    </td>
                  </tr>

                  <tr
                    class="bg-white border-b">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                      <div className="flex gap-4">
                        <img src={news} alt="" />
                        <div className="flex flex-col">
                          <h5 className="font-semibold text-sm">Contact Email not Linked</h5>
                          <p className="text-xs font-light">Updated 1 day ago</p>
                        </div>
                      </div>
                    </th>
                    <td class="px-6 py-4 flex items-start">
                      <h5 className="font-semibold text-sm">  Maintenance</h5>

                    </td>
                    <td class="px-6 py-4">
                      <h3 className="font-semibold text-xs">May 26, 2019</h3>
                      <p className="text-xs font-light">5:00PM</p>


                    </td>
                    <td class="px-6 py-4">
                      <div className="bg-green-100 text-black p-1 rounded-lg h-8 flex items-start justify-center">
                        <p className="text-green-500">Normal</p>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <a href="#" class="font-medium text-blue-600  hover:underline">...</a>
                    </td>
                  </tr>


                  <tr
                    class="bg-white border-b">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                      <div className="flex gap-4">
                        <img src={news} alt="" />
                        <div className="flex flex-col">
                          <h5 className="font-semibold text-sm">Contact Email not Linked</h5>
                          <p className="text-xs font-light">Updated 1 day ago</p>
                        </div>
                      </div>
                    </th>
                    <td class="px-6 py-4 flex items-start">
                      <h5 className="font-semibold text-sm">  Maintenance</h5>

                    </td>
                    <td class="px-6 py-4">
                      <h3 className="font-semibold text-xs">May 26, 2019</h3>
                      <p className="text-xs font-light">5:00PM</p>


                    </td>
                    <td class="px-6 py-4">
                      <div className="bg-green-100 text-black p-1 rounded-lg h-8 flex items-start justify-center">
                        <p className="text-green-500">Normal</p>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <a href="#" class="font-medium text-blue-600  hover:underline">...</a>
                    </td>
                  </tr>


                </tbody>
              </table>
            </div>

            <div className="bg-white w-56 p-3 rounded-lg">
              <div className="flex justify-between items-center ">
                <h2>Recent Payments</h2>

                <button className="text-sm">More</button>
              </div>

              <div className="flex flex-col my-4">
                <h4 className="text-sm font-bold text-black">Monalisa Sitepu</h4>
                <p className="text-xs color-theme font-semibold">#54,000</p>

              </div>

              <div className="flex flex-col my-4">
                <h4 className="text-sm font-bold text-black">Monalisa Sitepu</h4>
                <p className="text-xs color-theme font-semibold">#54,000</p>

              </div>


              <div className="flex flex-col my-4">
                <h4 className="text-sm font-bold text-black">Monalisa Sitepu</h4>
                <p className="text-xs color-theme font-semibold">#54,000</p>

              </div>


              <div className="flex flex-col my-4">
                <h4 className="text-sm font-bold text-black">Monalisa Sitepu</h4>
                <p className="text-xs color-theme font-semibold">#54,000</p>

              </div>


              <div className="flex flex-col my-4">
                <h4 className="text-sm font-bold text-black">Monalisa Sitepu</h4>
                <p className="text-xs color-theme font-semibold">#54,000</p>

              </div>



              <div className="flex flex-col my-4">
                <h4 className="text-sm font-bold text-black">Monalisa Sitepu</h4>
                <p className="text-xs color-theme font-semibold">#54,000</p>

              </div>


            </div>








          </div>
        </div>
      </div>
    </div >
  )
}

export default Dashboard
