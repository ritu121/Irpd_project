import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Button from '../common/Button';
import Datetime from 'react-datetime';
import Modal from 'react-modal';

function AddEventModal({ isOpen, closeModal, onEventAdded }) {
    const [title, setTitle] = useState('')
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())

    useEffect(() => {
    }, [])



    const handleSubmit = (event) => {

        event.preventDefault()
        onEventAdded({
            title,
            start,
            end
        })

        closeModal()

    }
    const handleCancelClick = () => {
        closeModal();
    };

    const handleOutsideClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    return (
        // <Modal isOpen={isOpen} onClose={onClose}>
        //     <form onSubmit={onSubmit}>
        //     <input placeholder='Title' value={title} onChange={e =>  setTitle(e.target.value)}></input>
        //     <div>
        //         <lable>Start date</lable>
        //         <Datetime value={start} onChange={date => setStart(date)} />
        //     </div>
        //     <div>
        //         <lable>End date</lable>
        //         <Datetime value={end} onChange={date => setEnd(date)} />
        //     </div>
        //     <button type='submit' >Add Event</button>
        //     <button onClick={closeClick}>Cancel</button>
        //     </form>
        // </Modal>



        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-auto modal-overlay "
            onClick={handleOutsideClick}
        >
            <div className='flex justify-center min-w-screen p-4 mt-6 h-4/6 sm:w-90 md:w-3/5 lg:w-3/5 overflow-y-auto bg-white rounded-md'>
                <form className='w-full border-sky-500 rounded-lg ' onSubmit={handleSubmit}>

                    <p className='text-zinc-950 text-2xl p-5 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl text-center'>Add Event</p>
                    <div className='grid m-2 p-5'>


                        <div className='grid '>
                            <div>
                                <label for="Title" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Title</label>
                                <input type="text" className="form-control shadow-md block  w-full px-3 py-1.5  
                            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            text-base sm:text-sm "
                                    id="name"
                                    name='title'
                                    placeholder="Event Title"
                                    // value={value.firstName}
                                    onChange={e => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                        </div>
                        <div className='grid'>
                            {/* <label htmlFor="startDate" className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">
                                Start Date/Time:
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                placeholder="Select a date"
                                // value={value.startDate}
                                // onChange={handleInputChange}
                                required
                                className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm"
                            /> */}
                            <lable className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">Start date/time</lable>
                            <Datetime value={start} onChange={date => setStart(date)} className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm" />
                        </div>
                        <div className='grid'>
                            <lable className="form-label inline-block mb-2  text-gray-700 text-base sm:text-sm mt-3">End date/time</lable>
                            <Datetime value={end} onChange={date => setEnd(date)} className="form-control shadow-md block  w-full px-3 py-1.5  
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                text-base sm:text-sm" />
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

    )
}

export default AddEventModal