import React, { useRef, useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Button from '../common/Button';
import { getAPI, patchAPI } from '../network';
import { BASE_URL } from "../../constant/index";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { toast } from 'react-toastify';

const toastObj = { position: "top-right" };

function EditCandidateModal({ data, closeModal }) {
    const [prevExperience, setPrevExperience] = useState([])
    const [candidate_id, setCandidate_id] = useState(data?.candidate_id);
    const [file, setFile] = useState(null);
    const [jobs, setjobs] = useState([]);
    const [jobsTitle, setjobsTitle] = useState('');
    const [skills, setSkills] = useState([]);
    const [selected, setSelected] = useState([]);

    const [value, setvalue] = useState({
        candidate_id: candidate_id,
        first_name: data?.first_name || '',
        middle_name: data?.middle_name || '',
        last_name: data?.last_name || '',
        key_skills: data?.key_skills || '',
        other_skills: data?.other_skills || '',
        year_of_experience: data?.year_of_experience || 'Fresher',
        qualifications: data?.qualifications || '',
        permanent_address: data?.permanent_address || '',
        current_address: data?.current_address || '',
        current_company: data?.current_company || '',
        path: data?.path || '',
        filename: data?.filename || '',
        originalname: data?.originalname || '',
        designation: data?.designation || '',
        roles_and_responsibilities: data?.roles_and_responsibilities || '',
        current_ctc: data?.current_ctc || '',
        expected_ctc: data?.expected_ctc || '',
        notice_period: data?.notice_period || '',
        last_work_date: data?.last_work_date ? data.last_work_date.substring(0, 10) : '',
        start_date: data?.start_date ? data.start_date.substring(0, 10) : '',
        job_id: data?.job_id || 0,
        user_id: data?.user_id || '',
        previous_experience: prevExperience,
        status: 'Not Interviewd',
        comment: ''
    });




    useEffect(() => {
        setCandidate_id(data?.candidate_id)


        if(data && data.key_skills){
            const Items= data.key_skills.map(item=> ({value:item,label:item}))  
            setSelected(Items)
        }
        
        GetPrevExperience()
        getJobs()
        getSkillsData()

    }, [data]);

    const getSkillsData = async () => {
        let Data = await getAPI('/getSkills')
        if (Data) {
            setSkills(Data)
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setvalue((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleremove = index => {
        const list = [...prevExperience];
        list.splice(index, 1);
        setPrevExperience(list);
    }

    const handleExpChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...prevExperience];
        list[index][name] = value;
        setPrevExperience(list);


    }

    const AddExperience = () => {
        setPrevExperience([...prevExperience,
        {
            company: '',
            designation: '',
            year_of_experience: '',
            roles_and_responsibilities: '',
            start_date: null,
            last_work_date: null,
            candidate_id: candidate_id
        }]);


    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
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




            Data.map((item) => {

                if (item.job_id === data.job_id) {

                    const title = item.job_title


                    setjobsTitle(title)


                }
            })
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault();


        const selectedSkills=selected.map((item)=>item.value).join(',')
        
        const data = {
            'candidate_id': candidate_id,
            'first_name': value?.first_name,
            'middle_name': value?.middle_name,
            'last_name': value?.last_name,
            'key_skills': selectedSkills,
            'other_skills': value?.other_skills,
            'year_of_experience': value?.year_of_experience,
            'qualifications': value?.qualifications,
            'permanent_address': value?.permanent_address,
            'current_address': value?.current_address,
            'current_company': value?.current_company,
            'path': value?.path || '',
            'filename': value?.filename || '',
            'originalname': value?.originalname || '',
            'designation': value?.designation,
            'roles_and_responsibilities': value?.roles_and_responsibilities,
            'current_ctc': value?.current_ctc,
            'expected_ctc': value?.expected_ctc,
            'notice_period': value?.notice_period,
            'start_date': value?.start_date,
            'last_work_date': value?.last_work_date,
            'job_id': parseInt(value?.job_id),
            'user_id': value?.user_id,
            'previous_experience': prevExperience,
            'status': 'Not Interviewd',
            'comment': ''
        }



        let Data = await patchAPI('/updateCandidates', data);
        if (Data) {
            if (value?.filename && file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('candidate_id', value.candidate_id);
                const response = await axios.patch(`${BASE_URL}/updateCandidatesResume/${data?.filename}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response) {
                    toast.success(response.data.message, toastObj);
                }
            }

            closeModal();
        }
    }


    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-auto modal-overlay"
            onClick={handleOutsideClick}
        >
            <div className='flex justify-center min-w-screen p-4 mt-6 h-5/6 sm:w-90 md:w-3/5 lg:w-3/5 overflow-y-auto bg-white rounded-md'>
                <form onSubmit={handleSubmit} className='w-full border-sky-500  rounded-lg '>
                    <p className='text-zinc-950 text-2xl p-5 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl text-center'>Update Candidate Details</p>
                    <div className='grid m-2 p-5'>

                        <label htmlFor="resume" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                            Update Resume
                        </label>

                        <input type='file'
                            className="form-control shadow-md block  w-full px-3 py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    text-base sm:text-sm"
                            id="resume"
                            onChange={handleFileChange}
                            placeholder="Select a Resume" />
                        {
                            data?.originalname &&
                            <p className='text-red-800'>selected file:- {data?.originalname}</p>
                        }



                        {/* <label for="JobTitle" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Candidate Name</label> */}
                        <div className='grid grid-cols-3 gap-2 '>
                            <div>
                                <label for="name" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">First Name</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "

                                    name='first_name'
                                    placeholder="First Name"
                                    value={value?.first_name}
                                    onChange={handleChange}
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
                                    value={value?.middle_name}
                                    onChange={handleChange}


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
                                    value={value?.last_name}
                                    onChange={handleChange}

                                />
                            </div>
                        </div>

                        {/* <label for="skills" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Key Skills</label>
                        <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "name='key_skills' placeholder="Please Enter all Require Skills" value={value?.key_skills || ""} onChange={handleChange}  ></textarea> */}
                         <label for="skills" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Key Skills</label>
                        <MultiSelect
                            // options={skills}
                            options={skills.map(skill => ({ value: skill.skill_name, label: skill.skill_name, id: skill.skill_id }))}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                        />

                        <label for="skills" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Other Skills</label>
                        <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "name='other_skills' placeholder="Please Enter all Require Skills"
                             value={value?.other_skills || ""} onChange={handleChange}  ></textarea>

                        <div className='grid grid-cols-2 gap-2'>
                            <div className='w-50'>
                                <label for="Yexp" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Year of Experience</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    text-base sm:text-sm " name='year_of_experience'
                                    placeholder="experience" value={value?.year_of_experience || ""} onChange={handleChange} />
                            </div>
                            <div className='w-50'>
                                <label for="qualification" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Qualification</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    text-base sm:text-sm " name='qualifications'
                                    placeholder="Enter Qualification" value={value?.qualifications || ""} onChange={handleChange} />
                            </div>

                        </div>

                        <div className='grid grid-cols-2 gap-2 '>


                            <div className='w-50'>
                                <label for="pAddress" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Permanent Address</label>
                                <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " name='permanent_address' placeholder="Permanent Address" value={value?.permanent_address || ""} onChange={handleChange} ></textarea>
                            </div>
                            <div className='w-50'>
                                <label for="cAddress" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Current Address</label>
                                <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " placeholder="Current Address"
                                    name='current_address'
                                    value={value?.current_address || ""}
                                    onChange={handleChange} ></textarea>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2  '>
                            <div className='w-50'>
                                <label for="cCompany" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Current Company</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="cilent"
                                    name='current_company'
                                    value={value?.current_company || ""}
                                    onChange={handleChange}
                                    placeholder="Current Company" />
                            </div>
                            <div className='w-50'>
                                <label for="designation" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Designation</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    name='designation'
                                    value={value?.designation || ""}
                                    onChange={handleChange}
                                    placeholder="Designation" />
                            </div>
                        </div>

                        < div className='grid grid-cols-2 gap-2  '>
                            <div className='w-50'>
                                <label for="Role&Responsibilities" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Role & Responsibilities</label>
                                <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    placeholder="role & Responsibility"
                                    name='roles_and_responsibilities'
                                    value={value?.roles_and_responsibilities || ""}
                                    onChange={handleChange} ></textarea>
                            </div>
                            <div className='w-50'>
                                <label for="ExpCTC" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Current CTC</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    name='current_ctc'
                                    value={value?.current_ctc}
                                    onChange={handleChange}
                                    placeholder="Current CTC" />

                            </div>


                        </div>



                        <div className='grid grid-cols-2 gap-2  '>
                            <div className='w-50'>
                                <label for="ExpCTC" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Expected CTC</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="cilent"
                                    value={value?.expected_ctc || ""}
                                    onChange={handleChange}
                                    name='expected_ctc'
                                    placeholder="Expected CTC" />
                            </div>

                            <div className='w-50'>
                                <label for="noticePeriod" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Notice Period</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm " id="location"
                                    value={value?.notice_period || ""}
                                    onChange={handleChange}
                                    name='notice_period'
                                    placeholder="notice period" />
                            </div>

                        </div>



                        <div className='grid grid-cols-2 gap-2  '>
                            <div className='w-50'>
                                <label htmlFor="datepicker" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Start Date:
                                </label>
                                <input
                                    type="date"
                                    id="datepicker"
                                    name="start_date"
                                    placeholder="Select a date"
                                    value={value?.start_date ? value.start_date.substring(0, 10) : null}
                                    onChange={handleChange}
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm"

                                />
                            </div>
                            <div className='w-50'>
                                <label htmlFor="datepicker" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Last Working Date:
                                </label>
                                <input
                                    type="date"
                                    id="datepicker"
                                    name="last_work_date"
                                    value={value?.last_work_date ? value.last_work_date.substring(0, 10) : null}
                                    onChange={handleChange}
                                    placeholder="Select a date"
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm"

                                />
                            </div>
                            <div>
                                <label htmlFor="Yexp" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Job Opening</label>
                                <select className="form-control block text-base sm:text-sm w-full px-3 shadow-md text-base py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 
                                focus:text-gray-700 focus:bg-white focus:border-blue-600  focus:outline-none"
                                    name="job_id"
                                    placeholder="Select Job"
                                    onChange={handleChange}>
                                    <option value='' disabled selected>{jobsTitle}</option>
                                    {jobs.map((option, index) => (
                                        <option key={index} value={option?.job_id}>{option.job_title}</option>
                                    ))}
                                </select>

                            </div>
                        </div>
                        {
                            prevExperience.length === 0 &&
                            <button className='text-gray-700 ' onClick={AddExperience}>Add Previous Experience</button>
                        }


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
                                                        value={item?.company || ''}
                                                        placeholder="Company"
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
                                                        value={item?.designation || ''}
                                                        placeholder="Designation"
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
                                                        value={item?.year_of_experience || ''}
                                                        name="year_of_experience"
                                                        placeholder="Year of Experience"
                                                        onChange={e => handleExpChange(e, i)}>
                                                        <option value='' disabled>Select Option</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
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
                                                        value={item?.start_date ? item.start_date.substring(0, 10) : null}
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

                                            {prevExperience.length - 1 === i &&
                                                <button className="shadow-md rounded-lg text-white bg-[#152C4F] w-50 px-6 py-2.5
                                                    text-white  text-xs text-[14px]  leading-tight uppercase rounded shadow-md hover:bg-[#3D5890] hover:shadow-lg focus:bg-[#3D5890]
                                                    focus:shadow-lg focus:outline-none focus:ring-0  active:bg-[#3D5890] active:shadow-lg  transition  duration-150 ease-in-out mt-2" onClick={AddExperience}>Add More</button>
                                            }
                                        </div>
                                    ))
                                }

                            </div>

                        }



                        <div className='flex justify-center mt-3'>
                            <div className='w-5/12'> <Button title={'Submit'} type="submit"></Button></div>
                        </div>
                        
                        <div className='flex justify-center mt-3'>
                            <div className='w-5/12' onClick={handleCancelClick}> <Button title={'Cancel'}></Button></div>
                        </div>


                        {/* <label for="Email" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm">Email</label>
                        <input type="email" value="irpd@email.com" className="form-control shadow-md block text-base sm:text-sm w-full px-3 py-1.5  text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
                            aria-describedby="emailHelp" placeholder="Enter Your Email." /> */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCandidateModal;