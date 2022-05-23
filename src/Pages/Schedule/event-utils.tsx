import { EventInput } from '@fullcalendar/react'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    title: 'Jessica',
    start: todayStr,
    end: todayStr + 2,
    extendedProps: {
      department: 'BioChemistry'
    },
    description: 'Lecture'
  }
]

export function createEventId() {
  return String(eventGuid++)
}