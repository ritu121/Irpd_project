import React, { useEffect, useState } from 'react'
import RootLayout from '../Layout/RootLayout'
import Button from '../common/Button';
import { getAPI, postAPI } from '../network';

function Register_employee() {
    const [confirmPassword, setConfirmPassword] = useState('')
    const [warning, setWarning] = useState('')
    const [roles, setroles] = useState([])
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        mobile: null,
        email: '',
        password: '',
        role:''
    })
    useEffect(() => {
        getroles()
    }, [])

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        // Use a callback to update the state based on the input type
        setUserData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? e.target.checked : value,
        }));

    };
    const ConfirmPassword = (e) => {
        const password = e.target.value
        setConfirmPassword(password)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (confirmPassword !== userData.password) {
            setWarning(`Please enter correct password.`)
            return;
        }

        let data = await postAPI('/addUser', userData);
        if (data) {
            clearAll()
        }
        // You can add your form submission logic here  
    };

    const getroles = async () => {
        let Data = await getAPI('/roles')
        if (Data) {
            setroles(Data.data)
        }
    }


    const clearAll = () => {
        setUserData({
            first_name: '',
            last_name: '',
            gender: '',
            mobile: '',
            email: '',
            password: '',
            role:''
        })
        setConfirmPassword('')
    }
    return (
        <RootLayout>
            <div className='flex justify-center min-h-full p-5'>
                <div className='lg:w-[80%] border-sky-500 shadow-md rounded-lg z-1 bg-white'>
                    <p className='text-zinc-950 text-2xl p-5  font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl'>Register New Employee </p>
                    <form className='' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2 gap-2 m-2 p-5 '>
                            <div className='w-50'>
                                <label for="FirstName" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm">First Name </label><span style={{ color: "red" }}> &nbsp; *</span>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                             text-base sm:text-sm " id="fName"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter First Name"
                                    name='first_name'
                                    value={userData?.first_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='w-50'>
                                <label for="LastName" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm">Last Name </label><span style={{ color: "red" }}> &nbsp; *</span>
                                <input type="text" className="form-control shadow-md block text-base sm:text-sm w-full px-3 py-1.5  text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="lName"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Last Name"
                                    name='last_name'
                                    value={userData?.last_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2  m-2 p-5'>
                            <div className='w-50'>
                                    <label htmlFor="role" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm">User Type</label><span style={{ color: "red" }}> &nbsp; *</span>
                                    <select className="form-control block text-base sm:text-sm w-full px-3  shadow-md text-base 
                            py-1.5  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
                            transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        name="role"
                                        placeholder="Select Role"
                                        onChange={handleInputChange}
                                        required>
                                        <option value='' disabled selected>Select User Type</option>
                                        {roles.map((option, index) => (
                                            <option key={index} value={option?.role_name}>{option.role_name}</option>
                                        ))}
                                    </select>

                            </div>
                            <div className='w-50'>
                                <label for="Gender" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm">Gender</label><span style={{ color: "red" }}> &nbsp; *</span>
                                <select className="form-control block text-base sm:text-sm w-full px-3  shadow-md text-base 
                            py-1.5  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
                            transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Gender"
                                    name='gender'
                                    value={userData.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value={''} disabled>Select option</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Transgender</option>
                                </select>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2  m-2 p-5'>
                            <div className='w-50'>
                                <label for="Phone" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm">Phone </label><span style={{ color: "red" }}> &nbsp; *</span>
                                <input type="text" className="form-control shadow-md block text-base sm:text-sm w-full px-3 py-1.5  text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="Phone"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Your Phone No."
                                    name='mobile'
                                    value={userData?.mobile}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div className='w-50'>
                                <label for="Email" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm">Email</label><span style={{ color: "red" }}> &nbsp; *</span>
                                <input type="email" className="form-control shadow-md block text-base sm:text-sm w-full px-3 py-1.5  text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
                                    aria-describedby="emailHelp"
                                    name='email'
                                    placeholder="Enter Your Email."
                                    value={userData?.email}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2  m-2 p-5'>
                            <div className='w-50'>
                                <label for="password" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm">Password </label><span style={{ color: "red" }}> &nbsp; *</span>
                                <input type="text" className="form-control shadow-md block text-base sm:text-sm w-full px-3 py-1.5  text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="Phone"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter password."
                                    name='password'
                                    value={userData?.password}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div className='w-50'>

                                <label for="password" className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm">Confirm Password</label><span style={{ color: "red" }}> &nbsp; *</span>
                                <input type="text" className="form-control shadow-md block text-base sm:text-sm w-full px-3 py-1.5  text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
                                    aria-describedby="emailHelp"
                                    name='confirmPassword'
                                    placeholder="Confirm Password."
                                    value={confirmPassword}
                                    onChange={ConfirmPassword}
                                    required />
                            </div>
                        </div>

                        <div className='flex justify-center text-red-700 text-xs  m-2 p-1'>
                            {warning ??
                                { warning }
                            }
                        </div>


                        <div className='flex justify-center m-3'>
                            <div className='w-5/12'> <Button title={'Submit'} type="submit"></Button></div>
                        </div>
                    </form>
                </div>
            </div>
        </RootLayout >

    )
}

export default Register_employee