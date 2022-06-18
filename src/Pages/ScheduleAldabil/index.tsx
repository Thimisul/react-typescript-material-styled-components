import React, { useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import Container from "@mui/material/Container";
import { createSchedule, getSchedules, destroySchedule } from "../../services/schedules";
import { ProcessedEvent } from "@aldabil/react-scheduler/dist/types";
import parseISO from "date-fns/parseISO";
import ptBR from "date-fns/locale/pt-BR";
import CustomForm from "./CustomForm";
import { Alert, Button, Grid, Typography } from "@mui/material";
import theme from "../../assets/themeGlobal";
import { SchedulesType } from "../../models";

type AlertDropEventType = {
   isOpen: boolean;
   event?: ProcessedEvent;
   droppedOn?: Date;
};

const AlertDropEvent = ({ isOpen, event, droppedOn }: AlertDropEventType) =>
   isOpen ? (
      <Alert
         severity="warning"
         action={
            <Button color="inherit" size="small">
               UNDO
            </Button>
         }
      >
         <>
            Client: {event?.title} sendo movido para a data: {droppedOn?.toDateString()}
         </>
      </Alert>
   ) : (
      <></>
   );

export const SchedulerAldabil = () => {
   const [alertDropedEvent, setAlertDropedEvent] = useState<AlertDropEventType>(
      { isOpen: false, event: undefined, droppedOn: undefined }
   );

   const getSchedulesToProcessedEvents = async (): Promise<
      ProcessedEvent[]
   > => {
      const response = await getSchedules();
      return response.map((schedule) => scheduleToPromissedEvent(schedule));
   };

   const handleOnDelete = async (deletedId: string | number): Promise<string | number | void> => {
      const response = await destroySchedule(deletedId)
      console.log(response)
   }

   const handleDropEvent = async (
      _droppedOn: Date,
      updatedEvent: ProcessedEvent,
      originalEvent: ProcessedEvent
   ): Promise<void | ProcessedEvent> => {

      const response = await createSchedule({
         id: originalEvent.event_id,
         start: updatedEvent.start,
         end: updatedEvent.end,
         client: updatedEvent.client.id,
         employee: updatedEvent.employee.id,
         service: updatedEvent.service.id,
      }).then((schedule) => scheduleToPromissedEvent(schedule));
      console.log(`response scheduleToPromissedEvent`)
      return response;
   };

   const scheduleToPromissedEvent = (schedule: SchedulesType) => {
      console.log("ScheduleToPromissedEvent");
      console.log(schedule);
      return {
         event_id: schedule.id!,
         title: schedule.client.name,
         start: schedule.start,
         end: schedule.end!,
         client: schedule.client.name,
         employee: schedule.employee.name,
         service: schedule.service.name,
      } as ProcessedEvent;
   };

   return (
      <Container>

         <AlertDropEvent
            isOpen={alertDropedEvent.isOpen}
            droppedOn={alertDropedEvent.droppedOn}
            event={alertDropedEvent.event}
         ></AlertDropEvent>

         <Scheduler
            locale={ptBR}
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
            fields={[{ name: 'Cliente', type: 'select', config: { required: true, label: 'Cliente' } }]}
            customEditor={(scheduler) => <CustomForm  scheduler={scheduler} />}
            onEventDrop={handleDropEvent}
            onDelete={handleOnDelete}
            viewerExtraComponent={(_fields, event) => {
               return (
                  <>
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
                  </>
               );
            }}
         />
      </Container>
   );
};

export default SchedulerAldabil;
