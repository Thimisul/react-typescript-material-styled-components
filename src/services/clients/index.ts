import axios from "axios";
import { ClientType } from "../../models/clients";

export const getClients = async ():Promise<ClientType[]> => {
  return axios
    .get(`${process.env.REACT_APP_API_HOST}/clients`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch(e => {
      console.log(e)
    });
};

export const getClientById = async (id: any) => {
  return axios
    .get(`${process.env.REACT_APP_API_HOST}/clients/${id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => {
        return console.log('algo deu errado\n' + e);
    });
};

export const createClient = (client: ClientType) => {
    return axios
      .post(`${process.env.REACT_APP_API_HOST}/clients/`, client)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((e) => {
        return e;
      });
  };