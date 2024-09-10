import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  API_GET_SCOREBOARD,
  AxiosInstance,
  GetAxiosInstance,
} from "~/api/configApi";
import { Question, Team } from "~/types";
import { notificationActions } from "./notification-slice";

export const getAllTeams = createAsyncThunk(
  "scoreboard/getAll",
  async (user_token: string, { dispatch }) => {
    try {
      const req = await GetAxiosInstance(user_token).get(API_GET_SCOREBOARD);

      //@ts-ignore :))))))
      const validData = req.data.map(({ group_name, score, self }) => ({
        name: group_name,
        point: score,
        self,
      }));

      dispatch(scoreBoardActions.setTeams(validData));
    } catch (error) {}
  }
);

const initialState: { teams: Team[] } = { teams: [] };

const scoreBoardSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<Team[]>) {
      state.teams = action.payload;
    },
  },
});

export const scoreBoardActions = {
  ...scoreBoardSlice.actions,
  getAllTeams,
};
export const scoreBoardReducer = scoreBoardSlice.reducer;
