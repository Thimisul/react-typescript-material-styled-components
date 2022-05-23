import { ServicesSaloonInterface } from "../../Pages/ServicesSaloon";

export type AgreementsType = {
    id?: string;
    fantasyName: string,
    corporateName: string
    cnpj: string
    discount: string,
    city: string,
    state: string,
    street: string,
    cep: string,
    number: string,
    complement: string,
    Service: ServicesSaloonInterface
  }

  export default AgreementsType