import React, { useState, useEffect } from 'react';
import { Scheduler } from "@aldabil/react-scheduler"
import Container from '@mui/material/Container';
import { SchedulesType } from '../../models';
import { getSchedules } from '../../services/schedules';
import { ProcessedEvent, SchedulerHelpers } from '@aldabil/react-scheduler/dist/types';
import parseISO from 'date-fns/parseISO';
import ptBR from 'date-fns/locale/pt-BR';
import ClientType from '../../models/clients';
import EventModal from '../../Components/EventModal';
import CustomForm from './CustomForm';


export const SchedulerAldabil = () => {

  const getProcessedEvents = (): Promise<ProcessedEvent[]> => {
    let eventsProcessed: ProcessedEvent[] = []
    return getSchedules().then(response => {
      response.map(schedule => {
        eventsProcessed.push(
          {
            event_id: schedule.id!,
            title: schedule.client.name,
            start: parseISO(schedule.start.toString()),
            end: parseISO(schedule.end.toString()),
            client: schedule.client.name,
            employee: schedule.employee.name,
            service: schedule.service.name,
          }
        )
      })
      return eventsProcessed
    }
    ).catch(err => err)
  }



  return (
    <Container>
      <Scheduler
        locale={ptBR}
        view="month"
        remoteEvents={getProcessedEvents}
        // fields={[{ name: 'Cliente', type: 'select', config: { required: true, label: 'Cliente' } }]}
        customEditor={(scheduler) => <CustomForm scheduler={scheduler} />}
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              <p>Useful to render custom fields...</p>
              <p>Description: {event.description || "Nothing..."}</p>
            </div>
          );
        }}
      />
    </Container>
  )
}


export default SchedulerAldabil