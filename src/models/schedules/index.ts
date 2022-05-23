import { ClientsType, EmployeesType, ServicesSaloonType } from ".."

export type SchedulesType = {
    id?: string,
    client: ClientsType,
    service: ServicesSaloonType,
    employee: EmployeesType
    date: Date,
    start: Date,
    end: Date
}

export type EventScheduleType = {
    title: string,
    start: Date,
    end: Date,
    extendedProps:{
        id?: string
        client: string,
        service: string,
        employee: string,
        description?: string
    }
}

export default SchedulesType