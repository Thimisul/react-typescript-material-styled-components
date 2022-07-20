import ServicesSaloonType from "../servicesSaloon";

export type ServicePackage = {
    id?: string;
    name: string,
    services: ServicesSaloonType[]
    discount: number
  }

  export default ServicePackage