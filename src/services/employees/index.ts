import axios from "axios";
import { EmployeesType } from "../../models";

export const getEmployees = async (): Promise<EmployeesType[]> => {
   return axios
      .get(`${process.env.REACT_APP_API_HOST}/Employees`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         console.log(e);
      });
};

export const getEmployeeById = async (id: any): Promise<EmployeesType> => {
   return axios
      .get(`${process.env.REACT_APP_API_HOST}/Employees/${id}`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return console.log("algo deu errado\n" + e);
      });
};
export const destroyEmployee = async (id: any): Promise<EmployeesType> => {
   return axios
      .delete(`${process.env.REACT_APP_API_HOST}/Employees/${id}`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return console.log("algo deu errado\n" + e);
      });
};

export const createEmployee = (Employee: EmployeesType): Promise<EmployeesType> => {
   return axios
      .post(`${process.env.REACT_APP_API_HOST}/Employees/`, Employee)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return e;
      });
};

export const editEmployee = (Employee: EmployeesType): Promise<EmployeesType> => {
   return axios
      .patch(`${process.env.REACT_APP_API_HOST}/Employees/${Employee.id}`, Employee)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return e;
      });
};
