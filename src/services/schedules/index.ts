import axios from "axios";
import { SchedulesType } from "../../models";

export const getSchedules = async (): Promise<SchedulesType[]> => {
   return axios
      .get(`${process.env.REACT_APP_API_HOST}/schedules`)
      .then((res) => {
         console.log("Retonando: ");
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         console.log(e);
      });
};

export const getScheduleById = async (
   id: string | number
): Promise<SchedulesType> => {
   return axios
      .get(`${process.env.REACT_APP_API_HOST}/schedules/${id}`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return console.log("algo deu errado\n" + e);
      });
};

export const createSchedule = (
   schedule: SchedulesType
): Promise<SchedulesType> => {
   if (schedule.id) {
      return axios
         .patch(
            `${process.env.REACT_APP_API_HOST}/schedules/${schedule.id}`,
            schedule
         )
         .then((res) => {
            console.log(res.data);
            return res.data;
         })
         .catch((e) => {
            return e;
         });
   } else {
      return axios
         .post(`${process.env.REACT_APP_API_HOST}/schedules`, schedule)
         .then((res) => {
            console.log(res.data);
            return res.data;
         })
         .catch((e) => {
            return e;
         });
   }
};

export const destroySchedule = (id: String | number): Promise<string | number | void> => {
   return axios
      .delete(`${process.env.REACT_APP_API_HOST}/schedules/${id}`)
      .then((res) => {
         console.log(res.data);
         return res.data;
      })
      .catch((e) => {
         return e;
      });
};
