
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import RootLayout from "../Layout/RootLayout";
import Button from "../common/Button";
import AddEventModal from "../ModalBox/AddEventModal";
import { toast } from "react-toastify";
import { postAPI, getAPI } from "../network";
// import { Form } from 'react-router-dom';


const localizer = momentLocalizer(moment);
const toastObj = { position: "top-right" };

const Scheduler = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [candidates, setCandidates] = useState([]);

  

  useEffect(() => {
    // fetchCandidates();
    fetchEvents()
  },[]); // Fetch events when the component mounts
// Fetch events when the component mounts



  const fetchEvents = async () => {
    console.log(candidates,"candidate");

    try {
      // 
      const eventData = await getAPI("/getSchedule");
      // console.log(eventData,"Evntdta")

      // Format fetched event data for React Big Calendar
      const events = eventData.map((event) => ({
        schedule_id: event.schedule_id, // Assuming each event object has an ID
        candidate_id:event.candidate_id,
        title: `${event.title} (${event.candidate_name})`, 
        // candidate_name:event.candidate_name,
        start: new Date(event.start_time),
        end: new Date(event.end_time),
      }));

      console.log(events,"formattedEvents----------")

      setEvents(events);
    } catch (error) {
      toast.error("Failed to fetch events. Please try again.", toastObj);
    }
  };

  const onEventAdded = async (event) => {
    const startDate = event.start._d ? event.start._d : event.start;
    const endDate = event.end._d ? event.end._d : event.end;

    const year_start = startDate.getFullYear();
    const month_start = startDate.getMonth() + 1;
    const day_start = startDate.getDate();
    const hour_start = startDate.getHours();
    const minute_start = startDate.getMinutes();

    const year_end = endDate.getFullYear();
    const month_end = endDate.getMonth() + 1;
    const day_end = endDate.getDate();
    const hour_end = endDate.getHours();
    const minute_end = endDate.getMinutes();

    const formdata = {
      candidate_id:event.candidate_id,
      candidate_name:event.candidate_name,
      job_id: event.job_id,
      title: event.title,
      start_time: new Date(
        year_start,
        month_start-1,
        day_start,
        hour_start,
        minute_start
      ),
      end_time: new Date(year_end, month_end-1, day_end, hour_end, minute_end),
    };

    try {
      console.log(formdata,'dta');
    //   Send the event data to the backend API
      let data = await postAPI('/addSchedule', formdata);
      if (data) {
          closeModal();
          // After adding the event to the database, refetch events to update the calendar
          fetchEvents();
      }
    } catch (error) {
      toast.error("Failed to add event. Please try again.", toastObj);
    }
  };
  
  const ModalOpen = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  // const handleReloadPage = () => {
  //   window.location.reload();
  // };
  

  return (
    <RootLayout>
      <div style={{ zIndex: -1, position: "absolute", width: "80%" }}>
        <div className="flex justify-center mt-3">
          <div className="w-5/12">
            <div onClick={ModalOpen}>
              <Button title={"Add Event"} />

            </div>
           {/* <div onClick={handleReloadPage}>
            <Button title={"Back"} onClick={handleReloadPage}/>
            </div> */}

          </div>
        </div>

        <div style={{ height: 500, marginTop: "5rem", zIndex: -1 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ flex: 1 }}

          />
        </div>
      </div>

      {modalOpen ? (
        <AddEventModal
          isOpen={modalOpen}
          closeModal={closeModal}
          onEventAdded={(event) => onEventAdded(event)}
        />
      ) : (
        ""
      )}
      
    </RootLayout>
  );
};

export default Scheduler;










