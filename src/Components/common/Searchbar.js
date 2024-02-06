import React from 'react'
import { FaSearch } from "react-icons/fa";

function Searchbar() {
  return (
    <>
    <div className="bg-white rounded-full border-none p-3 m-4 shadow-md  z-1 ">
    <div className="flex items-center ">
      <FaSearch />
      <input type="text" placeholder="Search..." className="ml-3 focus:outline-none w-full" />
    </div>
  </div>
    </>
  )
}

export default Searchbar