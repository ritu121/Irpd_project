import React from 'react';
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";
import logo from '../../assets/logo2.png'
import { NavLink} from "react-router-dom";

function Header() {
    return (
            <nav class="bg-white border-b border-gray-300">
                <div class="flex justify-between items-center px-9 p-5">

                    <div class="ml-1">
                        <img src={logo} alt="logo" class="h-8 w-28" />
                    </div>

                    <div class="space-x-4 ">
                        <NavLink to={"/"} className="link">
                            <button>
                                <BiLogOutCircle />
                            </button>
                        </NavLink>

                        {/* <!-- Botón de Perfil --> */}
                        <NavLink to={"/profile"} className="link">
                        <button><CgProfile/></button>
                        </NavLink>
                    </div>
                </div>
            </nav>
    )
}



export default Header
