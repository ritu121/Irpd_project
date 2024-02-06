import { React, useEffect, useState } from 'react';
import Modal from "../Pages/Modal";
import ViewModal from "../Pages/ViewModal";
import { getAPI } from "../network/index";
import Searchbar from "../common/Searchbar.js";
import { MdEditSquare,MdPreview  } from "react-icons/md";



function ListData() {

    const [jobData, setJobData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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
        getJobData()
    };
    const closeViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedData(null);
        getJobData()
    };

    useEffect(() => {

        getJobData()

    }, []);

    const getJobData = async () => {
        let Data = await getAPI('/getJobs')
        if (Data) {
            setJobData(Data)
        }
    }

    return (
        <>
        <Searchbar />
            
            <div className="flex flex-col gap-4 items-stretch p-4 text-base sm:text-sm mt-4">
            {
                    jobData?.map((item, i) => (

                        <div className="bg-white m-0 p-6  font-normal rounded-lg border border-gray-200 mb-4 shadow-md lg:w-[80%] md:w-[80%] sm:w-[100%]">

                            <div className="flex items-center space-x-5 ">

                                <div className='w-full'>

                                    <div className="flex">
                                        <div>
                                            <h1>
                                                <b className="text-cyan-700 font-bold p-2">
                                                    {item?.job_title}
                                                </b>
                                            </h1>
                                        </div>
                                        <div className=" flex flex-row ml-auto">


                                            <MdEditSquare className="mr-2 cursor-pointer" onClick={() => openModal(item)} />

                                            <MdPreview  className="mr-2 cursor-pointer" onClick={() => openViewModal(item)} />
                                        </div>
                                    </div>



                                    <table className='mt-3 '>
                                        <tr>
                                            <td>Description: </td>
                                            <td className='p-2'>{item?.job_description}</td>
                                        </tr>
                                        <hr></hr>
                                        <tr>
                                            <td>Budject: </td>
                                            <td className='p-2'>{item?.budget}LPA</td>
                                        </tr>
                                        <hr></hr>
                                        <tr>
                                            <td>Skills: </td>
                                            <td className='p-2'>{item?.skills}</td>
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
                                        <hr></hr>
                                        {/* <tr>
                                            <td>Certification: </td>
                                            <td className='p-2'>{item?.certifications}</td>
                                        </tr> */}
                                        <hr></hr>
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