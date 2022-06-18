import { ClientsType, EmployeesType, ServicesSaloonType } from ".."

export type SchedulesType = {
    id?: string | number,
    client: ClientsType,
    service: ServicesSaloonType,
    employee: EmployeesType
    start: Date,
    end?: Date
}

export type EventScheduleType = {
    title: string | number,
    start: string,
    end: string,
    extendedProps: {
        id?: string | number
        client: string,
        service: string,
        employee: string,
        description?: string
    }
}

export default SchedulesType