import { MdEdit } from 'react-icons/md';

export default function Button(props){
    const {title} = props
     
    return(
        <button type="submit" className="shadow-md rounded-lg text-white bg-[#152C4F] w-full px-6 py-2.5 
         text-white  text-xs text-[14px]  leading-tight uppercase rounded shadow-md hover:bg-[#3D5890] hover:shadow-lg focus:bg-[#3D5890]
          focus:shadow-lg focus:outline-none focus:ring-0  active:bg-[#3D5890] active:shadow-lg  transition  duration-150 ease-in-out mt-2">
          {title}
        </button>
    )
}