import { ClientsType, EmployeesType, ServicesSaloonType } from ".."

export type SchedulesType = {
    id?: string | number,
    client: ClientsType,
    service: ServicesSaloonType,
    employee: EmployeesType
    start: string,
    end?: string
}


export default SchedulesType