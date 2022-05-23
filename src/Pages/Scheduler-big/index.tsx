import { Calendar, Event, momentLocalizer  } from "react-big-calendar";
import { useState } from "react";
import { addHours, startOfHour } from "date-fns";
import 'moment-timezone'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { theme } from "../../assets/themeGlobal";
import moment from "moment";


const localizer = momentLocalizer(moment)

const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1)
const now = new Date()
const start = endOfHour(now)
const end = addHours(start, 2)

export const CalendarBig = () => {
  const [events, setEvents] = useState<Event[]>([
    {
        title:'Title',
        start,
        end,
      },
  ]);

  return (
    <div>
      <Calendar
        defaultView='week'
        localizer={localizer}
        events={events}
        style={{ height: '100vh', color: theme.palette.primary.light, backgroundColor: theme.palette.background.paper}}
      />
    </div>
  );
};

export default CalendarBig;
