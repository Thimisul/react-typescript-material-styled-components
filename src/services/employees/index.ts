import axios from "axios";
import { EmployeesType } from "../../models";

export const getEmployees = async ():Promise<EmployeesType[]> => {
  return axios
    .get(`${process.env.REACT_APP_API_HOST}/employees`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch(e => {
      console.log(e)
    });
};

export const getEmployeeById = async (id: any) => {
  return axios
    .get(`${process.env.REACT_APP_API_HOST}/employee/${id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => {
        return console.log('algo deu errado\n' + e);
    });
};

export const createEmployee = (client: EmployeesType) => {
    return axios
      .post(`${process.env.REACT_APP_API_HOST}/employee/`, client)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((e) => {
        return e;
      });
  };