import { React, useEffect, useState } from 'react';
import Modal from "../ModalBox/Modal";
import ViewModal from "../ModalBox/ViewModal";
import { getAPI } from "../network/index";

import { MdEditSquare, MdPreview } from "react-icons/md";




function ListData({ jobData, status, OpeningData }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const userId = localStorage.getItem("user_id")

    useEffect(() => {

    }, [])


    const openModal = (data) => {
        setSelectedData(data);
        setIsModalOpen(true);

    };
    const openViewModal = (data) => {
        setSelectedData(data);
        setIsViewModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedData(null);
        OpeningData()
    };
    const closeViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedData(null);

    };


    return (
        <>

            <p className='text-zinc-950 text-2xl p-4 mt-4 text-base sm:text-sm md:text-base lg:text-lg xl:text-xl'>{status} Openings</p>

            <div className='flex flex-wrap w-auto flex-col'>

                {

                    jobData?.map((item, i) => (

                        <div className="bg-white m-0 p-2 rounded-lg border border-gray-200 mb-4 shadow-md ">

                            <div className="flex items-center space-x-5 ">

                                <div className='w-full'>

                                    <div className="flex">
                                        <div>
                                            <h1>
                                                <b className="text-cyan-700 font-bold p-2">
                                                    {item?.job_title} (Job Id:{item.job_id})
                                                </b>
                                            </h1>
                                        </div>
                                        <div className=" flex flex-row ml-auto">

                                            {

                                                userId == item.user_id &&
                                                <MdEditSquare className="mr-2 cursor-pointer" onClick={() => openModal(item)} />
                                            }
                                            <MdPreview className="mr-2 cursor-pointer" onClick={() => openViewModal(item)} />


                                        </div>
                                    </div>



                                    <table className='mt-3 text-bold sm:w-90 md:w-4/5 lg:w-4/5'>
                                        <tr>
                                            <td className='w-36'>Description: </td>
                                            <td className='p-2'>{item?.job_description}</td>
                                        </tr>
                                        <hr></hr>
                                        <tr>
                                            <td>Budget: </td>
                                            <td className='p-2'>{item?.budget}LPA</td>
                                        </tr>
                                        <hr></hr>
                                        <tr>
                                            <td>Skills: </td>
                                            <td className='p-2'>
                                                <div className='flex flex-wrap'>
                                                    {
                                                        item?.skills?.map((t) => (
                                                            <div key={item.id} className='m-2 p-1 border rounded bg-[#dce7f8] text-sm  drop-shadow-md'>{t}</div>
                                                        ))
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                        <hr></hr>
                                        <tr>
                                            <td>Year of Experience: </td>
                                            <td className='p-2'>{item?.year_of_experience}</td>
                                        </tr>
                                        <hr></hr>
                                        <tr>
                                            <td>No of Positions: </td>
                                            <td className='p-2'>{item?.no_of_positions}</td>
                                        </tr>
                                        <hr></hr>
                                        <tr>
                                            <td>Status: </td>
                                            <td className='p-2'>{item?.status}</td>
                                        </tr>
                                        <hr></hr>
                                        <tr>
                                            <td>Qualification: </td>
                                            <td className='p-2'>{item?.edu_qualification}</td>
                                        </tr>
                                    </table>
                                </div>

                            </div>

                        </div>
                    ))
                }
            </div>

            {isModalOpen ? (
                <Modal data={selectedData} closeModal={closeModal} />
            ) : isViewModalOpen ? (
                <ViewModal data={selectedData} closeModal={closeViewModal} />
            ) : null}
        </>
    )
}

export default ListData