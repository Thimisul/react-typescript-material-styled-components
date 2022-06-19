import axios from "axios";
import { AgreementsType } from "../../models/agreements";

export const getAgreements = async (): Promise<AgreementsType[]> => {
   return axios
      .get(`${process.env.REACT_APP_API_HOST}/Agreements`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         console.log(e);
      });
};

export const getAgreementById = async (id: any): Promise<AgreementsType> => {
   return axios
      .get(`${process.env.REACT_APP_API_HOST}/Agreements/${id}`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return console.log("algo deu errado\n" + e);
      });
};
export const destroyAgreement = async (id: any): Promise<AgreementsType> => {
   return axios
      .delete(`${process.env.REACT_APP_API_HOST}/Agreements/${id}`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return console.log("algo deu errado\n" + e);
      });
};

export const createAgreement = (Agreement: AgreementsType): Promise<AgreementsType> => {
   return axios
      .post(`${process.env.REACT_APP_API_HOST}/Agreements/`, Agreement)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return e;
      });
};

export const editAgreement = (Agreement: AgreementsType): Promise<AgreementsType> => {
   return axios
      .patch(`${process.env.REACT_APP_API_HOST}/Agreements/${Agreement.id}`, Agreement)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return e;
      });
};
