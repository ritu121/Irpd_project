import React from 'react';
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import logo from '../../assets/logo.jpg'
import { NavLink} from "react-router-dom";

function Header() {
    return (
            <nav className="bg-[#152C4F] border-b border-gray-300 h-32 rounded z-0 rounded-br-full">
                <div className="flex justify-between items-center px-9 p-5">
                    <div class="ml-1">
                        {/* <img src={logo} alt="logo" class="h-8 w-28" />  */}
                        <h2 className='text-white'>IRPD</h2>
                    </div>

                    <div className="space-x-4 ">
                        <NavLink to={"/"} className="link">
                            <button className='text-white'>
                                <HiOutlineLogout />
                            </button>
                        </NavLink>
                        
                        <NavLink to={"/profile"} className="link">
                        <button className='text-white'><CgProfile/></button>
                        </NavLink>
                    </div> 
                </div>
            </nav>
    )
}



export default Header
