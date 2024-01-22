import { MdEdit } from 'react-icons/md';

export default function Button(props){
    const {title} = props
     
    return(
        <button type="submit" className="shadow-md rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400 w-full px-6 py-2.5 
         text-white  text-xs text-[14px]  leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
          focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg  transition  duration-150 ease-in-out mt-2">
          {title}
        </button>
    )
}