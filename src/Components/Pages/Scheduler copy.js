import React from 'react'
import { useState,useRef} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import AddEventModal from '../ModalBox/AddEventModal'
import moment from 'moment'


function scheduler () {
  const [modalOpen,setModalOpen]=useState(false)
  const calendarRef = useRef(null)

  const onEventAdded=(event)=>{
    const calendarApi = calendarRef.current.getApi()
    calendarApi.addEvent(event)

    console.log(moment(event.start).toISOString,"start");
    console.log(moment(event.end).toISOString,"end");
    console.log(event.title,"title");
  }

  async function handleEventAdd(event){

  }
  async function handleDateSetDate(date){

  }

  return (
    <div>
       <section>
      <button onClick={()=>setModalOpen(true)}>Add Event</button>
      <div style={{position:'relative', zIndex:0}}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        eventAdd={event=>handleEventAdd(event)}
        datesSet={(date)=>handleDateSetDate(date)}
      ></FullCalendar>
      </div>

      <AddEventModal 
      isOpen={modalOpen} 
      onClose={()=>setModalOpen(false)} 
      onEventAdded={event=>onEventAdded(event)}
      />
    </section>
    </div>
  )
}
export default scheduler;