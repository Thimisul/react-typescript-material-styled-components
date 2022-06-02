import axios from "axios";
import { SchedulesType } from "../../models";

export const getSchedules = async ():Promise<SchedulesType[]> => {
  return axios
    .get(`${process.env.REACT_APP_API_HOST}/schedules`)
    .then((res) => {
      console.log('Retonando: ')
      console.log(res.data);
      return res.data;
    })
    .catch(e => {
      console.log(e)
    });
};

export const getScheduleById = async (id: any) => {
  return axios
    .get(`${process.env.REACT_APP_API_HOST}/schedule/${id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => {
        return console.log('algo deu errado\n' + e);
    });
};

export const createSchedule = (schedule: SchedulesType) => {
    return axios
      .post(`${process.env.REACT_APP_API_HOST}/schedules/`, schedule)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((e) => {
        return e;
      });
  };