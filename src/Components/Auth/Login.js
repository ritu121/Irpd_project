import React, { useState } from "react";
import Button from "../common/Button";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import Google from "../../assets/images/g_search.png"


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log('i am signin')
        e.preventDefault();
        navigate("/dashboard");
        // try {
        //   const res = await axiosInstance.post("/user/signin", { username, password });
        //   if (res.data.success) {
        //     localStorage.setItem("token", JSON.stringify(res.data.data.token));
        //     localStorage.setItem("user", JSON.stringify(res.data.data));
        //     console.log(res.data)
        //     toast.success("Login Successfully")
        //       navigate("/");
        //   } else {
        //     toast.error(res.data.message)
        //   }
        // } catch (error) {
        //   toast.error("something went wrong")
        //   console.log(error);
        // }
    };


    return (
        <>
            <div class="flex h-screen justify-center">



                <div className="flex justify-center flex-col w-96 ">

                    <div className="p-3">
                        <img
                            src={require("../../assets/logo.jpg")}
                            alt=""
                            style={{
                                width: "5rem",
                                margin: "auto",
                            }}
                        />
                    </div>
                    <div className="text-[rgba(0, 0, 0, 0.6)] p-6 text-center text-[14px] flex justify-center">
                        Welcome to IRPD !<br></br>
                        Please login/Signup to your account.
                    </div>
                    <div className="border-2 border-sky-300 shadow-md rounded-lg ">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group m-2 p-3">
                                <label for="exampleInputName" className="form-label inline-block mb-2 text-gray-700 text-[14px]">UserName or Email </label><span style={{ color: "red" }}> &nbsp; *</span>
                                <input type="text" className="shadow-md form-control block text-[16px] w-full px-3 py-1.5 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Enter Name or Email" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="form-group m-2 p-3">
                                <label for="exampleInputPassword2" className="form-label inline-block mb-2 text-gray-700 text-[14px]">Password</label><span style={{ color: "red" }}> &nbsp; *</span>
                                <input type="password" className=" shadow-md form-control text-[16px]block w-full px-3 py-1.5 text-base text-[14px] text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition  ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword2"
                                    placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="p-5" >
                                <button type="submit" className="shadow-md rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400 w-full px-6 py-2.5  text-white  text-xs text-[14px]  leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg  transition  duration-150 ease-in-out mt-2">Log In</button>

                                <button type="submit" className="shadow-md w-full px-6 py-2.5 rounded-lg 
                                    text-[#065FD4]  text-xs border-2 leading-tight rounded shadow-md hover:bg-gradient-to-r from-sky-600 to-cyan-400 hover:text-white  hover:shadow-lg focus:bg-[#3D5890] focus:shadow-lg focus:outline-none focus:ring-0   active:shadow-lg  transition  duration-150 ease-in-out mt-5"  onClick={() => navigate("/signUp")}>Register</button>
                            </div>
                        </form>
                    </div>
                    {/* <div className="text-[rgba(0, 0, 0, 0.6)] p-7 text-center text-[14px] flex justify-center">
                            Or Login with
                        </div> */}
                    {/* <div>
                            <button type="submit" className="w-full px-6 py-2.5  
                                    text-[#065FD4]  text-xs border-2 leading-tight rounded shadow-md hover:bg-[#3D5890] hover:text-white  hover:shadow-lg focus:bg-[#3D5890] focus:shadow-lg focus:outline-none focus:ring-0   active:shadow-lg  transition  duration-150 ease-in-out mt-5 "><span><img src={Google} style={{ display: "inline", padding: "2px" }} /></span>Log in with Google</button>
                        </div> */}
                </div>



                {/* <div className="w-1/2 h-screen flex justify-center items-center bg-[#D5D8DB]" >
                    <img
                        src={require("../../assets/images/imgSignUp.png")}
                        alt=""
                        style={{ height: "400px", width: "400px" }}
                    />
                </div> */}
            </div>
        </>
    )
}

export default Login