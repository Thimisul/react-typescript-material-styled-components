import React, { ComponentType, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { AppointmentModel, ViewState, EditingState, AppointmentTooltip, AppointmentForm  } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  WeekView,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Container } from "@mui/material";
import { getSchedules } from "../../services/schedules";

// const currentDate = "2018-11-01";

const ScheduleDevExpress = () => {
    const [currentViewName, setCurrentViewName] = useState('Week');

    const [apointment, setApointament] = useState<AppointmentModel>()
  const [schedulerData, setSchedulerData] = useState<Array<AppointmentModel>>(
    []
  );

  const handleCommitChanges = () => {
    console.log('Pra fazer')
  }

  useEffect(() => {
    getSchedules().then((response) =>
      response.map((schedule) => {
        setSchedulerData(state => [{
          title: schedule.client.name,
          startDate: new Date(schedule.start),
          endDate: new Date(schedule.end),
          extendedProps: {
            client: schedule.client.name,
            employee: schedule.employee.name,
            service: schedule.service.name,
          },
        }, ...state]);
      })
    );
    console.log('scheduler data tratado: '+ schedulerData);
    setSchedulerData(schedulerData);
  }, []);

//   const tLayoutComponent = (): ComponentType<AppointmentTooltip.LayoutProps>  => {
//       return(
//         M
//       )
//   }


  return (
    <Container>
      <Paper>
         { console.log('schedulerData' + schedulerData)}
        {schedulerData ? (
          <Scheduler data={schedulerData} locale='pt-BR'>
            <ViewState defaultCurrentViewName={currentViewName} onCurrentViewNameChange={viewName => setCurrentViewName(viewName)} />
            <DayView startDayHour={8} endDayHour={22} />
            <WeekView startDayHour={8} endDayHour={22} />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <Appointments />
            <EditingState onCommitChanges={changes => console.log(changes)}/>
          </Scheduler>
        ) : (
          <></>
        )}
      </Paper>
    </Container>
  );
};

export default ScheduleDevExpress;
