import { ProcessedEvent, SchedulerHelpers } from "@aldabil/react-scheduler/dist/types";
import { Box, DialogTitle, DialogContent, DialogContentText, Select, MenuItem, DialogActions, Button, Grid, TextField, Dialog } from "@mui/material";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { ClientsType, SchedulesType, EmployeesType } from "../../models";
import { getEmployeeById, getEmployees } from "../../services/employees";
import { createSchedule, getScheduleById } from "../../services/schedules";
import { getClients } from "../../services/clients"
import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { parseISO } from 'date-fns'
import { getServiceSaloonById } from "../../services/servicesSaloon";

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}

export const CustomForm = ({ scheduler }: CustomEditorProps) => {

  useEffect(() => {
    getClients().then(clients => setClients(clients))
    getEmployees().then(employees => setEmployees(employees))

    if (scheduler.edited) {
      getScheduleById(scheduler.edited.event_id).then(schedule => {
        setValue('id', schedule.id)
        setValue('client', schedule.client)
        setValue('employee', schedule.employee)
        getEmployeeById(schedule.employee.id!).then(response => setEmployee(response))
        setValue('service', schedule.service)
        setValue('start', schedule.start)
        setValue('end', schedule.end)
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [clients, setClients] = useState<ClientsType[]>()
  const [employees, setEmployees] = useState<EmployeesType[]>()
  const [employee, setEmployee] = useState<EmployeesType>()
  const { handleSubmit, control, reset, setValue } = useForm<SchedulesType>();

  const event = scheduler.edited;

  const onSubmit: SubmitHandler<SchedulesType> = async (data: SchedulesType) => {
     console.log("event id: @@@@@@@@ " + data.service.id)

    data.id = event?.event_id
    await getServiceSaloonById(data.service.id!).then( service =>  data.end =  new Date(data.start.getTime() + service.duration * 60 * 1000))
   

    try {
      scheduler.loading(true);

      const added_updated_event = await createSchedule(data).then(event => {
      //   return {
      //     event_id: event.id,
      //     title: event.client.name ?? 'Nome do Cliente',
      //     start: parseISO(event.start),
      //     end: parseISO(new Date(event.start + event.service.duration*60*1000).toString() )
      //   } as ProcessedEvent
      return {
         event_id: event.id,
         title: event.client.name ?? 'Nome do Cliente',
         start: parseISO(event.start.toISOString()),
         end: parseISO(event.end!.toISOString()),
         client: event.client,
         service: event.service,
         employee: event.employee
       } as ProcessedEvent
      })

      console.log(`aaaaadddddd and updateeeeee`)
      console.log(added_updated_event)

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
    } finally {
      scheduler.loading(false);
      reset()
    }
  }

  return (
     
   <Grid container spacing={2} maxWidth="100%">
     <Dialog open={true} maxWidth="lg">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Novo Agendamento <Button onClick={scheduler.close}>Cancel</Button></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite os dados para agendamento: 
          </DialogContentText>

          <Controller
            name="client.id"
            control={control}
            rules={{ required: true }}
            render={
              ({ field }) =>
              <Grid item xs={12} sx={{my: 2}}>
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
                </Grid>
            }
          />

          <Controller
            name="employee.id"
            control={control}
            rules={{ required: true }}
            render={
              ({ field }) =>
              <Grid item xs={12} sx={{my: 2}}>
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
                </Grid>
            }
          />

          {employee &&
            <Controller
              name="service.id"
              control={control}
              rules={{ required: true }}
              render={
                ({ field }) =>
                <Grid item xs={12} sx={{my: 2}} >
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
                  </Grid>
              }
            />}

            
            <Controller
              control={control}
              name="start"
              defaultValue={scheduler.state.start.value}
              rules={{ required: true }} //optional
              render={({ field }) =>
              <Grid item xs={12} sx={{my: 2}}>
                <DateTimePicker  {...field}
                  renderInput={(props) =>
                      <TextField value={field.value} {...props} label='Inicio do Serviço'></TextField>
                    }
                />
                </Grid>
              }
            />

        </DialogContent>
        <DialogActions>
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
    </Grid>
  )
}

export default CustomForm
