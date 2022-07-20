import React, { useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import Container from "@mui/material/Container";
import { getSchedules, destroySchedule, createEditSchedule } from "../../services/schedules";
import { ProcessedEvent } from "@aldabil/react-scheduler/dist/types";
import locale from "date-fns/locale/pt-BR";
import CustomForm from "./CustomForm";
import { Box, Divider, Grid, Typography } from "@mui/material";
import theme from "../../assets/themeGlobal";
import { SchedulesType } from "../../models";

export const SchedulerAldabil = () => {

   const getSchedulesToProcessedEvents = async (): Promise<
      ProcessedEvent[]
   > => {
      const response = await getSchedules();
      console.log("To PromisseEvent");
      console.log(response);  
      return response.map(schedule =>{
         return scheduleToPromissedEvent(schedule);
      })
   };

   const handleOnDelete = async (deletedId: string | number): Promise<string | number | void> => {
      const response = await destroySchedule(deletedId)
      console.log(response)
   }

   const handleDropEvent = async (
      droppedOn: Date,
      updatedEvent: ProcessedEvent,
      originalEvent: ProcessedEvent
   ): Promise<void | ProcessedEvent> => {
      console.log("Original Event")
      console.log(originalEvent)
      console.log("Update Event")
      console.log(updatedEvent)
      console.log("Droped On")
      console.log(droppedOn)
      const response = await createEditSchedule({
         id: originalEvent.event_id,
         start: updatedEvent.start.toString(),
         end: updatedEvent.end.toString(),
         client: updatedEvent.client.id,
         employee: updatedEvent.employee.id,
         service: updatedEvent.service.id,
      }).then((schedule) => scheduleToPromissedEvent(schedule));
      console.log(`response scheduleToPromissedEvent`)
      return response;
   };

   const scheduleToPromissedEvent = (schedule: SchedulesType) => {
      return {
         event_id: schedule.id!,
         title: schedule.client.name ?? "Sem nome de Cliente",
         start: new Date(schedule.start),
         end: new Date(schedule.end!),
         client: schedule.client.name ?? "Sem nome de Cliente",
         employee: schedule.employee.name ?? "Sem nome de Funcionário",
         service: schedule.service.name ?? "Sem nome de Serviço",
      } as ProcessedEvent;
   };

   return (
      <Container>
       
        <Typography mt={3} variant={'h4'}>Agendamentos</Typography>
        <Divider />
        <Box mt={3}></Box>
      <Box >
         <Scheduler
         height={450}
            locale={locale}
            view="month"
            month={{
               weekDays: [1, 2, 3, 4, 5, 6, 0],
               weekStartOn: 0,
               startHour: 7,
               endHour: 22,
            }}
            week={{
               weekDays: [1, 2, 3, 4, 5, 6, 0],
               weekStartOn: 0,
               startHour: 7,
               endHour: 22,
               step: 30
            }}
            day={{
               startHour: 7,
               endHour: 22,
               step: 30

            }}
            remoteEvents={getSchedulesToProcessedEvents}
            // fields={[{ name: 'Cliente', type: 'select', config: { required: true, label: 'Cliente' } }]}
            customEditor={(scheduler) => <CustomForm  scheduler={scheduler} />}
            //onEventDrop={handleDropEvent}
            onDelete={handleOnDelete}
            viewerExtraComponent={(_fields, event) => {
               return (
                     <Grid container spacing={1}>
                        <Grid item xs={6}>
                           <Typography
                              sx={{ color: theme.palette.primary.light }}
                           >
                              Funcionario:{" "}
                           </Typography>
                           <Typography>
                              {" "}
                              {event.employee || "Cliente não encontrado"}
                           </Typography>
                        </Grid>
                        <Grid item xs={6}>
                           <Typography
                              sx={{ color: theme.palette.primary.light }}
                           >
                              Serviço:{" "}
                           </Typography>
                           <Typography>
                              {" "}
                              {event.service || "Cliente não encontrado"}
                           </Typography>
                        </Grid>
                     </Grid>
               );
            }}
         />
         </Box>
      </Container>
   );
};

export default SchedulerAldabil;
