import axios from "axios";
import { ServicesSaloonType } from "../../models";

export const getServiceSaloons = async ():Promise<ServicesSaloonType[]> => {
  return axios
    .get(`${process.env.REACT_APP_API_HOST}/servicesSaloons`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch(e => {
      console.log(e)
    });
};

export const getServiceSaloonById = async (id: any) => {
  return axios
    .get(`${process.env.REACT_APP_API_HOST}/servicesSaloon/${id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => {
        return console.log('algo deu errado\n' + e);
    });
};

export const createServiceSaloon = (serviceSaloon: ServicesSaloonType) => {
    return axios
      .post(`${process.env.REACT_APP_API_HOST}/servicesSaloons/`, serviceSaloon)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((e) => {
        return e;
      });
  };