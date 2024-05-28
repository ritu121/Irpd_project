
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import RootLayout from "../Layout/RootLayout";
import Button from "../common/Button";
import AddEventModal from "../ModalBox/AddEventModal";
import EventDetailsModal from "../ModalBox/EventDetailsModal";
import { toast } from "react-toastify";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../network";

const localizer = momentLocalizer(moment);
const toastObj = { position: "top-right" };
const DnDCalendar = withDragAndDrop(Calendar);

const Scheduler = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventData = await getAPI("/getSchedule");
      const events = eventData.map((event) => ({
        schedule_id: event.schedule_id,
        candidate_id: event.candidate_id,
        title: `${event.title} (${event.candidate_name})`,
        candidate_name: event.candidate_name,
        job_id: event.job_id,
        start: new Date(event.start_time),
        end: new Date(event.end_time),
      }));
      setEvents(events);
    } catch (error) {
      toast.error("Failed to fetch events. Please try again.", toastObj);
    }
  };

  const handleEventAdded = async (event) => {
    const startDate = event.start._d ? event.start._d : event.start;
    const endDate = event.end._d ? event.end._d : event.end;

    const formdata = {
      id: event.schedule_id,
      candidate_id: event.candidate_id,
      candidate_name: event.candidate_name,
      job_id: event.job_id,
      title: event.title,
      start_time: new Date(startDate),
      end_time: new Date(endDate),
    };

    try {
      await postAPI("/addSchedule", formdata);
      closeAddEventModal();
      fetchEvents();
    } catch (error) {
      toast.error("Failed to add event. Please try again.", toastObj);
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setEventDetailsOpen(true);
  };

  const closeAddEventModal = () => {
    setModalOpen(false);
  };

  const closeEventDetailsModal = () => {
    setEventDetailsOpen(false);
    setSelectedEvent(null);
  };

  const handleEventUpdate = async (updatedEvent) => {
    const formdata = {
      schedule_id: updatedEvent.schedule_id,
      candidate_id: updatedEvent.candidate_id,
      candidate_name: updatedEvent.candidate_name,
      job_id: updatedEvent.job_id,
      title: updatedEvent.title.replace(` (${updatedEvent.candidate_name})`, ''),
      start_time: updatedEvent.start,
      end_time: updatedEvent.end,
    };

    try {
      await patchAPI(`/updateSchedule/${updatedEvent.schedule_id}`, formdata);
      fetchEvents();
      closeEventDetailsModal();
    } catch (error) {
      toast.error("Failed to update event. Please try again.", toastObj);
    }
  };

  const handleEventDelete = async (scheduleId) => {
    try {
      await deleteAPI(`/deleteSchedule/${scheduleId}`);
      setEvents(events.filter((event) => event.schedule_id !== scheduleId));
    } catch (error) {
      toast.error("Failed to delete event. Please try again.", toastObj);
    }
  };

  const eventPropGetter = (event) => {
    const now = new Date();
    const eventEnd = new Date(event.end);
    const eventColor = eventEnd < now ? "red" : "green";

    return {
      style: {
        backgroundColor: eventColor,
      },
    };
  };

  const handleEventDrop = async ({ event, start, end }) => {
    const duration = moment(event.end).diff(moment(event.start));
    const updatedEvent = {
      ...event,
      start: new Date(start),
      end: new Date(start.getTime() + duration),
    };
    handleEventUpdate(updatedEvent);
  };

  const handleEventResize = async ({ event, start, end }) => {
    const updatedEvent = {
      ...event,
      start: new Date(start),
      end: new Date(end),
    };
    handleEventUpdate(updatedEvent);
  };

  return (
    <RootLayout>
      <div style={{ zIndex: -1, position: "absolute", width: "80%" }}>
        <div className="flex justify-center mt-3">
          <div className="w-5/12">
            <div onClick={() => setModalOpen(true)}>
              <Button title={"Add Event"} />
            </div>
          </div>
        </div>
        <div style={{ height: 500, marginTop: "5rem", zIndex: -1 }}>
          <DnDCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ flex: 1 }}
            onEventDrop={handleEventDrop}
            onSelectEvent={handleEventSelect}
            eventPropGetter={eventPropGetter}
            onEventResize={handleEventResize}
          />
        </div>
      </div>
      {modalOpen && (
        <AddEventModal
          isOpen={modalOpen}
          closeModal={closeAddEventModal}
          onEventAdded={handleEventAdded}
        />
      )}
      {eventDetailsOpen && (
        <EventDetailsModal
          isOpen={eventDetailsOpen}
          closeModal={closeEventDetailsModal}
          event={selectedEvent}
          onUpdate={handleEventUpdate}
          onDelete={handleEventDelete}
        />
      )}
    </RootLayout>
  );
};

export default Scheduler;
