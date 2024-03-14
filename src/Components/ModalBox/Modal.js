import React, { useRef, useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Button from '../common/Button';
import { patchAPI } from '../network';

function Modal({ data, closeModal }) {
    const datepickerRef1 = useRef(null);
    const datepickerRef2 = useRef(null);

    const [formData, setFormData] = useState({
        job_id:data?.job_id || '',
        job_title: data?.job_title || '',
        job_description: data?.job_description || '',
        skills: data?.skills || '',
        certifications: data?.certifications || '',
        year_of_experience: data?.year_of_experience || 'Fresher',
        no_of_positions: data?.no_of_positions || '',
        budget: data?.budget || '',
        edu_qualification: data?.edu_qualification || '',
        location: data?.location || '',
        client_name: data?.client_name || '',
        hire_type: data?.hire_type || '',
        start_date: data?.start_date || '',
        target_date: data?.target_date || '',
        status: data?.status || '',
        user_id:data?.user_id || '',

    });

    useEffect(() => {
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };
    

    const handleSubmit=async(e)=>{
        e.preventDefault(); 
        
        let data = await  patchAPI('/updateJob',formData);
        if(data){
            closeModal();
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-auto modal-overlay"
            onClick={handleOutsideClick}
        >
            <div className='flex justify-center min-w-screen p-4 h-[90%] w-4/6  overflow-y-auto bg-white rounded-md'>
                <div className='w-full border-sky-500 w-5/6  rounded-lg'>
                    <p className='text-zinc-950 text-2xl p-5 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl text-center'>Update Job Request</p>
                    <form className='grid m-2 p-5' onSubmit={handleSubmit}> 

                        <label for="JobTitle" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Job Title</label>
                        <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="title"
                            name="job_title"
                            placeholder="Enter job title"
                            value={formData?.job_title || ""}
                            onChange={handleChange} />

                        <label for="Description" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Job Description</label>
                        <textarea class="caret-pink-500 ..." className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                             text-base sm:text-sm " placeholder="Please Enter Job Description" id="Descriptions" rows={5} name="job_description" value={formData?.job_description || ""} onChange={handleChange}
                        ></textarea>
                        <label for="skills" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Skills</label>
                        <textarea class="caret-pink-500 ..." className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                             text-base sm:text-sm " placeholder="Please Enter all Require Skills" name="skills" value={formData?.skills || ""} onChange={handleChange}
                        ></textarea>

                        <label for="certification" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Certification</label>
                        <textarea class="caret-pink-500 ..." className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                             text-base sm:text-sm " placeholder="Please Enter Certification Name" name="certifications" value={formData?.certifications || ""} onChange={handleChange} ></textarea>

                        <div className='grid grid-cols-2 gap-2 '>
                            <div className='w-50'>
                                <label for="Yexp" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Year of Experience</label>
                                <select className="form-control block text-base sm:text-sm w-full px-3 shadow-md text-base py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600  focus:outline-none" name="year_of_experience" placeholder="Year of Experience" value={formData?.year_of_experience || ""} onChange={handleChange}>
                                    <option value='' disabled>Select Option</option>
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
                            text-base sm:text-sm " id="noPosition" name="no_of_positions"
                                    placeholder="Number of Position" value={formData?.no_of_positions || ""} onChange={handleChange} />
                            </div>
                        </div>

                        {/* <div className='grid grid-cols-2 gap-2  '> */}
                            {/* <div className='w-50'>
                                <label for="Gender" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Gender</label>
                                <select value={formData?.gender || ""} className="form-control block text-base sm:text-sm w-full px-3  shadow-md text-base py-1.5  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Gender" name='gender' onChange={handleChange}>
                                    <option>Any</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div> */}
                            
                        {/* </div> */}

                        <div className='grid grid-cols-2 gap-2  '>
                            <div className='w-50'>
                                <label for="qualification" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Qualification</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="qualification" name="edu_qualification"
                                    placeholder="Enter Qualification"
                                    value={formData?.edu_qualification || ""}
                                    onChange={handleChange} />
                            </div>
                            <div className='w-50'>
                                <label for="budget" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Budget</label>
                                <div class="relative  rounded-md shadow-sm">
                                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span class="text-gray-500 sm:text-sm">LPA</span>
                                    </div>
                                    <input type="text" name="budget" id="price" class="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="0.00"
                                        value={data?.budget || ""}
                                        onChange={handleChange} />
                                    {/* <div class="absolute inset-y-0 right-0 flex items-center">
                                        <label for="currency" class="sr-only">Currency</label>
                                        <select id="currency" name="currency" class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
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
                            text-base sm:text-sm "
                                    name='location'
                                    id="location"
                                    placeholder="Location"
                                    value={formData?.location || ""}
                                    onChange={handleChange} />
                            </div>
                            <div className='w-50'>
                                <label for="client" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Client</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="cilent"
                            name='client_name'
                                    placeholder="Client Name"
                                    value={formData?.client_name || ""}
                                    onChange={handleChange} />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2  '>
                            <div className='w-50'>
                                <label for="hireType" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Hire Type</label>
                                <select className="form-control block text-base sm:text-sm w-full px-3  shadow-md text-base py-1.5  text-gray-700 bg-white bg-clip-padding border border-solid 
                                border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                 name='hire_type'
                                 placeholder="hireType"
                                 value ={formData?.hire_type || ""} 
                                 onChange={handleChange}
                                 >
                                    <option value='' disabled>Select option</option>
                                    <option>Online</option>
                                    <option>Ofline</option>
                                </select>
                            </div>
                            <div className='w-50'>
                                <label for="status" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Status</label>
                                <select className="form-control block text-base sm:text-sm w-full px-3  shadow-md text-base py-1.5  text-gray-700 bg-white bg-clip-padding border border-solid 
                                border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                placeholder="Status"
                                name='status'
                                value ={formData?.status || ""} 
                                 onChange={handleChange}>
                                    <option value='' disabled>Select option</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                    <option>Open</option>
                                </select>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2  '>
                            <div className='w-50'>
                                <label htmlFor="datepicker" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Pick a Start Date:
                                </label>
                                <input
                                    type="text"
                                    id="datepicker"
                                    name="datepicker"
                                    placeholder="Select a date"
                                    value ={data?.start_date || ""}
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
                                    placeholder="Select a date"
                                    value ={formData?.target_date || ""}
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm"
                                    ref={datepickerRef2}
                                />
                            </div>
                        </div>
                        <div className='flex justify-center mt-3'>
                            <div className='w-5/12'> <Button title={'Submit'} type="submit"></Button></div>
                        </div>
                        <div className='flex justify-center mt-3'>
                            <div className='w-5/12' onClick={handleCancelClick}> <Button title={'Cancel'}></Button></div>
                        </div>

                        {/* <label for="Email" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm">Email</label>
                        <input type="email" value="irpd@email.com" className="form-control shadow-md block text-base sm:text-sm w-full px-3 py-1.5  text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
                            aria-describedby="emailHelp" placeholder="Enter Your Email." /> */}
                    </form>


                </div>
            </div>

        </div>



    );
}

export default Modal;