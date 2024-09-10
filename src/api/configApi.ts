import axios from "axios";

export const baseUrl = "http://188.121.122.87:5000";

export const API_LOGIN = "/login";
export const API_REGISTER = "/api/user/register/";

export const API_GET_ALL_QUESTION = "/all-questions";
export const API_GET_ONE_QUESTION = `/question-details`;
export const API_SEND_ANSWER = `/submit`;

export const API_GET_SCOREBOARD = "/ranking";

export const API_GET_PROFILE = "/group-info";

export const API_PURCHASE_QUESTION = "/purchase-question";

export const API_CREATE_GROUP = "/new-group";
export const API_CREATE_Question = "/new-question";

export const AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const GetAxiosInstance = (user_token: string) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `GroupID ${user_token}`,
    },
  });
};

export const PostAxiosInstance = (user_token: string) => {
  return axios.create({
    baseURL: baseUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `GroupID ${user_token}`,
    },
  });
};
