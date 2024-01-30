import React from 'react';
import RootLayout from '../Layout/RootLayout';
import Header from '../Layout/Header';
import { FaSearch } from "react-icons/fa";
import MediaQuery from 'react-responsive'

const Dashboard = () => {
 

  // useEffect(() => {
  //   if (isTabletMid) {
  //     setOpen(false);
  //   } else {
  //     setOpen(true);
  //   }
  // }, [isTabletMid]);


  return (
    <RootLayout>
      <Header />
      <div className="bg-white rounded-full border-none p-3 m-4 shadow-md relative z-1 bottom-10">
        <div className="flex items-center ">
          <FaSearch/>
          <input type="text" placeholder="Search..." className="ml-3 focus:outline-none w-full" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 items-stretch p-4 text-base sm:text-sm h-screen overflow-x-auto">
        <div className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[80%]">
          <div className="flex justify-center items-center space-x-5 h-full ">
            <div>
              <h1><b className='text-cyan-700 font-bold p-2'>Software Developer</b></h1>

              <table className='mt-3'>

                <tr>
                  <td>Description: </td>
                  <td>2+ years of experience in software development.Proficiency in Java,Python,
                    or similar programming languages,Strong problem-solving skills,Excellent communication skills.</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Budject: </td>
                  <td>500000 LPA</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Skills: </td>
                  <td>c language, Java core, React js, My Sq,c language, Java core, React js, My Sql</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Year of Experience: </td>
                  <td>2+ year</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>No of Positions: </td>
                  <td>5</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Status: </td>
                  <td>Active</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Qualification: </td>
                  <td>Bachelor's degree in Computer Science or related field.</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Certification: </td>
                  <td>Certified on Sap ABAP module, Workshop on machine learning.</td>
                </tr>
                <hr></hr>
              </table>
            </div>
          
          </div>
        </div>
        <div className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[80%]">
          <div className="flex justify-center items-center space-x-5 h-full">
            <div>
              <h1><b className='text-cyan-700 font-bold p-2'>Software Developer</b></h1>

              <table className='mt-3'>

                <tr>
                  <td>Description: </td>
                  <td>2+ years of experience in software development.Proficiency in Java,Python,
                    or similar programming languages,Strong problem-solving skills,Excellent communication skills.</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Budject: </td>
                  <td>500000 LPA</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Skills: </td>
                  <td>c language, Java core, React js, My Sql ,c language, Java core, React js, My Sql</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Year of Experience: </td>
                  <td>2+ year</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>No of Positions: </td>
                  <td>5</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Status: </td>
                  <td>Active</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Qualification: </td>
                  <td>Bachelor's degree in Computer Science or related field.</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Certification: </td>
                  <td>Certified on Sap ABAP module, Workshop on machine learning.</td>
                </tr>
                <hr></hr>
              </table>
            </div>
          
          </div>
        </div>
        <div className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[80%]">
          <div className="flex justify-center items-center space-x-5 h-full">
            <div>
              <h1><b className='text-cyan-700 font-bold p-2'>Software Developer</b></h1>

              <table className='mt-3'>

                <tr>
                  <td>Description: </td>
                  <td>2+ years of experience in software development.Proficiency in Java,Python,
                    or similar programming languages,Strong problem-solving skills,Excellent communication skills.</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Budject: </td>
                  <td>500000 LPA</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Skills: </td>
                  <td>c language, Java core, React js, My Sql ,c language, Java core, React js, My Sql</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Year of Experience: </td>
                  <td>2+ year</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>No of Positions: </td>
                  <td>5</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Status: </td>
                  <td>Active</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Qualification: </td>
                  <td>Bachelor's degree in Computer Science or related field.</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Certification: </td>
                  <td>Certified on Sap ABAP module, Workshop on machine learning.</td>
                </tr>
                <hr></hr>
              </table>
            </div>
          
          </div>
        </div>
        <div className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[80%]">
          <div className="flex justify-center items-center space-x-5 h-full">
            <div>
              <h1><b className='text-cyan-700 font-bold p-2'>Software Developer</b></h1>

              <table className='mt-3'>

                <tr>
                  <td>Description: </td>
                  <td>2+ years of experience in software development.Proficiency in Java,Python,
                    or similar programming languages,Strong problem-solving skills,Excellent communication skills.</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Budject: </td>
                  <td>500000 LPA</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Skills: </td>
                  <td>c language, Java core, React js, My Sql ,c language, Java core, React js, My Sql</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Year of Experience: </td>
                  <td>2+ year</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>No of Positions: </td>
                  <td>5</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Status: </td>
                  <td>Active</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Qualification: </td>
                  <td>Bachelor's degree in Computer Science or related field.</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Certification: </td>
                  <td>Certified on Sap ABAP module, Workshop on machine learning.</td>
                </tr>
                <hr></hr>
              </table>
            </div>
          
          </div>
        </div>
        <div className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[80%]">
          <div className="flex justify-center items-center space-x-5 h-full">
            <div>
              <h1><b className='text-cyan-700 font-bold p-2'>Software Developer</b></h1>

              <table className='mt-3'>

                <tr>
                  <td>Description: </td>
                  <td>2+ years of experience in software development.Proficiency in Java,Python,
                    or similar programming languages,Strong problem-solving skills,Excellent communication skills.</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Budject: </td>
                  <td>500000 LPA</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Skills: </td>
                  <td>c language, Java core, React js, My Sql ,c language, Java core, React js, My Sql</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Year of Experience: </td>
                  <td>2+ year</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>No of Positions: </td>
                  <td>5</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Status: </td>
                  <td>Active</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Qualification: </td>
                  <td>Bachelor's degree in Computer Science or related field.</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Certification: </td>
                  <td>Certified on Sap ABAP module, Workshop on machine learning.</td>
                </tr>
                <hr></hr>
              </table>
            </div>
          
          </div>
        </div>

        <div className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[80%]">
          <div className="flex justify-center items-center space-x-5 h-full">
            <div>
              <h1><b className='text-cyan-700 font-bold p-2'>Software Developer</b></h1>

              <table className='mt-3'>

                <tr>
                  <td>Description: </td>
                  <td>2+ years of experience in software development.Proficiency in Java,Python,
                    or similar programming languages,Strong problem-solving skills,Excellent communication skills.</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Budject: </td>
                  <td>500000 LPA</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Skills: </td>
                  <td>c language, Java core, React js, My Sql ,c language, Java core, React js, My Sql</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Year of Experience: </td>
                  <td>2+ year</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>No of Positions: </td>
                  <td>5</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Status: </td>
                  <td>Active</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Qualification: </td>
                  <td>Bachelor's degree in Computer Science or related field.</td>
                </tr>
                <hr></hr>
                <tr>
                  <td>Certification: </td>
                  <td>Certified on Sap ABAP module, Workshop on machine learning.</td>
                </tr>
                <hr></hr>
              </table>
            </div>
          
          </div>
        </div>
      </div>
    </RootLayout>

  )
}

export default Dashboard