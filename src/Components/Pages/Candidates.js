import React, { useEffect, useState } from 'react'
import RootLayout from '../Layout/RootLayout';
import candidateData from '../../assets/data.json'
import Button from '../common/Button';
import { MdEditSquare, MdPreview } from "react-icons/md";
import Modal from "../ModalBox/Modal";
import ViewCadidateModal from "../ModalBox/ViewCandidate";
import AddCandidateModal from '../ModalBox/AddCandidateModal';
import EditCandidateModal from '../ModalBox/EditCandidateModal';
import { deleteAPI, getAPI ,getExportAPI} from "../network/index";
import { BASE_URL } from '../../constant';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from '../common/ConfirmationModal';

import { color } from 'framer-motion';


function Candidates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddCModalOpen, setIsAddCModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [candidate, setCandidate] = useState({});
  const [message, setmessage] = useState("");
  const [action, setAction] = useState("");


  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    getCandidateData()
  }, [])

  // const openModal = (data) => {
  //   setSelectedData(data);
  //   setIsModalOpen(true);
  //   setIsViewModalOpen(false);
  // };


  const openViewModal = (data) => {
    setSelectedData(data);
    setIsViewModalOpen(true);
    setIsModalOpen(false);
  };


  const openAddCandidateModal = () => {
    setIsAddCModalOpen(true)
  }

  const openEditModal = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
    setIsViewModalOpen(false);
    setIsAddCModalOpen(false);
    getCandidateData()
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
    setIsAddCModalOpen(false);
    getCandidateData()
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedData(null);
  };

  const closeAddCandidateModal = () => {
    setIsAddCModalOpen(false)
    getCandidateData()
  }



  const OpenAlert = (item,txt) => {
     setAction(txt)
    if(action==='download'){
      setmessage('Do you want to Download Resume ?')
    }else{
      setmessage('Are you sure, you want to Delete Candidate ?')
    }
    setAlertOpen(true);
    setCandidate(item)
  };



  const closeAlert = () => {
    setAlertOpen(false);
  };


  const handleConfirm = () => {
    closeAlert();
    if(action === 'download'){
      downloadResume(candidate.filename,candidate.first_name+''+candidate.last_name+''+ candidate.filename.substr(candidate.filename.indexOf('.')))
    }else{
      deleteCandidate(candidate.candidate_id)
    }
  };

 

  const downloadResume = async(filename,candidate_name) => {
    // let Data=await getExportAPI(`/download/${filename}`)
    fetch(`${BASE_URL}/download/${filename}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
    },
  })
  .then((response) => response.blob())
  .then((blob) => {
    // Create blob link to download
    const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      candidate_name,
    );
    
    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  });
    
  }

  const deleteCandidate=async(id)=>{
    let Data = await deleteAPI(`/deleteCandidates/${id}`,)
    if (Data) {
      getCandidateData()
    } 
  }

  const getCandidateData = async () => {
    let Data = await getAPI('/getCandidates')
    if (Data) {
      setCandidates(Data)
    }
  }

  

  return (
    <RootLayout>
      <div className='flex item-center justify-between'>
        <p className='text-zinc-950 text-2xl p-4 mt-4 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl'
        >Candidates</p>

        <div onClick={() => openAddCandidateModal()}>
          <Button title={'Add Candidate'} ></Button>
        </div>
      </div>

      <div className='flex flex-wrap w-auto'>
        {
          candidates.map((item) => (

            <div class="max-w-sm rounded overflow-hidden shadow-lg grow m-3" >
              <div className="flex">
                <div>
                  <h1>
                    <b className="text-cyan-700 font-bold p-2">
                      {item.first_name}  {item.middle_name}  {item.last_name}
                    </b>
                  </h1>
                </div>
                <div className=" flex flex-row ml-auto">
                  {
                    userId == item.user_id &&
                    <MdEditSquare style={{color:'#04ad3c'}} className="mr-2 cursor-pointer" onClick={() => openEditModal(item)} />
                  }
                  <FaCloudDownloadAlt style={{color:'#0370c9'}} className="mr-2 cursor-pointer" onClick={()=>OpenAlert(item,'download')} />
                  <MdDelete style={{color:'#b70303'}} onClick={()=>OpenAlert(item,'delete')} />
                </div>
              </div>
              <div class="px-5 py-3" onClick={() => openViewModal(item)}>
                <p class="text-gray-700 text-base">
                  Key Skills :- {item.key_skills}
                </p>
                <p class="text-gray-700 text-base">
                  Experience :- {item.year_of_experience}
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
        <EditCandidateModal data={selectedData} closeModal={closeModal} />
      ) : isViewModalOpen ? (
        <ViewCadidateModal data={selectedData} closeModal={closeViewModal} />
      ) : isAddCModalOpen ? (
        <AddCandidateModal closeModal={closeAddCandidateModal} />
      ) : null}

      
    <ConfirmationModal show={alertOpen} onClose={closeAlert} onConfirm={handleConfirm} message={message}/>

    </RootLayout>
  )
}

export default Candidates;