import React, { useEffect, useState } from 'react';

import RootLayout from '../Layout/RootLayout'
import allSkills from '../../assets/skills.json'
import Button from '../common/Button';
import { getAPI, deleteAPI, postAPI } from '../network';
import ConfirmationModal from '../common/ConfirmationModal';
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';

const toastObj = { position: "top-right" };

function Skills() {
    const [skills, setSkills] = useState([]);
    const [isAddSModalOpen, setIsAddSModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [message, setmessage] = useState("");
    const [skillName, setSkillName] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [skill_id, setSkillId] = useState(0);





    useEffect(() => {
        getSkillsData()
    }, [])


    const getSkillsData = async () => {
        let Data = await getAPI('/getSkills')
        if (Data) {
            setSkills(Data)
        }
    }

    const deleteSkill = async (id) => {
        let Data = await deleteAPI(`/deleteSkills/${id}`,)
        if (Data) {
            getSkillsData()
        }
    }

    const handleSubmit = async (e) => {

        const data = {
            skill_name: skillName
        }

        e.preventDefault();
        try {

            let Data = await postAPI('/addSkills', data)
            if (Data) {
                closeSkillModal();
                getSkillsData()
            }

        } catch (error) {
            toast.error("Please Try Again", toastObj);
        }

    }

    const openAddSkillModal = () => {
        setIsAddSModalOpen(true)
        setIsViewModalOpen(false)
        setIsEditModalOpen(false)

    }

    const openEditSkillModal = (data) => {
        setIsEditModalOpen(true)
        setIsAddSModalOpen(false)
        setIsViewModalOpen(false)



    }
    const openViewSkillModal = (data) => {
        setIsEditModalOpen(false)
        setIsAddSModalOpen(false)
        setIsViewModalOpen(true)

    };

    const closeSkillModal = () => {
        setIsAddSModalOpen(false);
        setIsViewModalOpen(false)
        setIsEditModalOpen(false)
    };

    const OpenAlert = (skill_id) => {
        setSkillId(skill_id)
        setmessage('Are you sure, you want to Delete skills ?')
        setAlertOpen(true);
    };

    const closeAlert = () => {
        setAlertOpen(false);
    };

    const handleConfirm = () => {
        closeAlert();
        deleteSkill(skill_id)
    };

    const handleOutsideClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            closeSkillModal();
        }
    };
    const handleCancelClick = () => {
        closeSkillModal();
    };

    return (
        <RootLayout>

            <div className='flex item-center justify-between'>
                <p className='text-zinc-950 text-2xl p-4 mt-4 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl'
                >Skills</p>

                <div onClick={() => openAddSkillModal()}>
                    <Button title={'Add Skills'} ></Button>
                </div>
            </div>

            <div className='flex flex-wrap w-auto'>
                {
                    skills.map((item) => (

                        <div class="max-w-sm rounded overflow-hidden shadow-lg grow m-3" >
                            <div className="flex justify-end">
                                <IoClose style={{ color: '#b70303' }} className="mr-2 cursor-pointer sm:text-xl" onClick={() => OpenAlert(item.skill_id)} />
                            </div>
                            <div className="flex justify-center ">
                                <div>
                                    <h1 className='p-2'>
                                        <b className="text-cyan-700 font-bold ">
                                            {item.skill_name}
                                        </b>
                                    </h1>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>

            {isAddSModalOpen ? (
                // <EditCandidateModal data={selectedData} closeModal={closeModal}/>

                <div
                    className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-auto modal-overlay"
                    onClick={handleOutsideClick}>
                    <div className='flex justify-center min-w-screen p-4 mt-6 h-3/6  overflow-y-auto bg-white rounded-md sm:w-90 md:w-2/5 lg:w-2/5'>
                        <form className='w-full border-sky-500  rounded-lg' onSubmit={handleSubmit}>
                            <p className='text-zinc-950 text-2xl p-5 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl text-center'>Add New Skill</p>
                            <div className='grid m-2 p-5'>
                                {/* <label for="JobTitle" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Candidate Name</label> */}
                                <div className='grid divide-x'>
                                    <div>
                                        <label for="name" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Skill Name</label>
                                        <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                            text-base sm:text-sm "

                                            name='skill_name'
                                            placeholder="Skill Name"
                                            value={skillName}
                                            onChange={(e) => {
                                                setSkillName(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='flex justify-between mt-12'>
                                    <div className='w-5/12'> <Button title={'Submit'} type="submit"></Button></div>
                                    <div className='w-5/12' onClick={handleCancelClick} > <Button title={'Cancel'}></Button></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


            ) : isViewModalOpen ? (
                <></>
                // <ViewCadidateModal data={selectedData} closeSkillModal={closeViewModal} />
            ) : isEditModalOpen ? (
                <></>
                // <AddCandidateModal closeSkillModal={closeAddCandidateModal} />
            ) : null}

            <ConfirmationModal show={alertOpen} onClose={closeAlert} onConfirm={handleConfirm} message={message} />

        </RootLayout>
    )
}



export default Skills