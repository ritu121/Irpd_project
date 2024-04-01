import React, { useRef, useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { MultiSelect } from "react-multi-select-component";
import Button from '../common/Button';
import { patchAPI, getAPI } from '../network';
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import JobCandidate from "../common/jobCandidate"

function Modal({ data, closeModal }) {
    const [selected, setSelected] = useState([]);
    const [skills, setSkills] = useState([]);
    const [candidates, setCandidates] = useState([])
    const [prevExperience, setPrevExperience] = useState([])

    const allcandidate = useSelector((state) => state.candidateReducer);
    const dispatch = useDispatch()
    
    const {clear_candidates, init_candidates} = bindActionCreators(actionCreators,dispatch)
    

    const [formData, setFormData] = useState({
        job_id: data?.job_id || '',
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
        user_id: data?.user_id || '',

    });
    

    useEffect(() => {
        getSkillsData()
        getCandidateByJob()
        if (data && data?.skills) {
            const Items = data.skills.map(item => ({ value: item, label: item }))
            setSelected(Items)
        }
    }, []);

    // useEffect(()=>{
    //     const tempObj ={
    //         "candidate_id":candidateId,
    //         "status":candidateStatus,
    //         "comments":candidateComment
    //     }
    //     setCandidateInfo([...candidateInfo,tempObj])

    // },[candidateId])

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

    // const handleStatus = async(e,index) =>{
    //     setCandidateStatus(e.target.value)
    //     setCandidateId(e.target.id);
    // }

    // const handleComment = async(e,index) =>{
    //     console.log(e.target.value);
    //     setCandidateComment(e.target.value)
    //     setCandidateId(e.target.id);
    // }

    // const handleChangeCandidate = async (e,index) => {
    //     // const { name, value, id } = e.target;
    //     const { name, value ,id} = e.target;
    //     const list = [...candidateInfo];
    //     list[index][name] = value;
    //     setCandidateInfo(list);
    //     // candidates.map(async (item) => {
    //     //     if (item.candidate_id == id) {
    //     //         item[name] = value
    //     //         GetPrevExperience(item.candidate_id);
    //     //         item['previous_experience'] = prevExperience
    //     //     }
    //     // })

    //     // console.log('====================================');
    //     // console.log(candidates,'candidate');
    //     // console.log('====================================');

    //     console.log('====================================');
    //     console.log(candidateInfo,'candidateInfo');
    //     console.log('====================================');
    // };

    const getSkillsData = async () => {
        let Data = await getAPI('/getSkills')
        if (Data) {
            setSkills(Data)
        }
    }

    const getCandidateByJob = async () => {
        clear_candidates()
        let Data = await getAPI(`/getCandidateByJob/${data.job_id}`)
        if (Data) {
            setCandidates(Data.data)
            Data.data.map(e=>{
                const tempObj ={
                    "candidate_id":e.candidate_id,
                    "status":e.status,
                    "comments":e.comments
                }
                init_candidates(tempObj)
            })
            
        } 
    }
    // const updateCandidates = async (item) => {
    //     // let data = await patchAPI('/updateCandidates', item);
    //     // if (data) {
    //     // }
    // }
    

    const GetPrevExperience = async (candidate_id) => {
        let Data = await getAPI(`/getPrevious_Exp/${candidate_id}`)
        if (Data) {
            const data = Data.data
            setPrevExperience(data)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedSkills = selected.map((item) => item.value).join(',')
        
        const updatedValues = {
            'job_id': formData?.job_id,
            'job_title': formData?.job_title,
            'job_description': formData?.job_description,
            'skills': selectedSkills,
            'certifications': formData?.certifications,
            'year_of_experience': formData?.year_of_experience,
            'no_of_positions': formData?.no_of_positions,
            'budget': formData?.budget,
            'edu_qualification': formData?.edu_qualification,
            'location': formData?.location,
            'client_name': formData?.client_name,
            'hire_type': formData?.hire_type,
            'start_date': formData?.start_date,
            'target_date': formData?.target_date,
            'status': formData?.status,
            'user_id': formData?.user_id,
            'candidateInfo':allcandidate
        }
        
        let data = await patchAPI('/updateJob', updatedValues);
        if (data) {
            closeModal();
            clear_candidates()
        }
    }
   

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-auto modal-overlay"
            onClick={handleOutsideClick}
        >
            <div className='flex justify-center min-w-screen p-4 h-[80%] w-4/6  overflow-y-auto bg-white rounded-md'>
                <div className='w-full border-sky-500 w-5/6  rounded-lg'>
                    <p className='text-zinc-950 text-2xl p-5 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl text-center'>Update Job Request</p>
                    <form className='grid m-2 p-5 w-full' onSubmit={handleSubmit}>

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
                        <label for="skills" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Key Skills</label>
                        <MultiSelect
                            // options={skills}
                            options={skills.map(skill => ({ value: skill.skill_name, label: skill.skill_name, id: skill.skill_id }))}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                        />

                        <label for="certification" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Certification</label>
                        <textarea class="caret-pink-500 ..." className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                             text-base sm:text-sm" placeholder="Please Enter Certification Name" name="certifications" value={formData?.certifications || ""} onChange={handleChange} ></textarea>

                        <div className='grid grid-cols-2 gap-2'>
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
                                    value={formData?.hire_type || ""}
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
                                    value={formData?.status || ""}
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
                                    type="date"
                                    id="datepicker"
                                    name="start_date"
                                    placeholder="Select a date"
                                    value={formData?.start_date ? formData.start_date.substring(0, 10) : null}
                                    onChange={handleChange}
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm"
                                    // ref={datepickerRef1}
                                />
                            </div>
                            <div className='w-50'>
                                <label htmlFor="datepicker" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Pick a Close Date:
                                </label>
                                <input
                                    type="date"
                                    id="datepicker"
                                    name="target_date"
                                    placeholder="Select a date"
                                    value={formData?.target_date ? formData.target_date.substring(0, 10) : null}
                                    onChange={handleChange}
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm"
                                    // ref={datepickerRef2}
                                />
                            </div>
                        </div>

                        <div className='flex w-[100%] mt-3 justify-center'>
                            <div className='w-[90%] h-4/5'>

                                {/* <label htmlFor="candidate" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Candidates for Reference
                                </label> */}

                                {
                                candidates[0]?.candidate_id != null ? ( 

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
                                                    candidates.map((candidate,i) => <JobCandidate candidate = {candidate}/>
                                                        // <jobCandidate candidate={candidate}/>
                                                        
                                                        // <tr key={candidate.candidate_id} className='border-2 border-amber-900 '>
                                                        //     <td className='border-2 border-black p-2 m-2 w-1/5 text-center'>{candidate.first_name} {candidate.last_name}</td>
                                                        //     <td className='border-2 border-black p-2 m-10 w-1/6 text-center' style={{ color: candidate.status === 'Selected' ? 'Green' : candidate.status === 'Rejected' ? 'Red' : 'blue', fontSize: '16px' }}>
                                                        //         <select className="form-control block text-base sm:text-sm w-full px-3  shadow-md text-base py-1.5  text-gray-700 bg-white bg-clip-padding border border-solid 
                                                        //          border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        //             placeholder="Status"
                                                        //             name='status'
                                                        //             value={candidate?.status || ""}
                                                        //             id={candidate.candidate_id}
                                                        //             onChange={e => handleStatus(e,i,)}
                                                        //             // onChange={e => handleChangeCandidate(e, i)}
                                                        //         >
                                                        //             <option value='' disabled>Select option</option>
                                                        //             <option>Selected</option>
                                                        //             <option>Rejected</option>
                                                        //             <option>Onhold</option>
                                                        //             <option>Not Interviewd</option>
                                                        //         </select>
                                                        //     </td>
                                                        //     <td className='border-2 border-black p-2 m-2 w-1/2' style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>

                                                        //         {/* {candidate.comments} */}
                                                        //         <textarea class="caret-pink-500 ..." className="form-control shadow-md block  w-full px-3 py-1.5  
                                                        //             text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                                        //             ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                        //             text-base sm:text-sm " placeholder="Please Enter Comments"
                                                        //             name="comments"
                                                        //             value={candidate?.comments || ""}
                                                        //             id={candidate.candidate_id}
                                                        //             onChange={e => handleComment(e,i)}
                                                        //             // onChange={e => handleChangeCandidate(e, i)}
                                                        //         ></textarea>

                                                        //     </td>
                                                        // </tr>
                                                    )
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