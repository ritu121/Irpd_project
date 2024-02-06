import { React, useState } from "react";
import { MdOutlineEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import RootLayout from "../Layout/RootLayout";
import Header from "../Layout/Header";
import { FaSearch } from "react-icons/fa";
import MediaQuery from "react-responsive";
import jsonData from "../../assets/data.json";
import Modal from "./Modal";
import ViewModal from "./ViewModal";


const Dashboard = () => {
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
  };
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedData(null);
  };

  return (
    <RootLayout>
      <Header />
      <div className="bg-white rounded-full border-none p-3 m-4 shadow-md relative z-1 bottom-10">
        <div className="flex items-center ">
          <FaSearch />
          <input
            type="text"
            placeholder="Search..."
            className="ml-3 focus:outline-none w-full"
          />
        </div>
      </div>
      {isModalOpen ? (
        <Modal data={selectedData} closeModal={closeModal} />
      ) : isViewModalOpen ? (
        <ViewModal data={selectedData} closeModal={closeViewModal} />
      ) : null}


      <div className="flex flex-wrap gap-4 items-stretch p-4 text-base sm:text-sm h-screen overflow-x-auto">
        {jsonData.map((item, index) => (
          <div
            key={index}
            className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[80%]"
          >
            <div >

              <div className="flex justify-center items-center space-x-5">
                <div>
                  <div className="flex">
                    <div>
                      <h1>
                        <b className="text-cyan-700 font-bold p-2">
                          {item.title}
                        </b>
                      </h1>
                    </div>
                    <div className=" flex flex-row ml-auto">

                      {/*icon functions  */}
                      <MdOutlineEdit className="mr-2" onClick={() => openModal(item)} />

                      <MdOutlineRemoveRedEye className="mr-2" onClick={() => openViewModal(item)} />



                    </div>
                  </div>

                  <table className="mt-3">
                    <tr>
                      <td>Description: </td> 
                      <td>{item.Descriptions}</td>
                    </tr>
                    <hr></hr>
                    <tr>
                      <td>Budject: </td>
                      <td>{item.Budject}LPA</td>
                    </tr>
                    <hr></hr>
                    <tr>
                      <td>Skills: </td>
                      <td>{item.Skills}</td>
                    </tr>
                    <hr></hr>
                    <tr>
                      <td>Year of Experience: </td>
                      <td>{item.Experience}</td>
                    </tr>
                    <hr></hr>
                    <tr>
                      <td>No of Positions: </td>
                      <td>{item.Positions}</td>
                    </tr>
                    <hr></hr>
                    <tr>
                      <td>Status: </td>
                      <td>{item.Status}</td>
                    </tr>
                    <hr></hr>
                    <tr>
                      <td>Qualification: </td>
                      <td>{item.Qualification}</td>
                    </tr>
                    <hr></hr>
                    <tr>
                      <td>Certification: </td>
                      <td>{item.Certification}</td>
                    </tr>
                    <hr></hr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </RootLayout>
  );
};

export default Dashboard;