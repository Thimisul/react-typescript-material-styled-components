import axios from "axios";
import { ServicesSaloonType } from "../../models";

export const getServicesSaloons = async (): Promise<ServicesSaloonType[]> => {
   return axios
      .get(`${process.env.REACT_APP_API_HOST}/ServicesSaloons`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         console.log(e);
      });
};

export const getServicesSaloonById = async (id: any): Promise<ServicesSaloonType> => {
   return axios
      .get(`${process.env.REACT_APP_API_HOST}/ServicesSaloons/${id}`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return console.log("algo deu errado\n" + e);
      });
};
export const destroyServicesSaloon = async (id: any): Promise<ServicesSaloonType> => {
   return axios
      .delete(`${process.env.REACT_APP_API_HOST}/ServicesSaloons/${id}`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return console.log("algo deu errado\n" + e);
      });
};

export const createServicesSaloon = (ServicesSaloon: ServicesSaloonType): Promise<ServicesSaloonType> => {
   return axios
      .post(`${process.env.REACT_APP_API_HOST}/ServicesSaloons/`, ServicesSaloon)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return e;
      });
};

export const editServicesSaloon = (ServicesSaloon: ServicesSaloonType): Promise<ServicesSaloonType> => {
   return axios
      .patch(`${process.env.REACT_APP_API_HOST}/ServicesSaloons/${ServicesSaloon.id}`, ServicesSaloon)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return e;
      });
};
