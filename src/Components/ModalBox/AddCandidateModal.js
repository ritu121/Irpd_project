import React, { useState, useRef, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Button from '../common/Button';
import { toast } from 'react-toastify';


function AddCandidateModal({ closeModal }) {
    const datepickerRef1 = useRef(null);
    const datepickerRef2 = useRef(null);
    const userId = localStorage.getItem("user_id")

    const [resume, setResume] = useState(null);

    const [value, setValue] = useState({
        name: "",
        keySkills: '',
        otherSkills: '',
        experience: '',
        qualification: '',
        pAddress: '',
        cAddress: '',
        noticePeriod: '',
        expectedCTC: '',
        cCompany: '',
        designation: '',
        startDate: '',
        lastWorkingDate: '',
        roleResponsibility: '',
        user_id: userId,
    })

    useEffect(() => {
        console.log(value, "values");
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


    }, [value]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;


        // Use a callback to update the state based on the input type
        setValue((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? e.target.checked : value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setResume(file);
    };


    // Handle form submission
    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!datepickerRef1.current.value || !datepickerRef2.current.value) {
            // Handle the case where the date is not selected
            toast.error('Please select a date');
            return;
        }

        // const formdata = {
        //     "name": value?.name,
        //     "keySkills": value.keySkills,
        //     "otherSkills": value?.otherSkills,
        //     "experience": value?.experience,
        //     "qualification": value?.qualification,
        //     "pAddress": value?.pAddress,
        //     "cAddress": value?.cAddress,
        //     "noticePeriod": value?.noticePeriod,
        //     "expectedCTC": value?.expectedCTC,
        //     "cCompany": value?.cCompany,
        //     "designation": value?.designation,
        //     "startDate": datepickerRef1?.current?.value,
        //     "lastWorkingDate": datepickerRef2?.current?.value,
        //     "roleResponsibility": value?.roleResponsibility,
        //     "resume": value?.resume,
        //     'user_id': userId
        // }

        const formData = new FormData();

        formData.append('resume', resume);
        formData.append('name', value.name);
        formData.append('keySkills', value.keySkills);
        formData.append('otherSkills', value?.otherSkills);
        formData.append('experience', value?.experience);
        formData.append('qualification', value?.qualification);
        formData.append('pAddress', value?.pAddress);
        formData.append('cAddress', value?.cAddress);
        formData.append('noticePeriod', value?.noticePeriod);
        formData.append('expectedCTC', value?.expectedCTC);
        formData.append('cCompany', value?.cCompany);
        formData.append('designation', value?.designation);
        formData.append('startDate', datepickerRef1?.current?.value);
        formData.append('lastWorkingDate', datepickerRef2?.current?.value);
        formData.append('roleResponsibility', value?.roleResponsibility);
        formData.append('user_id', userId);

        // let data = await postAPI('/addJob', formdata);
        // if (data) {
        //     clearAll()
        // }

        console.log('Form submitted:', formData);
    };

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
            <div className='flex justify-center min-w-screen p-4 mt-6 h-5/6 w-4/6 overflow-y-auto bg-white rounded-md'>
                <form className='w-full border-sky-500 w-5/6 rounded-lg ' onSubmit={handleSubmit}>

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





                        <div className='grid grid-cols-3 gap-2 divide-x'>
                            <div>
                                <label for="name" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Candidate Name</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    id="name"
                                    name='name'
                                    placeholder="First Name"
                                    value={value.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label for="name" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Candidate Name</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    id="name"
                                    name='name'
                                    placeholder="Middle Name"
                                    value={value.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label for="name" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Candidate Name</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    id="name"
                                    name='name'
                                    placeholder="Last Name"
                                    value={value.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                        </div>



                        <label for="skills" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Key Skills</label>
                        <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                            placeholder="Please Enter all key Skills"
                            value={value.keySkills}
                            name='keySkills'
                            onChange={handleInputChange}
                            required
                        ></textarea>


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

                        <div className='grid grid-cols-2 gap-2 divide-x'>
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

                        <div className='grid grid-cols-2 gap-2 divide-x'>


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



                        <div className='grid grid-cols-2 gap-2 divide-x '>
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

                        <div className='grid grid-cols-2 gap-2 divide-x '>
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
                        <label for="Role&Responsibilities" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">Role & Responsibilities</label>
                        <textarea className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                            placeholder="role & Responsibility"
                            name='roleResponsibility'
                            value={value.roleResponsibility}
                            onChange={handleInputChange}
                            required ></textarea>

                        <div className='grid grid-cols-2 gap-2 divide-x '>
                            <div className='w-50'>
                                <label htmlFor="startDate" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Start Date:
                                </label>
                                <input
                                    type="text"
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
                                    ref={datepickerRef1}
                                />
                            </div>
                            <div className='w-50'>
                                <label htmlFor="lastWorkingDate" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                    Last Working Date:
                                </label>
                                <input
                                    type="text"
                                    id="lastWorkingDate"
                                    name="lastWorkingDate"
                                    value={value.lastWorkingDate}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Select a date"
                                    className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm"
                                    ref={datepickerRef2}
                                />
                            </div>
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