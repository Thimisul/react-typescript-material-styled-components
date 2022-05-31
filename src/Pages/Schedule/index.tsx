import React, { useState } from 'react'
import brLocale from '@fullcalendar/core/locales/pt-br'
import FullCalendar, { DateSelectArg, EventClickArg, EventContentArg, formatDate, EventApi, CalendarApi } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { Box, Button, Container, Typography, Dialog, DialogTitle, DialogContent,TextField, DialogContentText, DialogActions } from '@mui/material'
import {EventScheduleType}  from '../../models/schedules'
import EventModal from '../../Components/EventModal'
import theme from '../../assets/themeGlobal'
import './myStyleFullCalendat.css'
import { color, palette } from '@mui/system'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

type calendarFullType = {
  currentEvents: EventApi[]
}

const CalendarFull = () => {

  const [selectInfoDate, setSelectInfoDate] = useState<DateSelectArg>()
  const [event, setEvent] = useState<EventScheduleType>()
  const [open, setOpen] = useState<boolean>(false)
  const [events, setEvents] = useState<EventScheduleType[]>([])
  const [calendarFullState, setcalendarFullState] = useState<calendarFullType>()

  const { handleSubmit, formState: { errors }, control, reset } = useForm<EventScheduleType>();

  const onSubmit: SubmitHandler<EventScheduleType> = (data: EventScheduleType) => {
    setOpen(false)
    selectInfoDate?.view.calendar.unselect()
    
    let eventForm: EventScheduleType = {
      title: data.title,
      start: selectInfoDate!.startStr,
      end: selectInfoDate!.endStr,
      extendedProps: {
        id: undefined,
        client: 'Mariana',
        service: 'Manicure',
        employee: 'Flavia',
        description: undefined
      }
    }

    setEvents(state => [eventForm, ...state])

    console.log(event)

    if (event?.title) {
      selectInfoDate?.view.calendar.addEvent(eventForm)
    }
  };


  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <Box>
        <Typography sx={{color: theme.palette.primary.main}} variant='subtitle2'>{eventContent.timeText}  
          <i style={{color: 'HighlightText'}}> {eventContent.event.extendedProps.client? eventContent.event.extendedProps.client : 'Nome do Cliente'}</i>
        </Typography>
      </ Box>
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
  
  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    setOpen(true)
    setSelectInfoDate(selectInfo)
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
        <FullCalendar
        eventBackgroundColor={theme.palette.background.paper}
        slotMinTime={"08:00:00"}
        slotMaxTime={"23:00:00"}
          locale={brLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,today,next',
            center: 'title',
            right: 'timeGridDay'
          }}
          initialView='timeGridDay'
          eventContent={renderEventContent} // custom render function

          editable={true} //Ativar Editar evento grid
          selectable={true} //Ativar selecionar grid
          selectMirror={false} //Selecionar grid não aparecer informação antes de adicionada

          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventAdd={function () { }}
          eventChange={function () { }}
          eventRemove={function () { }}
        />
     
        <Dialog open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
            <Controller
              name="title"
              defaultValue=''
              control={control}
              rules={{ required: true }}
              render={
                ({ field }) =>
                  <TextField
                  {...field}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                />
              }
            />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Subscribe</Button>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
              Cadastrar
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Container>
    )
}

export default CalendarFull