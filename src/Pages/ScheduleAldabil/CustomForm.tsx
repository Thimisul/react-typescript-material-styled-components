import { ProcessedEvent, SchedulerHelpers } from "@aldabil/react-scheduler/dist/types";
import { Box, DialogTitle, DialogContent, DialogContentText, Select, MenuItem, DialogActions, Button, Grid, TextField } from "@mui/material";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { ClientsType, SchedulesType, EmployeesType } from "../../models";
import { getEmployeeById, getEmployees } from "../../services/employees";
import { createSchedule, getScheduleById } from "../../services/schedules";
import { getClients } from "../../services/clients"
import { useEffect, useState } from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from 'date-fns'

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}

export const CustomForm = ({ scheduler }: CustomEditorProps) => {

  useEffect(() => {
    getClients().then(clients => setClients(clients))
    getEmployees().then(employees => setEmployees(employees))

    if (scheduler.edited) {
      getScheduleById(scheduler.edited.event_id).then(schedule => {
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

    data.id = event?.event_id

    try {
      scheduler.loading(true);

      const added_updated_event = await createSchedule(data).then(event => {
        return {
          event_id: event.id,
          title: 'Nome do Cliente', // event.client.name,
          start: parseISO(event.start.toString()),
          end: parseISO(event.end.toString()),
        } as ProcessedEvent
      })

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
    } finally {
      scheduler.loading(false);
      reset()
    }
  }

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>

          <Controller
            name="client.id"
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
            name="employee.id"
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
              name="service.id"
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

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              control={control}
              name="start"
              defaultValue={scheduler.state.start.value}
              rules={{ required: true }} //optional
              render={({ field }) =>
                <DateTimePicker {...field}
                  renderInput={(props) =>
                    <Grid item xs={3} >
                      <TextField value={field.value} {...props} label='Inicio do Serviço'></TextField>
                    </Grid>}
                />
              }
            />

            <Controller
              control={control}
              name="end"
              defaultValue={scheduler.state.end.value}
              rules={{ required: true }} //optional
              render={({ field }) =>
                <DateTimePicker {...field}
                  renderInput={(props) =>
                    <Grid item xs={3} >
                      <TextField value={field.value} {...props} label='Data de Nascimento'></TextField>
                    </Grid>}
                />
              }
            />
          </LocalizationProvider>

        </DialogContent>
        <DialogActions>
          <Button onClick={scheduler.close}>Cancel</Button>
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
    </Box>
  )
}

export default CustomForm