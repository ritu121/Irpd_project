import { React, useEffect, useState } from 'react';
import Modal from "../ModalBox/Modal";
import ViewModal from "../ModalBox/ViewModal";
import { getAPI } from "../network/index";
import { FaSearch } from "react-icons/fa";
import { MdEditSquare, MdPreview } from "react-icons/md";




function ListData() {

    const [jobData, setJobData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const userId =localStorage.getItem("user_id")
   

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
    
    const SearchJob=async(e)=>{
        
        const input=e.target.value

        let Data = await getAPI(`/search?name=${input}`)
        if (Data) {
             setJobData(Data.data)
        }
    }

    return (
        <>
            <div className="bg-white rounded-full border-none p-3 m-4 shadow-md  z-1 ">
                <div className="flex items-center ">
                    <FaSearch />
                    <input type="text" placeholder="Search..." className="ml-3 focus:outline-none w-full"  onChange={(e)=>{SearchJob(e)}}/>
                </div>
            </div>
             <p className='text-zinc-950 text-2xl p-4 mt-4 text-base sm:text-sm md:text-base lg:text-lg xl:text-xl'>Current Openings</p>

            <div className="flex flex-col gap-4 items-stretch p-4 text-base sm:text-sm mt-4">
           
                {
                    jobData?.map((item, i) => (
                       
                        <div className="bg-white m-0 p-6 rounded-lg border border-gray-200 mb-4 shadow-md lg:w-[80%] md:w-[80%] sm:w-[100%]">

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



                                            {
                                               
                                                userId == item.user_id &&
                                                <MdEditSquare className="mr-2 cursor-pointer" onClick={() => openModal(item)} />
                                            }
                                            <MdPreview className="mr-2 cursor-pointer" onClick={() => openViewModal(item)} />

                                            
                                        </div>
                                    </div>



                                    <table className='mt-3 text-bold'>
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