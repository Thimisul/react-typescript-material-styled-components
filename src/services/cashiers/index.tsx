import axios from "axios";
import { CashiersType } from "../../models";

export const getCashiers = async (): Promise<CashiersType[]> => {
   return axios
      .get(`${process.env.REACT_APP_API_HOST}/cashiers`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         console.log(e);
      });
};

export const getCashierById = async (id: any): Promise<CashiersType> => {
   return axios
      .get(`${process.env.REACT_APP_API_HOST}/cashiers/${id}`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return console.log("algo deu errado\n" + e);
      });
};
export const destroyCashier = async (id: any): Promise<CashiersType> => {
   return axios
      .delete(`${process.env.REACT_APP_API_HOST}/cashiers/${id}`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return console.log("algo deu errado\n" + e);
      });
};

export const createCashier = (cashier: CashiersType): Promise<CashiersType> => {
   return axios
      .post(`${process.env.REACT_APP_API_HOST}/cashiers/`, cashier)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return e;
      });
};

export const editCashier = (cashier: CashiersType): Promise<CashiersType> => {
   return axios
      .patch(`${process.env.REACT_APP_API_HOST}/cashiers/${cashier.id}`, cashier)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return e;
      });
};
