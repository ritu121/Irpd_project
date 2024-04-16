import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import RootLayout from '../Layout/RootLayout';
import Button from '../common/Button';
import AddEventModal from '../ModalBox/AddEventModal'
import { toast } from 'react-toastify';
import { postAPI } from '../network';
// Initialize localizer
const localizer = momentLocalizer(moment);
const toastObj = {position: "top-right"};


// // Sample events data
const events = [
    {
        title: 'Meeting',
        start: new Date(2024, 3, 5, 10, 0), // year, month (0-indexed), day, hour, minute
        end: new Date(2024, 3, 5, 12, 0),
    },
    {
        title: 'Conference',
        start: new Date(2024, 3, 8, 13, 0),
        end: new Date(2024, 3, 8, 12, 30),
    },
    {
        title: 'Interview',
        start: new Date(2024, 3, 8, 13, 0),
        end: new Date(2024, 3, 8, 14, 0),
    },
    {
        title: 'Interview',
        start: new Date(2024, 3, 8, 15, 0),
        end: new Date(2024, 3, 8, 17, 0),
    },
    {
        title: 'Interview',
        start: new Date(2024, 3, 8, 13, 0),
        end: new Date(2024, 3, 8, 17, 0),
    },
];

const Scheduler = () => {
    const [modalOpen, setModalOpen] = useState(false)


    const onEventAdded = async(event) => {
        // console.log(title,'title', start,'start', end,'end');
        console.log(event.start, "start");

        // Extracting year, month, day, hour, and minute
        const year_start = event.start._d.getFullYear();
        const month_start = event.start._d.getMonth(); // Note: Months are zero-indexed (0 = January, 1 = February, etc.)
        const day_start = event.start._d.getDate();
        const hour_start = event.start._d.getHours();
        const minute_start = event.start._d.getMinutes();


        // Extracting year, month, day, hour, and minute
        const year_end = event.end._d.getFullYear();
        const month_end = event.end._d.getMonth(); // Note: Months are zero-indexed (0 = January, 1 = February, etc.)
        const day_end = event.end._d.getDate();
        const hour_end = event.end._d.getHours();
        const minute_end = event.end._d.getMinutes();

        console.log(year_start,month_start+1,day_start,hour_start,minute_start,"start timedate");
        console.log(year_end,month_end+1,day_end,hour_end,minute_end,"end timedate");

        const formdata={
            title:event.title,
            start_time:new Date(year_start, month_start+1, day_start, hour_start, minute_start),
            end_time:new Date(year_end, month_end+1, day_end, hour_end, minute_end)
        }
       
        try {
            let data = await postAPI('/addShedule', formdata);
            if (data) {
                closeModal();
            }
        } catch (error) {
            toast.error("Please Try Again", toastObj);
        }


    }
    const ModalOpen = (open) => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }



    return (
        <RootLayout>
            <div style={{ zIndex: -1, position: 'absolute', width: '80%' }}>
                <div className='flex justify-center mt-3'  >
                    <div className='w-5/12' ><div onClick={() => ModalOpen('open')}><Button title={'Add Event'} ></Button></div></div></div>

                <div style={{ height: 500, marginTop: '5rem', zIndex: -1, }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ flex: 1 }}
                    />
                </div>
            </div>

            {
            modalOpen ? (

                    <AddEventModal
                        isOpen={modalOpen}
                        closeModal={() => closeModal()}
                        onEventAdded={event => onEventAdded(event)}
                    />
                ) : (''
                    // <ConfirmationModal show={alertOpen} onClose={closeAlert} />
                )
            }

        </RootLayout>
    )
};

export default Scheduler;
