import React, { useState } from 'react'
import brLocale from '@fullcalendar/core/locales/pt-br'
import FullCalendar, { DateSelectArg, EventClickArg, EventContentArg, formatDate, EventApi } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { Container, Grid, ListItemText, Typography } from '@mui/material'
import EventScheduleType from '../../models/schedules'

type calendarFullType = {
  currentEvents: EventApi[]
}

const CalendarFull = () => {

  const [events, setEvents] = useState<EventScheduleType[]>([])
  const [calendarFullState, setcalendarFullState] = useState<calendarFullType>()

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <Grid>
        <b>{eventContent.timeText}: </b>
        <i>{eventContent.event.title}</i>
      </Grid >
    )
  }
  
  // const renderSidebarEvent = (event: EventScheduleType) =>{
  //   return (
  //     <li key={event.id}>
  //       <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
  //       <i>{event.date}</i>
  //     </li>
  //   )
  // }
  
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  
  const handleEventClick = (clickInfo: EventClickArg) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events: EventApi[]) => {
    setcalendarFullState({
      currentEvents: events
    })
  }

  return (

      <Container>
        <Typography variant="h2">Agenda</Typography>
        <Typography variant="h5">Todos os agendamentos ({events.length})</Typography>
        {/* <ListItemText>
          {events.map(event => renderSidebarEvent(event))}
        </ListItemText> */}
        <FullCalendar
          locale={brLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          //eventClick={this.handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed

          eventAdd={function () { }}
          eventChange={function () { }}
          eventRemove={function () { }}

        />
      </Container>
    )
}

export default CalendarFull