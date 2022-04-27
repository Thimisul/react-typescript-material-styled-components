import React from 'react'
import brLocale from '@fullcalendar/core/locales/pt-br'
import FullCalendar, { EventApi, DateSelectArg, EventClickArg, EventContentArg, formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { Container, Grid, ListItemText, Typography } from '@mui/material'
import ptBR from 'date-fns/locale/pt-BR'

interface DemoAppState {
  currentEvents: EventApi[]
}

export default class DemoApp extends React.Component<{}, DemoAppState> {

  state: DemoAppState = {
    currentEvents: []
  }

  render() {
    return (

      <Container>
        <Typography variant="h2">Agenda</Typography>
        <Typography variant="h5">Todos os agendamentos ({this.state.currentEvents.length})</Typography>
        <ListItemText>
          {this.state.currentEvents.map(renderSidebarEvent)}
        </ListItemText>
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
          select={this.handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={this.handleEventClick}
          eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed

          eventAdd={function () { }}
          eventChange={function () { }}
          eventRemove={function () { }}

        />
      </Container>
    )
  }

  handleDateSelect = (selectInfo: DateSelectArg) => {
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

  handleEventClick = (clickInfo: EventClickArg) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <Grid sx={{ 'text-overflow': 'ellipsis ellipsis ' }}>
      <b>{eventContent.timeText}: </b>
      <i>{eventContent.event.title}</i>
    </Grid >
  )
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  )
}