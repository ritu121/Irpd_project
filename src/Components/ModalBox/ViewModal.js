import React, { useRef, useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Button from '../common/Button';
import { getAPI } from '../network';
import { TbPointFilled } from "react-icons/tb";

function ViewModal({ data, closeModal }) {
    const datepickerRef1 = useRef(null);
    const datepickerRef2 = useRef(null);
    const [candidates, setCandidates] = useState([])

    useEffect(() => {
        getCandidateByJob()

        const datepicker1 = flatpickr(datepickerRef1.current, {
            dateFormat: 'Y-m-d',
        });
        const datepicker2 = flatpickr(datepickerRef2.current, {
            dateFormat: 'Y-m-d',
        });
        return () => {
            datepicker1.destroy();
            datepicker2.destroy();
        };


    }, []);

    const handleOutsideClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };
    const handleCancelClick = () => {
        closeModal();
    };

    const getCandidateByJob = async () => {
        let Data = await getAPI(`/getCandidateByJob/${data.job_id}`)
        if (Data) {
            setCandidates(Data.data)
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-auto modal-overlay"
            onClick={handleOutsideClick}
        >
            <div className='flex justify-center min-w-screen p-4 mt-20 h-[80%] w-4/6 overflow-y-auto bg-white rounded-md'>
                <div className='w-full border-sky-500 w-5/6 rounded-lg'>
                    <p className='text-zinc-950 text-2xl p-5 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl text-center'>View Job Request</p>
                    <div className='grid m-2 p-5 w-full'>
                        <label for="JobTitle" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Job Title</label>
                        <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="title"
                            placeholder="Enter job title"
                            value={data?.job_title || ""} disabled />

                        <label for="Description" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Job Description</label>
                        <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                             text-base sm:text-sm " disabled placeholder="Please Enter Job Description" rows={5} value={data?.job_description || ""} ></textarea>
                        <label for="skills" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Skills</label>
                        <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " placeholder="Please Enter all Require Skills" value={data?.skills || ""} disabled ></textarea>

                        <label for="certification" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Certification</label>
                        <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                             text-base sm:text-sm " placeholder="Please Enter Certification Name" value={data?.certifications || ""} disabled></textarea>

                        <div className='grid grid-cols-2 gap-2 '>
                            <div className='w-50'>
                                <label for="Yexp" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Year of Experience</label>
                                <select className="form-control block text-base sm:text-sm w-full px-3 shadow-md text-base py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"disabled placeholder="Year of Experience" value={data?.year_of_experience || ""}>
                                    <option>Fresher</option>
                                    <option>1+</option>
                                    <option>2+</option>
                                    <option>3+</option>
                                    <option>4+</option>
                                </select>
                            </div>
                            <div className='w-50'>
                                <label for="noOfposition" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">No Of Position</label>
                                <input type="number" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="noPosition"
                                    placeholder="Number of Position" value={data?.no_of_positions || ""} disabled />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2 '>
                            <div className='w-50'>
                                <label for="qualification" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Qualification</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="qualification"
                                    placeholder="Enter Qualification" value={data?.edu_qualification || ""} disabled />
                            </div>
                            <div className='w-50'>
                                <label for="buget" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Budget</label>
                                <div className="relative  rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm" >LPA</span>
                                    </div>
                                    <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="0.00" value={data?.budget || ""} disabled />
                                    {/* <div class="absolute inset-y-0 right-0 flex items-center">
                                        <label for="currency" className="sr-only">Currency</label>
                                        <select id="currency" name="currency" className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                                            <option>RUP</option>
                                            <option>USD</option>
                                            <option>CAD</option>
                                            <option>EUR</option>
                                        </select>
                                    </div> */}
                                </div>
                            </div>
                        </div>



                        <div className='grid grid-cols-2 gap-2  '>
                            <div className='w-50'>
                                <label for="location" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Location</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="location" value={data?.location || ""}
                                    placeholder="Location" disabled />
                            </div>
                            <div className='w-50'>
                                <label for="client" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Client</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="cilent" value={data?.client_name || ""} disabled
                                    placeholder="Client Name" />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2  '>
                            <div className='w-50'>
                                <label for="hireType" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Hire Type</label>
                                <select className="form-control block text-base sm:text-sm w-full px-3  shadow-md text-base py-1.5  text-gray-700 bg-white bg-clip-padding border border-solid 
                                border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="hireType"
                                    value={data?.hire_type || ""} disabled>
                                    <option>Online</option>
                                    <option>Ofline</option>
                                </select>
                            </div>
                            <div className='w-50'>
                                <label for="status" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Status</label>
                                <select className="form-control block text-base sm:text-sm w-full px-3  shadow-md text-base py-1.5  text-gray-700 bg-white bg-clip-padding border border-solid 
                                border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Status"
                                    value={data?.status || ""} disabled>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                    <option>Open</option>
                                </select>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2 '>
                            <div className='w-50'>
                                <label htmlFor="datepicker" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Pick a Start Date:
                                </label>
                                <input
                                    type="text"
                                    id="datepicker"
                                    name="datepicker"
                                    placeholder="Select a date"
                                    disabled
                                    value={data?.start_date ? data.start_date.substring(0, 10) : null}
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm"
                                    ref={datepickerRef1}
                                />
                            </div>
                            <div className='w-50'>
                                <label htmlFor="datepicker" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Pick a Close Date:
                                </label>
                                <input
                                    type="text"
                                    id="datepicker"
                                    name="datepicker"
                                    disabled
                                    value={data?.target_date ? data.target_date.substring(0, 10) : null}
                                    placeholder="Select a date"
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm"
                                    ref={datepickerRef2}
                                />
                            </div>
                        </div>

                        <div className='flex w-[100%] mt-3 justify-center'>
                            <div className='w-[90%] h-4/5'>
                               
                                {/* <label htmlFor="candidate" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Candidates for Reference
                                </label> */}

                                {
                                    candidates[0]?.candidate_id!=null? (

                                        <table className="border-collapse border-black w-full">
                                            <caption className="caption-top font-bold text-orange-800 p-8">
                                                Candidates For Reference
                                            </caption>
                                            <thead>
                                                <tr className='border-2 border-black'>
                                                    <th className='border-2 border-black p-2 m-2 w-1/5'>Candidate Name</th>
                                                    <th className='border-2 border-black p-2 m-2 w-1/6'>Status</th>
                                                    <th className='border-2 border-black p-2 m-2 w-1/2'>Comment</th>
                                                </tr>
                                            </thead>
                                            <tbody className='border-2 p-5'>

                                                {
                                                    candidates.map(candidate => (
                                                        <tr key={candidate.candidate_id} className='border-2 border-amber-900 '>
                                                            <td className='border-2 border-black p-2 m-2 w-1/5 text-center'>{candidate.first_name} {candidate.last_name}</td>
                                                            <td className='border-2 border-black p-2 m-10 w-1/6 text-center' style={{color: candidate.status==='Selected'?'Green':candidate.status==='Rejected'?'Red':'blue', fontSize:'16px'}}>{candidate.status}</td>
                                                            <td className='border-2 border-black p-2 m-2 w-1/2' style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>{candidate.comments}</td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className='m-2 p-1 border rounded bg-fuchsia-100 text-sm drop-shadow-md'>No Candidates Referred</div>
                                    )
                                }

                            </div>
                        </div>
                        <div className='flex justify-center mt-3'>
                            <div className='w-5/12' onClick={handleCancelClick}> <Button title={'Cancel'} ></Button></div>
                        </div>



                        {/* <label for="Email" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm">Email</label>
                        <input type="email" value="irpd@email.com" className="form-control shadow-md block text-base sm:text-sm w-full px-3 py-1.5  text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
                            aria-describedby="emailHelp" placeholder="Enter Your Email." /> */}
                    </div>


                </div>
            </div>

        </div>



    );
}

export default ViewModal;