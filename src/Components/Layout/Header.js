import React, { useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    function logoutCLick(e) {
        e.preventDefault()
        localStorage.clear();
        navigate("/login");
    }

    return (
        <>
            <nav >
                <div className="flex justify-between items-center px-9 p-5">
                    {/* <div class="ml-1">
                       <img src={logo} alt="logo" class="h-8 w-28" /> 
                        <h2 className='text-white'>IRPD</h2>
                    </div> */}

                    <div className="space-x-4 p-5">

                        <button className='text-white' onClick={(e) => { logoutCLick(e) }}>
                            <HiOutlineLogout />
                        </button>


                        <NavLink to={"/profile"} className="link">
                            <button className='text-white'><CgProfile /></button>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    )
}



export default Header
