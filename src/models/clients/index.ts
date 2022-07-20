import AgreementsType from "../agreements"

export type ClientType = {
    id?: string | number,
    cpf: string
    name: string
    birthday: string
    cep: string
    street: string;
    number: string;
    district: string;
    city: string;
    complement?: string
    agreement? : AgreementsType
  }

  export default ClientType