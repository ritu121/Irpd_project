import React, { useState, useRef, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Button from '../common/Button';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "../../constant/index";
import { MultiSelect } from "react-multi-select-component";
import { getAPI, postAPI } from '../network';


const toastObj = { position: "top-right" };

function AddCandidateModal({ closeModal }) {

    // const datepickerRef11 = useRef(null);
    // const datepickerRef22 = useRef(null);

    const userId = localStorage.getItem("user_id")
    const [jobs, setjobs] = useState([]);
    const [skills, setSkills] = useState([]);
    const [selected, setSelected] = useState([]);

    const [prevExperience, setPrevExperience] = useState([
        {
            company: '',
            designation: '',
            year_of_experience: '',
            roles_and_responsibilities: '',
            start_date: 0,
            last_work_date: 0
        },
    ])




    const [file, setFile] = useState(null);

    const [value, setValue] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        keySkills: '',
        otherSkills: '',
        experience: '',
        qualification: '',
        pAddress: '',
        cAddress: '',
        noticePeriod: '',
        currentCTC: '',
        expectedCTC: '',
        cCompany: '',
        designation: '',
        startDate: '',
        last_work_date: '',
        roleResponsibility: '',
        user_id: userId,
        job_id:''
    })



    useEffect(() => {
        getJobs()
        getSkillsData()
        
    }, []);

    const handleExpChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...prevExperience];
        list[index][name] = value;
        setPrevExperience(list);


    }
    const handleremove = index => {
        const list = [...prevExperience];
        list.splice(index, 1);
        setPrevExperience(list);
    }

    const AddExperience = () => {

        setPrevExperience([...prevExperience,
        {
            company: '',
            designation: '',
            year_of_experience: '',
            roles_and_responsibilities: '',
            start_date: '',
            last_work_date: ''
        }]);
    }

    // const handleExpChange = (e) => {
    //     const { name, value, type } = e.target;

    //     settemp((prevData) => ({
    //         ...prevData,
    //         [name]: type === 'checkbox' ? e.target.checked : value,
    //     }));

    //     console.log(temp, "prevExperience");
    // }; 


    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setValue((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? e.target.checked : value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    const getSkillsData = async () => {
        let Data = await getAPI('/getSkills')
        if (Data) {
            setSkills(Data)
        }
    }


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedSkills=selected.map((item)=>item.value).join(',')

        const formdata = {
            "first_name": value?.firstName,
            "middle_name": value?.middleName,
            "last_name": value?.lastName,
            "key_skills": selectedSkills,
            "other_skills": value?.otherSkills,
            "year_of_experience": value?.experience,
            "qualifications": value?.qualification,
            "permanent_address": value?.pAddress,
            "current_address": value?.cAddress,
            "notice_period": value?.noticePeriod,
            "current_ctc": value?.currentCTC,
            "expected_ctc": value?.expectedCTC,
            "current_company": value?.cCompany,
            "designation": value?.designation,
            "start_date": value?.startDate,
            "last_work_date": value?.last_work_date,
            "roles_and_responsibilities": value?.roleResponsibility,
            'user_id': userId,
            "previous_experience": prevExperience,
            "job_id":value?.job_id
        }


        // formData.append('first_name', value.firstName);
        // formData.append('middle_name', value.middleName);
        // formData.append('last_name', value.lastName);
        // formData.append('key_skills', value.keySkills);
        // formData.append('other_skills', value?.otherSkills);
        // formData.append('year_of_experience', value?.experience);
        // formData.append('qualifications', value?.qualification);
        // formData.append('permanent_address', value?.pAddress);
        // formData.append('current_address', value?.cAddress);
        // formData.append('notice_period', value?.noticePeriod);
        // formData.append('current_ctc', value?.currentCTC);
        // formData.append('expected_ctc', value?.expectedCTC);
        // formData.append('current_company', value?.cCompany);
        // formData.append('designation', value?.designation);
        // formData.append('start_date', value?.startDate);
        // formData.append('last_work_date',value?.last_work_date);
        // formData.append('roles_and_responsibilities', value?.roleResponsibility);
        // // formData.append('previous_experience',prevExperience)
        // formData.append('user_id', userId);

        try {
           

            let Data = await postAPI('/addCandidates', formdata)
            if (Data) {
                const formData = new FormData();

                formData.append('file', file);
                formData.append('candidate_id', Data.data.result.insertId);

                const response = await axios.post(`${BASE_URL}/addCandidatesResume`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                closeModal();
            }

        } catch (error) {
            toast.error("Please Try Again", toastObj);
        }

        // console.log('Form submitted:', formdata);
    };

    const getJobs = async () => {
        let Data = await getAPI('/getJobs')
        if (Data) {
            setjobs(Data)
        }
    }
    const handleOutsideClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };
    const handleCancelClick = () => {
        closeModal();
    };
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-auto modal-overlay"
            onClick={handleOutsideClick}
        >
            <div className='flex justify-center min-w-screen p-4 mt-6 h-5/6 sm:w-90 md:w-3/5 lg:w-3/5 overflow-y-auto bg-white rounded-md'>
                <form className='w-full border-sky-500 rounded-lg ' onSubmit={handleSubmit}>

                    <p className='text-zinc-950 text-2xl p-5 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl text-center'>Add Candidate</p>
                    <div className='grid m-2 p-5'>


                        <label htmlFor="resume" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                            Upload Resume
                        </label>

                        <input type='file'
                            className="form-control shadow-md block  w-full px-3 py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    text-base sm:text-sm"
                            id="resume"
                            onChange={handleFileChange}
                            required
                            placeholder="Select a Resume" />


                        <div className='grid grid-cols-3 gap-2 '>
                            <div>
                                <label for="name" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">First Name</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    id="name"
                                    name='firstName'
                                    placeholder="First Name"
                                    value={value.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label for="name" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Middle Name</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    id="name"
                                    name='middleName'
                                    placeholder="Middle Name"
                                    value={value.middleName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label for="name" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Last Name</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    id="name"
                                    name='lastName'
                                    placeholder="Last Name"
                                    value={value.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                        </div>

                        <label for="skills" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Key Skills</label>
                        <MultiSelect
                            // options={skills}
                            options={skills.map(skill => ({ value: skill.skill_name, label: skill.skill_name, id:skill.skill_id }))}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                        />
                      
                        <label for="otherskills" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Other Skills</label>
                        <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                            placeholder="Please Enter Other Skills"
                            value={value.otherSkills}
                            name='otherSkills'
                            onChange={handleInputChange}
                            required ></textarea>

                        <div className='grid grid-cols-2 gap-2 '>
                            <div className='w-50'>
                                <label for="Yexp" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Year of Experience</label>
                                <select className="form-control block text-base sm:text-sm w-full px-3 shadow-md text-base py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600  focus:outline-none"
                                    name="experience"
                                    placeholder="Year of Experience"
                                    value={value.experience}
                                    onChange={handleInputChange}>
                                    <option value='' disabled>Select Option</option>
                                    <option>Fresher</option>
                                    <option>1+</option>
                                    <option>2+</option>
                                    <option>3+</option>
                                    <option>4+</option>
                                </select>
                            </div>
                            <div className='w-50'>
                                <label for="qualification" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Qualification</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="qualification"
                                    placeholder="Enter Qualification"
                                    name='qualification'
                                    value={value?.qualification}
                                    onChange={handleInputChange}
                                    required />
                            </div>

                        </div>

                        <div className='grid grid-cols-2 gap-2 '>


                            <div className='w-50'>
                                <label for="pAddress" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Permanent Address</label>
                                <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    placeholder="Permanent Address"
                                    name='pAddress'
                                    value={value.pAddress}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                            <div className='w-50'>
                                <label for="cAddress" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Current Address</label>
                                <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    placeholder="Current Address"
                                    name='cAddress'
                                    value={value.cAddress}
                                    onChange={handleInputChange}
                                    required ></textarea>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2  '>
                            <div className='w-50'>
                                <label for="cCompany" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Current Company</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="cilent"
                                    value={value.cCompany}
                                    name='cCompany'
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Current Company" />
                            </div>
                            <div className='w-50'>
                                <label for="designation" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Designation</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="cilent"
                                    value={value.designation}
                                    placeholder="Designation"
                                    name='designation'
                                    onChange={handleInputChange}
                                    required />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2  '>
                            <div className='w-50'>
                                <label for="Role&Responsibilities" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Role & Responsibilities</label>
                                <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    placeholder="role & Responsibility"
                                    name='roleResponsibility'
                                    value={value.roleResponsibility}
                                    onChange={handleInputChange}
                                    required ></textarea></div>
                            <div className='w-50'>
                                <div className='w-50'>
                                    <label for="noticePeriod" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Notice Period</label>
                                    <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                        id="noticPeriod"
                                        name='noticePeriod'
                                        value={value.noticePeriod}
                                        placeholder="Notice Period"
                                        onChange={handleInputChange}
                                        required />
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2  '>

                            <div className='w-50'>
                                <label for="currentctc" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Current CTC</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    id="currentctc"
                                    name='currentCTC'
                                    value={value.currentCTC}
                                    placeholder="Current CTC"
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div className='w-50'>
                                <label for="ExpCTC" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Expected CTC</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="cilent"
                                    value={value.expectedCTC}
                                    name='expectedCTC'
                                    placeholder="Expected CTC"
                                    onChange={handleInputChange}
                                    required />
                            </div>
                        </div>




                        <div className='grid grid-cols-2 gap-2  '>
                            <div className='w-50'>
                                <label htmlFor="startDate" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Start Date:
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    placeholder="Select a date"
                                    value={value.startDate}
                                    onChange={handleInputChange}
                                    required
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm"
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
                                    value={value.last_work_date}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Select a date"
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Yexp" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Job Opening</label>
                            <select className="form-control block text-base sm:text-sm w-full px-3 shadow-md text-base py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 
                                focus:text-gray-700 focus:bg-white focus:border-blue-600  focus:outline-none"
                                name="job_id"
                                placeholder="Select Job"
                                onChange={handleInputChange}>
                                    <option value='' disabled selected>Select Option</option>
                                {jobs.map((option, index) => (
                                    <option key={index} value={option.job_id}>{option.job_title}</option>
                                ))}
                            </select>

                        </div>


                        <div className='m-5'>

                            <div className='flex mt-3'  >
                                <h6>Other Experience</h6>
                                {/* <button title={'Add Experience'} onClick={AddExperience}>Addmore</button> */}
                            </div>
                            {
                                prevExperience.map((x, i) => (

                                    <div className='border-2  p-5 mt-2'>

                                        <div className='flex justify-between'>
                                            <p>Experience {i + 1}</p>
                                            {
                                                prevExperience.length !== 1 &&
                                                <button className="shadow-md rounded-lg text-white bg-[#152C4F] w-50 px-6 py-2.5 
                                            text-white  text-xs text-[14px]  leading-tight uppercase rounded shadow-md hover:bg-[#3D5890] hover:shadow-lg focus:bg-[#3D5890]
                                             focus:shadow-lg focus:outline-none focus:ring-0  active:bg-[#3D5890] active:shadow-lg  transition  duration-150 ease-in-out mt-2" onClick={() => handleremove(i)}>Remove</button>
                                            }
                                        </div>

                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div className='w-50'>
                                                <label for="pAddress" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Company Name</label>
                                                <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                                                        text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                                        ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                        text-base sm:text-sm "
                                                    placeholder="Permanent Address"
                                                    name='company'
                                                    onChange={e => handleExpChange(e, i)}
                                                ></textarea>
                                            </div>
                                            <div className='w-50'>
                                                <label for="cAddress" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Designation</label>
                                                <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                                                        text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                                        ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                        text-base sm:text-sm "
                                                    placeholder="Current Address"
                                                    name='designation'
                                                    onChange={e => handleExpChange(e, i)}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div className='w-50'>
                                                <label for="pAddress" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Year of Experience</label>
                                                <select className="form-control block text-base sm:text-sm w-full px-3 shadow-md text-base py-1.5  
                                                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 
                                                            focus:text-gray-700 focus:bg-white focus:border-blue-600  focus:outline-none"
                                                    name="year_of_experience"
                                                    placeholder="Year of Experience"
                                                    onChange={e => handleExpChange(e, i)}>
                                                    <option value='' disabled>Select Option</option>
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
                                                    placeholder="role & Responsibility"
                                                    name='roles_and_responsibilities'
                                                    onChange={e => handleExpChange(e, i)}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-2 gap-2  '>
                                            <div className='w-50'>
                                                <label htmlFor="startDate" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                                    Start Date:
                                                </label>
                                                <input
                                                    type="date"
                                                    id="startDate"
                                                    name="start_date"
                                                    placeholder="Select a date"
                                                    onChange={e => handleExpChange(e, i)}
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
                                                    onChange={e => handleExpChange(e, i)}
                                                    placeholder="Select a date"
                                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                            text-base sm:text-sm"
                                                // ref={datepickerRef22}
                                                />

                                            </div>
                                        </div>

                                        {prevExperience.length - 1 === i &&
                                            <button className="shadow-md rounded-lg text-white bg-[#152C4F] w-50 px-6 py-2.5
                                            text-white  text-xs text-[14px]  leading-tight uppercase rounded shadow-md hover:bg-[#3D5890] hover:shadow-lg focus:bg-[#3D5890]
                                            focus:shadow-lg focus:outline-none focus:ring-0  active:bg-[#3D5890] active:shadow-lg  transition  duration-150 ease-in-out mt-2" onClick={AddExperience}>Add More</button>
                                        }
                                    </div>
                                ))
                            }

                        </div>



                        <div className='flex justify-center mt-3'>
                            <div className='w-5/12'> <Button title={'Add Candidate'} type="submit"></Button></div>
                        </div>
                        <div className='flex justify-center mt-3'>
                            <div className='w-5/12' onClick={handleCancelClick}> <Button title={'Cancel'} ></Button></div>
                        </div>

                    </div>


                </form>
            </div>

        </div>



    );
}

export default AddCandidateModal;