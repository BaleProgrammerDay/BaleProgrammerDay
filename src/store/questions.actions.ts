import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  API_GET_ONE_QUESTION,
  API_GET_ALL_QUESTION,
  AxiosInstance,
  GetAxiosInstance,
  PostAxiosInstance,
  API_PURCHASE_QUESTION,
  API_SEND_ANSWER,
} from "~/api/configApi";
import { questionActions } from "./questions.slice";
import { Question, QuestionInfo } from "~/types";
import { profileActions } from "./profile.slice";
import { notificationActions } from "./notification-slice";

export const getAllQuestion = createAsyncThunk(
  "question/getAll",
  async (user_token: string, { dispatch }) => {
    try {
      const req = await GetAxiosInstance(user_token).get(API_GET_ALL_QUESTION);

      const validDatas = (
        req.data as {
          is_answerd: boolean;
          is_purchased: boolean;
          is_starred: boolean;
          id: string;
          score: number;
          cost: number;
          is_active: boolean;
        }[]
      ).map(
        ({
          is_answerd,
          is_purchased,
          is_starred,
          id,
          score,
          cost,
          is_active,
        }) => ({
          isActive: is_active,
          isAnswerd: is_answerd,
          isPurchased: is_purchased,
          isStarred: is_starred,
          id,
          score,
          cost,
        })
      );

      dispatch(questionActions.setQuestions(validDatas));
    } catch (error) {}
  }
);

export const getOneQusetion = createAsyncThunk(
  "question/getOne",
  async (
    data: {
      id: string;
      cb: (questionInfo: QuestionInfo) => void;
      user_token: string;
    },
    { dispatch }
  ) => {
    try {
      const { id, cb } = data;

      PostAxiosInstance(data.user_token);
      const req = await PostAxiosInstance(data.user_token).post(
        API_GET_ONE_QUESTION,
        JSON.stringify({ id })
      );

      const res = req.data;

      cb(res);
    } catch (error) {
      console.log(error);
    }
  }
);

export const purchaseQusetion = createAsyncThunk(
  "question/purchase",
  async (
    data: {
      id: string;
      cb: () => void;
      user_token: string;
    },
    { dispatch }
  ) => {
    try {
      const { id, cb } = data;

      PostAxiosInstance(data.user_token);
      const req = await PostAxiosInstance(data.user_token).post(
        API_PURCHASE_QUESTION,
        JSON.stringify({ question_id: id })
      );

      const { left_keys } = req.data;

      dispatch(profileActions.setKeys(left_keys));
      dispatch(questionActions.getAllQuestion(data.user_token));

      cb();
    } catch (error) {
      console.log(error);
    }
  }
);

export const sendQuestionResult = createAsyncThunk(
  "question/sendResult",
  async (
    data: {
      id: string;
      cb: () => void;
      result: string;
      user_token: string;
      point: number;
    },
    { dispatch }
  ) => {
    try {
      const { id, cb, result, point } = data;

      const ERROR_MESSAGE = "هههه غلطه :)))";
      const SUCCESS_MESSAGE = "سوال رو درست حل کردی.";

      const req = await PostAxiosInstance(data.user_token).post(
        API_SEND_ANSWER,
        JSON.stringify({ answer: result, question_id: id }),
        {
          method: "POST",
        }
      );

      const { result: isAnswer } = req.data;

      dispatch(questionActions.updateParamQuestion({ isAnswerd: isAnswer }));

      if (isAnswer) {
        dispatch(profileActions.updateScore(point));
        dispatch(
          notificationActions.changeSuccess({
            exist: true,
            message: SUCCESS_MESSAGE,
          })
        );
        cb();
      } else {
        dispatch(
          notificationActions.changeError({
            exist: true,
            message: ERROR_MESSAGE,
          })
        );
      }

      dispatch(questionActions.getAllQuestion(data.user_token));
    } catch (error) {}
  }
);
