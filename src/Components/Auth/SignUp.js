import React, { useState } from "react";
import Button from "../../Components/common/Button";
import { ToastContainer, toast } from 'react-toastify';
import Google from "../../assets/images/g_search.png"
// import axios from "axios";
import { useNavigate } from "react-router-dom"
// import { axiosInstance } from "../utils/axiosSetup"; 

export default function SignUp(props) {
    const [referedBy, setReferral] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        //   try {
        //     const res = await axiosInstance.post("/user/create", {
        //       username,
        //       email,
        //       password,
        //       address,
        //       referedBy
        //     });
        //     console.log(res.data)
        //     if (res.data.success) {
        //       toast.success(res.data.message)
        //       navigate("/signIn");
        //     } else {
        //       toast.error(res.data.message)
        //     } 
        //   } catch (error) {
        //     toast.error("something went wrong")
        //     console.log(error);
        //   }
    };
    return (
        <>
            <div className="flex justify-center">

                <div className="flex justify-center  flex-col w-2/6">

                    <div className="p-3 flex justify-center">
                        <img
                            src={require("../../assets/logo.jpg")}
                            alt=""
                            style={{
                                width: "8rem",
                            }}
                        />
                    </div>
                    <div className="text-[rgba(0, 0, 0, 0.6)] p-6 text-center text-[14px] flex justify-center">
                        Register to create an account with IDPR
                    </div>
                    <div className="border-2 border-sky-300 shadow-md rounded-lg mb-10">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group m-2 p-2">
                                <label for="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700 text-[14px]">Name </label><span style={{ color: "red" }}> &nbsp; *</span>

                                <input type="text" className="form-control shadow-md block text-[14px] w-full px-3 py-1.5  text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
                                    aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="form-group m-2 p-2">
                                <label for="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700 text-[14px]">User Type </label><span style={{ color: "red" }}> &nbsp; *</span>
                                <select className="form-control block text-[14px] w-full px-3  shadow-md text-base py-1.5  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="User type">
                                    <option>User</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                            <div className="form-group m-2 p-2">
                                <label for="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700 text-[14px]">Email </label><span style={{ color: "red" }}> &nbsp; *</span>
                                <input type="email" className="form-control shadow-md block text-[14px] w-full px-3 py-1.5  text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
                                    aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group m-2 p-2">
                                <label for="exampleInputPassword2" className="form-label inline-block mb-2 text-gray-700 text-[14px]">Password</label><span style={{ color: "red" }}> &nbsp; *</span>
                                <input type="password" className="form-control shadow-md block w-full px-3 py-1.5 text-base text-[14px] text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition  ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword2"
                                    placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="form-group m-2 p-2">
                                <label for="exampleInputPassword2" className="form-label inline-block mb-2 text-gray-700 text-[14px]">Address</label>
                                <input type="text" className="form-control shadow-md block w-full px-3 py-1.5 text-base text-[14px] text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition  ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword2"
                                    placeholder="Enter Your Address" onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="form-group form-check text-center m-2 p-5">
                                <input type="checkbox"
                                    class="form-check-input appearance-none h-4 w-4 py-1.5 shadow-md border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                                    id="exampleCheck25" checked />
                                <label className="form-check-label inline text-[14px] text-gray-800" for="exampleCheck25">I agree to the IDPR Terms & Conditions and Privacy Policy</label>
                            </div>

                            <div className="p-2">
                                <button type="submit" className="rounded-lg shadow-md text-white bg-gradient-to-r from-sky-600 to-cyan-400 w-full px-6 py-2.5  text-white text-xs text-[14px]  leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg  transition  duration-150 ease-in-out mt-2">Register</button>

                                <button type="submit" className="w-full shadow-md px-6 py-1.5 rounded-lg 
                                    text-[#065FD4]  text-xs border-2 leading-tight rounded shadow-md hover:bg-gradient-to-r from-sky-600 to-cyan-400 hover:text-white  hover:shadow-lg focus:bg-[#3D5890] focus:shadow-lg focus:outline-none focus:ring-0   active:shadow-lg  transition  duration-150 ease-in-out mt-5"   onClick={() => navigate("/login")}>Login</button>
                            </div>


                        </form>
                    </div>
                    {/* <div className="text-[rgba(0, 0, 0, 0.6)] p-7 text-center text-[14px] flex justify-center">
                            Or Login with
                        </div>
                        <div>
                            <button type="submit" className="w-full px-6 py-2.5  
                               text-[#065FD4]  text-xs border-2 leading-tight rounded shadow-md hover:bg-[#3D5890] hover:text-white  hover:shadow-lg focus:bg-[#3D5890] focus:shadow-lg focus:outline-none focus:ring-0   active:shadow-lg  transition  duration-150 ease-in-out mt-5 "><span><img src={Google} alt='' style={{ display: "inline", padding: "2px" }} /></span>&nbsp;Sign Up in with Google</button>
                        </div> */}


                </div>

                {/* <div className="w-1/2 h-auto flex justify-center items-center bg-[#D5D8DB]" >
                    <img
                        src={require("../../assets/images/imgSignUp.png")}
                        alt=""
                        style={{ height: "400px", width: "400px" }}
                    />
                </div> */}
            </div>

            <ToastContainer />
            {/* </div> */}
        </>
    );
}
