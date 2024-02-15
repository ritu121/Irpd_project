import React, { useState } from 'react'
import RootLayout from '../Layout/RootLayout';
import candidateData from '../../assets/data.json'
import Button from '../common/Button';
import { MdEditSquare, MdPreview } from "react-icons/md";
import Modal from "../ModalBox/Modal";
import ViewCadidateModal from "../ModalBox/ViewCandidate";
import AddCandidateModal from '../ModalBox/AddCandidateModal';




function Candidates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddCModalOpen, setIsAddCModalOpen] = useState(false);
  const userId =localStorage.getItem("user_id")

  console.log('UserId',JSON.parse(userId))

  const openModal = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };
  const openViewModal = (data) => {
    setSelectedData(data);
    setIsViewModalOpen(true);
  };
  const openAddCandidateModal=()=>{
    setIsAddCModalOpen(true)
  }


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedData(null);
  };

  const closeAddCandidateModal=()=>{
    setIsAddCModalOpen(false)
  }

  return (
    <RootLayout>
      <div className='flex item-center justify-between'>
        <p className='text-zinc-950 text-2xl p-4 mt-4 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl'
         >Candidates</p>

        <div onClick={()=>openAddCandidateModal()}>
          <Button title={'Add Candidate'} ></Button>
          </div>
      </div>

      <div className='flex flex-wrap w-auto'>
        {
          candidateData.map((item) => (

            <div class="max-w-sm rounded overflow-hidden shadow-lg grow m-3" >
              <div className="flex">
                <div>
                  <h1>
                    <b className="text-cyan-700 font-bold p-2">
                    {item.name}
                    </b>
                  </h1>
                </div>
                <div className=" flex flex-row ml-auto">
                  {
                    userId == item.user_id &&
                    <MdEditSquare className="mr-2 cursor-pointer" onClick={() => openModal(item)}/>
                  }
                  <MdPreview className="mr-2 cursor-pointer" onClick={() => openViewModal(item)} />
              </div>
              </div>
              <div class="px-5 py-3">
                <p class="text-gray-700 text-base">
                  Key Skills :- {item.keySkills}
                </p>
                <p class="text-gray-700 text-base">
                  Experience :- {item.experience}
                </p>
              </div>
              {/* <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
          </div> */}
            </div>

          ))
        }
      </div>

      {isModalOpen ? (
        <Modal data={selectedData} closeModal={closeModal}/>
      ) : isViewModalOpen ? (
        <ViewCadidateModal data={selectedData} closeModal={closeViewModal}/>
      ) : isAddCModalOpen?(
        <AddCandidateModal closeModal={closeAddCandidateModal}/>
      ):null}


    </RootLayout>
  )
}

export default Candidates;