import React, { useRef, useEffect, useState } from 'react';
import RootLayout from '../Layout/RootLayout';
import Header from '../Layout/Header';
import { toast } from 'react-toastify';
import { postAPI } from '../network';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css'; // Import the CSS file
import Button from '../common/Button';


function NewRequest() {

    const userId = localStorage.getItem("user_id")

    const datepickerRef1 = useRef(null);
    const datepickerRef2 = useRef(null);


    const [value, setValue] = useState({
        title: "",
        description: '',
        skills: '',
        certification: '',
        yexp: '',
        position: '',
        buget: '',
        qualification: '',
        location: '',
        status: '',
        hiretype: '',
        client: '',
        sDate: '',
        eDate: ''
    })


    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        // Use a callback to update the state based on the input type
        setValue((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? e.target.checked : value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!datepickerRef1.current.value || !datepickerRef2.current.value) {
            // Handle the case where the date is not selected
            toast.error('Please select a date');
            return;
        }

        const formdata = {
            "job_title": value?.title,
            "job_description": value?.description,
            "edu_qualification": value?.qualification,
            "budget": value?.buget,
            "skills": value?.skills,
            "year_of_experience": value?.yexp,
            "certifications": value?.certification,
            "status": value?.status,
            "no_of_positions": value?.position,
            "hire_type": value?.hiretype,
            "start_date": datepickerRef1?.current?.value,
            "target_date": "2024-01-26",
            "closed_date": datepickerRef1?.current?.value,
            "client_name": value?.client,
            "location": value?.location,
            'user_id': userId
        }
        console.log('Form submitted:', formdata);

        let data = await postAPI('/addJob', formdata);
        if (data) {
            clearAll()
        }

        // You can add your form submission logic here  
    };
    const clearAll = () => {
        setValue({
            title: "",
            description: '',
            skills: '',
            certification: '',
            yexp: '',
            position: '',
            buget: '',
            qualification: '',
            location: '',
            status: '',
            hiretype: '',
            client: '',
            sDate: '',
            eDate: ''
        })

    }

    useEffect(() => {

        const datepicker1 = flatpickr(datepickerRef1.current, {
            dateFormat: 'Y-m-d', // Customize the date format
            // Add more options as needed
        });
        const datepicker2 = flatpickr(datepickerRef2.current, {
            dateFormat: 'Y-m-d', // Customize the date format
            // Add more options as needed
        });
        return () => {
            datepicker1.destroy();
            datepicker2.destroy();
        };
    }, []);
    return (
        <RootLayout>
            <div className='flex justify-center min-h-full p-5 mt-4 '>
                <div className='w-11/12 border-sky-500 shadow-md rounded-lg  bg-white'>
                    <p className='text-zinc-950 text-2xl p-4 mt-4 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl'>Register New Request</p>
                    <form className='grid m-2 p-5' onSubmit={handleSubmit}>
                        <label for="JobTitle" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Job Title</label>
                        <input
                            type="text"
                            className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                            id="title"
                            name='title'
                            placeholder="Enter job title"
                            value={value.title}
                            onChange={handleInputChange}
                            required />

                        <label for="Description" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Job Description</label>
                        <textarea
                            className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm"
                            placeholder="Please Enter Job Description"
                            name='description'
                            value={value.description}
                            onChange={handleInputChange}
                            required>
                        </textarea>
                        <label for="skills" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Skills</label>
                        <textarea
                            className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                             text-base sm:text-sm "
                            placeholder="Please Enter all Require Skills"
                            name='skills'
                            value={value.skills}
                            required
                            onChange={handleInputChange}></textarea>

                        <label for="certification" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Certification</label>
                        <textarea
                            className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                             text-base sm:text-sm "
                            placeholder="Please Enter Certification Name"
                            name='certification'
                            value={value.certification}
                            onChange={handleInputChange} required ></textarea>

                        <div className='grid grid-cols-2 gap-2 divide-x '>
                            <div className='w-50'>
                                <label for="Yexp" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Year of Experience</label>
                                <select className="form-control block text-base sm:text-sm w-full px-3 shadow-md text-base py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Year of Experience"
                                    name='yexp'
                                    value={value.yexp}
                                    onChange={handleInputChange} required>
                                    <option value="" disabled>Select Experience</option>
                                    <option>Fresher</option>
                                    <option>1+</option>
                                    <option>2+</option>
                                    <option>3+</option>
                                    <option>4+</option>
                                </select>
                            </div>
                            <div className='w-50'>
                                <label for="noOfposition" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">No Of Position</label>
                                <input
                                    type="number"
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    text-base sm:text-sm " id="noPosition"
                                    placeholder="Number of Position"
                                    name='position'
                                    value={value.position}
                                    onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2 divide-x '>
                            <div className='w-50'>
                                <label for="qualification" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Qualification</label>
                                <input
                                    type="text"
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    text-base sm:text-sm "
                                    id="qualification"
                                    placeholder="Enter Qualification"
                                    name='qualification'
                                    value={value.qualification}
                                    onChange={handleInputChange} required />
                            </div>
                            <div className='w-50'>
                                <label for="buget" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Buget</label>
                                <div className="relative  rounded-md shadow-sm">

                                    <input type="text"
                                        id="price" className="block w-full rounded-md border-0 py-1.5 pl-12 pr-10 text-gray-900 ring-1 sm:w-50
                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="0.00"
                                        name="buget"
                                        value={value.buget}
                                        onChange={handleInputChange} required />

                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">LPA</span>
                                    </div>
                                    {/* <div class="absolute inset-y-0 right-0 flex items-center">
                                        <label for="currency" className="sr-only">Currency</label>
                                        <select id="currency" name="currency" className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" required>
                                        <option value="" disabled>Select Currency</option>
                                            <option>RUP</option>
                                            <option>USD</option>
                                            <option>CAD</option>
                                            <option>EUR</option>
                                        </select>
                                    </div> */}
                                </div>
                            </div>
                        </div>


                        <div className='grid grid-cols-2 gap-2 divide-x '>
                            <div className='w-50'>
                                <label for="location" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Location</label>
                                <input type="text"
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    text-base sm:text-sm "
                                    id="location"
                                    placeholder="Location"
                                    name='location'
                                    value={value.location}
                                    onChange={handleInputChange} required />
                            </div>
                            <div className='w-50'>
                                <label for="client" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Client</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    text-base sm:text-sm " id="cilent"
                                    placeholder="Client Name"
                                    value={value.client}
                                    name='client'
                                    onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2 divide-x '>
                            <div className='w-50'>
                                <label for="hireType" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Hire Type</label>
                                <select className="form-control block text-base sm:text-sm w-full px-3  shadow-md text-base py-1.5  text-gray-700 bg-white bg-clip-padding border border-solid 
                                     border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="hireType"
                                    name='hiretype'
                                    value={value.hiretype}
                                    onChange={handleInputChange} required >
                                    <option value='' disabled>Select Option</option>
                                    <option>Online</option>
                                    <option>Ofline</option>
                                </select>
                            </div>
                            <div className='w-50'>
                                <label for="status" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Status</label>
                                <select
                                    className="form-control block text-base sm:text-sm w-full px-3  shadow-md text-base py-1.5  text-gray-700 bg-white bg-clip-padding border border-solid 
                                    border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Status"
                                    value={value.status}
                                    name='status'
                                    onChange={handleInputChange} required >
                                    <option value='' disabled >Select Option</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                    <option>Open</option>
                                </select>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2 divide-x '>
                            <div className='w-50'>
                                <label htmlFor="datepicker" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Pick a Start Date:
                                </label>
                                <input
                                    type="date"
                                    id="datepicker"
                                    name="datepicker1"
                                    value={value.sDate}
                                    placeholder="Select a date"
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    text-base sm:text-sm"
                                    ref={datepickerRef1}
                                    required
                                />
                            </div>
                            <div className='w-50'>
                                <label htmlFor="datepicker" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Pick a Close Date:
                                </label>
                                <input
                                    type="date"
                                    id="datepicker"
                                    name="datepicker2"
                                    value={value.eDate}
                                    placeholder="Select a date"
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                        text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                        ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                        text-base sm:text-sm"
                                    ref={datepickerRef2}
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex justify-center mt-3'>
                            <div className='w-5/12'> <Button title={'Submit'} type="submit"></Button></div>
                        </div>

                    </form>


                </div>
            </div>

        </RootLayout>
    )
}

export default NewRequest