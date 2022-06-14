import React, { useEffect, useState } from 'react'
import brLocale from '@fullcalendar/core/locales/pt-br'
import FullCalendar, { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Select, MenuItem, Popover, Container } from '@mui/material'
import SchedulesType from '../../models/schedules'
import './myStyleFullCalendat.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { createSchedule, getSchedules } from '../../services/schedules'
import { getClients } from '../../services/clients'
import { ClientsType, EmployeesType } from '../../models'
import { getEmployeeById, getEmployees } from '../../services/employees'
import theme from '../../assets/themeGlobal'

// type calendarFullType = {
//   currentEvents: EventApi[]
// }

const CalendarFull = () => {

  const [open, setOpen] = useState<boolean>(false)
  const [openPopover, setOpenPopover] = useState<boolean>(false)
  const [selectInfoDate, setSelectInfoDate] = useState<DateSelectArg>()
  //const [event, setEvent] = useState<EventScheduleType>()
  const [events, setEvents] = useState<EventInput[]>([])
  //const [calendarFullState, setcalendarFullState] = useState<calendarFullType>()
  //const [client, setClient] = useState<ClientType>(CLIENT_DEFAULT)
  const [clients, setClients] = useState<ClientsType[]>()
  const [employees, setEmployees] = useState<EmployeesType[]>()
  const [employee, setEmployee] = useState<EmployeesType>()
  //const [servicesSaloons, setServicesSaloons] = useState<ServicesSaloonType[]>()

  const { handleSubmit, formState: { errors }, control, reset } = useForm<SchedulesType>();

  // const eventSource = async () => {
  //   let events: EventInput[] = []
  //   getSchedules().then(response => response.map( schedule => {
  //     events.push({
  //       title: schedule.client.name,
  //       start: schedule.start,
  //       end: schedule.end,
  //       extendedProps: {
  //         client: schedule.client.name,
  //         employee: schedule.employee.name,
  //         service: schedule.service.name,
  //       }
  //     })
  //   })).catch(err => err)
  //   return events
  // }


  useEffect(() => {
    getSchedules().then(response => response.map(schedule => {
      setEvents(state => [{
        title: schedule.client.name,
        start: schedule.start,
        end: schedule.end,
        extendedProps: {
          client: schedule.client.name,
          employee: schedule.employee.name,
          service: schedule.service.name,
        }
      }, ...state])
    }))
  }, [])

  const onSubmit: SubmitHandler<SchedulesType> = (data: SchedulesType) => {
    setOpen(false)
    reset()
    selectInfoDate?.view.calendar.unselect()
    if (selectInfoDate && data.client) {
      createSchedule({
        client: data.client,
        employee: data.employee,
        service: data.service,
        start: selectInfoDate.start,
        end: selectInfoDate.end
      })
      selectInfoDate.view.calendar.addEvent({ data })
    } else
      console.log('Indormação do calendario faltante')
  };

  // const renderEventContent = (eventContent: EventContentArg) => {
  //   return (
  //     <Box>
  //       <Typography sx={{color: theme.palette.primary.main}} variant='subtitle2'>{eventContent.timeText}  
  //         <i style={{color: 'HighlightText'}}> {eventContent.event.extendedProps.client? eventContent.event.extendedProps.client : 'Nome do Cliente'}</i>
  //       </Typography>
  //     </ Box>
  //   )
  // }

  // const renderSidebarEvent = (event: EventScheduleType) =>{
  //   return (
  //     <li key={event.id}>
  //       <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
  //       <i>{event.date}</i>
  //     </li>
  //   )
  // }


  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    setSelectInfoDate(selectInfo)
    getClients().then(clients => setClients(clients))
    getEmployees().then(employees => setEmployees(employees))
    //getServiceSaloons().then(servicesSaloons => setServicesSaloons(servicesSaloons))
    setOpen(true)
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  // const handleHoverEvent = (hoverEvent: EventHoveringArg) => {
  //   hoverEvent.view
  // }

  // const handleEvents = (events: EventApi[]) => {
  //   setcalendarFullState({
  //     currentEvents: events
  //   })
  // }

  return (

    <>
      <Typography variant="h2">Agenda</Typography>
      {console.log('Renderizando FullCallendar')}
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
        //eventContent={renderEventContent} // custom render function
        //height={500}
        nowIndicator={true}

        editable={false} //Ativar Editar evento grid
        selectable={true} //Ativar selecionar grid
        selectMirror={false} //Selecionar grid não aparecer informação antes de adicionada

        events={events} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventClick={handleEventClick}
        //rerenderDelay={1000}
        //eventAdd={}
        //eventChange={function () { }}
        //eventRemove={function () { }}
        eventMouseEnter={event => setOpenPopover(true)}
        eventDidMount={(info) => <Popover
          anchorReference="anchorPosition"
          anchorPosition={{ top: 0, left: 400 }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }} open={openPopover}>
          The content of the Popover.
        </Popover>}
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
              name="client"
              control={control}
              rules={{ required: true }}
              render={
                ({ field }) =>
                  <Select
                    {...field}
                    margin="dense"
                    id="client"
                    label="Cliente"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={field.value ?? ''}
                  >{
                      clients?.map(client => (
                        <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                      ))}
                  </Select>
              }
            />

            <Controller
              name="employee"
              control={control}
              rules={{ required: true }}
              render={
                ({ field }) =>
                  <Select
                    {...field}
                    onChange={e => {
                      getEmployeeById(e.target.value).then(response => setEmployee(response))
                      field.onChange(e)
                    }}
                    onBlur={field.onChange}
                    margin="dense"
                    id='employee'
                    label="Funcionário"
                    type="text"
                    fullWidth
                    value={field.value ?? ''}
                    variant="standard"
                  >{
                      employees?.map(employee => (
                        <MenuItem key={employee.id} value={employee.id}>{employee.name}</MenuItem>
                      ))}
                  </Select>
              }
            />

            {employee &&
              <Controller
                name="service"
                control={control}
                rules={{ required: true }}
                render={
                  ({ field }) =>
                    <Select
                      {...field}
                      onChange={field.onChange}
                      margin="dense"
                      id="service"
                      label="Serviços"
                      type="text"
                      fullWidth
                      value={field.value ?? ''}
                      variant="standard"
                    >{
                        employee?.services?.map(client => (
                          <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                        ))}
                    </Select>
                }
              />}

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
    </>
  )
}

export default CalendarFull
