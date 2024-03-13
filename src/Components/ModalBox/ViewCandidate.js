import React, { useRef, useState, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Button from '../common/Button';
import { getAPI } from '../network';


function ViewModal({ data, closeModal }) {
    const datepickerRef1 = useRef(null);
    const datepickerRef2 = useRef(null);

    const [prevExperience, setPrevExperience] = useState([])
    const [candidate_id, setCandidate_id] = useState(data?.candidate_id);
    const [jobs, setjobs] = useState([]);
    const [jobsTitle, setjobsTitle] = useState('');


    useEffect(() => {
        setCandidate_id(data?.candidate_id)
        GetPrevExperience()
        getJobs()
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



    }, [data]);

    const handleOutsideClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };
    const handleCancelClick = () => {
        closeModal();
    };

    const GetPrevExperience = async () => {
        let Data = await getAPI(`/getPrevious_Exp/${candidate_id}`)
        if (Data) {
            const data = Data.data
            setPrevExperience(data)
        }

    }
    const getJobs = async () => {
        let Data = await getAPI('/getJobs')
        if (Data) {
            setjobs(Data)
            jobs.map((item) => {
                if (item.job_id === data.job_id) {
                    console.log(item.job_id, "item----");
                    const title = item.job_title
                    setjobsTitle(title)
                    console.log(item.job_title, "jobsTitle");
                }
            })
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-auto modal-overlay"
            onClick={handleOutsideClick}
        >
            <div className='flex justify-center min-w-screen p-4 mt-6 h-5/6 w-4/6 overflow-y-auto bg-white rounded-md'>
                <div className='w-full border-sky-500 w-5/6 rounded-lg'>
                    <p className='text-zinc-950 text-2xl p-5 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl text-center'>Candidate Details</p>
                    <div className='grid m-2 p-5'>
                        {/* <label for="JobTitle" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Candidate Name</label> */}
                        <div className='grid grid-cols-3 gap-2 divide-x'>
                            <div>
                                <label for="name" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">First Name</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "

                                    name='first_name'
                                    placeholder="First Name"
                                    value={data?.first_name}
                                    disabled
                                />
                            </div>
                            <div>
                                <label for="name" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Middle Name</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    id="name"
                                    name='middle_name'
                                    placeholder="Middle Name"
                                    value={data?.middle_name}
                                    disabled
                                />
                            </div>
                            <div>
                                <label for="name" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Last Name</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    id="name"
                                    name='last_name'
                                    placeholder="Last Name"
                                    value={data?.last_name}
                                    disabled
                                />
                            </div>
                        </div>

                        <label for="skills" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Key Skills</label>
                        <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "name='key_skills' placeholder="Please Enter all Require Skills" value={data?.key_skills || ""} disabled ></textarea>
                        <label for="skills" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Other Skills</label>
                        <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "name='other_skills' placeholder="Please Enter all Require Skills" value={data?.other_skills || ""} disabled ></textarea>

                        <div className='grid grid-cols-2 gap-2 divide-x'>
                            <div className='w-50'>
                                <label for="Yexp" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Year of Experience</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    text-base sm:text-sm " name='year_of_experience'
                                    placeholder="experience" value={data?.year_of_experience || ""} disabled />
                            </div>
                            <div className='w-50'>
                                <label for="qualification" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Qualification</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " name='qualifications'
                                    placeholder="Enter Qualification" value={data?.qualifications || ""} disabled />
                            </div>

                        </div>

                        <div className='grid grid-cols-2 gap-2 divide-x'>


                            <div className='w-50'>
                                <label for="pAddress" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Permanent Address</label>
                                <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " name='permanent_address' placeholder="Permanent Address" value={data?.permanent_address || ""} disabled ></textarea>
                            </div>
                            <div className='w-50'>
                                <label for="cAddress" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Current Address</label>
                                <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " placeholder="Current Address" value={data?.current_address || ""} disabled ></textarea>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2 divide-x '>
                            <div className='w-50'>
                                <label for="cCompany" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Current Company</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="cilent" value={data?.current_company || ""} disabled
                                    placeholder="Current Company" />
                            </div>
                            <div className='w-50'>
                                <label for="designation" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Designation</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm"   value={data?.designation || ""} disabled
                                    placeholder="Designation" />
                            </div>
                        </div>

                        < div className='grid grid-cols-2 gap-2 divide-x '>
                            <div className='w-50'>
                                <label for="Role&Responsibilities" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Role & Responsibilities</label>
                                <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " placeholder="role & Responsibility" value={data?.roles_and_responsibilities || ""} disabled ></textarea>
                            </div>
                            <div className='w-50'>
                                <label for="currentCTC" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Current CTC</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "name="currentCTC"
                                    value={data?.current_ctc}
                                    placeholder="Current CTC" disabled />

                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2 divide-x '>
                            <div className='w-50'>
                                <label for="ExpCTC" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Expected CTC</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="cilent" value={data?.expected_ctc || ""} disabled
                                    placeholder="Expected CTC" />
                            </div>

                            <div className='w-50'>
                                <label for="noticePeriod" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Notice Period</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="location" value={data?.notice_period || ""}
                                    placeholder="notice period" disabled />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2 divide-x '>
                            <div className='w-50'>
                                <label htmlFor="datepicker" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Start Date:
                                </label>
                                <input
                                    type="text"
                                    id="datepicker"
                                    name="start_date"
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
                                    Last Working Date:
                                </label>
                                <input
                                    type="text"
                                    id="datepicker"
                                    name="datepicker"
                                    disabled
                                    value={data?.last_work_date ? data.last_work_date.substring(0, 10) : null}
                                    placeholder="Select a date"
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm"
                                    ref={datepickerRef2}
                                />
                            </div>
                        </div>
                        <div>
                            <label for="jobId" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Job Referance Id</label>
                            <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                name='jobId'
                                value={data.job_id}
                                disabled
                            />
                        </div>

                        {prevExperience.length > 0 &&

                            <div className='m-5'>

                                <div className='flex mt-3'  >
                                    <h6>Other Experience</h6>
                                    {/* <button title={'Add Experience'} onClick={AddExperience}>Addmore</button> */}
                                </div>
                                {
                                    prevExperience.map((item, i) => (

                                        <div className='border-2  p-5 mt-2'>

                                            <div className='flex justify-between'>
                                                <p>Experience {i + 1}</p>
                                            </div>

                                            <div className='grid grid-cols-2 gap-2 divide-x'>
                                                <div className='w-50'>
                                                    <label for="pAddress" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Company Name</label>
                                                    <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                                                        text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                                        ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                        text-base sm:text-sm "
                                                        value={item?.company || ''}
                                                        placeholder="Company"
                                                        name='company'
                                                        disabled
                                                    ></textarea>
                                                </div>
                                                <div className='w-50'>
                                                    <label for="cAddress" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Designation</label>
                                                    <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                                                        text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                                        ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                        text-base sm:text-sm "
                                                        value={item?.designation || ''}
                                                        placeholder="Designation"
                                                        name='designation'
                                                        disabled
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-2 gap-2 divide-x'>
                                                <div className='w-50'>
                                                    <label for="pAddress" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Year of Experience</label>
                                                    <select className="form-control block text-base sm:text-sm w-full px-3 shadow-md text-base py-1.5  
                                                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 
                                                            focus:text-gray-700 focus:bg-white focus:border-blue-600  focus:outline-none"
                                                        value={item?.year_of_experience || ''}
                                                        name="year_of_experience"
                                                        placeholder="Year of Experience"
                                                        disabled>
                                                        <option value='' disabled>{item.year_of_experience}</option>
                                                        <option>Fresher</option>
                                                        <option>1+</option>
                                                        <option>2+</option>
                                                        <option>3+</option>
                                                        <option>4+</option>
                                                    </select>
                                                </div>
                                                <div className='w-50'>
                                                    <label for="Role&Responsibilities" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Role & Responsibilities</label>
                                                    <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                                                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                                                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                                    text-base sm:text-sm "
                                                        value={item?.roles_and_responsibilities || ''}
                                                        placeholder="role & Responsibility"
                                                        name='roles_and_responsibilities'
                                                        disabled
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-2 gap-2 divide-x '>
                                                <div className='w-50'>
                                                    <label htmlFor="startDate" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                                        Start Date:
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="startDate"
                                                        name="start_date"
                                                        placeholder="Select a date"
                                                        value={item?.start_date ? item.start_date.substring(0, 10) : null}
                                                        disabled
                                                        className="form-control shadow-md block  w-full px-3 py-1.5  
                                                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                                text-base sm:text-sm"
                                                    // ref={datepickerRef11}
                                                    />
                                                </div>
                                                <div className='w-50'>
                                                    <label htmlFor="lastWorkingDate" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                                        Last Working Date:
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="lastWorkingDate"
                                                        name="last_work_date"
                                                        disabled
                                                        value={item?.last_work_date ? item.last_work_date.substring(0, 10) : null}
                                                        placeholder="Select a date"
                                                        className="form-control shadow-md block  w-full px-3 py-1.5  
                                                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                                text-base sm:text-sm"
                                                    // ref={datepickerRef22}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>

                        }













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