import { ServicesSaloonType } from "../servicesSaloon";
import ClientType from "../clients";

export type CashiersSaloonType = {
    id?: string;
    client: ClientType,
    services: ServicesSaloonType | ServicesSaloonType[],
    price: string,
    date: Date,
    status: 'AGENDADO' | 'ABERTO' | 'PAGO'
  }
  