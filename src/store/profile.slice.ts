import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_GET_PROFILE, GetAxiosInstance } from "~/api/configApi";

export const getProfileAction = createAsyncThunk(
  "profile/get",
  async (user_token: string, { dispatch }) => {
    try {
      const req = await GetAxiosInstance(user_token).get(API_GET_PROFILE);

      dispatch(profileActions.setProfile(req.data));
    } catch (error) {}
  }
);

export const initialState: {
  keys: number;
  score: number;
} = {
  keys: 0,
  score: 0,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<{ keys: number; score: number }>) {
      const { keys, score } = action.payload;

      state.keys = keys;
      state.score = score;
    },
    setKeys(state, action: PayloadAction<number>) {
      state.keys = action.payload;
    },
    setScore(state, action: PayloadAction<number>) {
      state.score = action.payload;
    },
    updateScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },
  },
});

export const profileActions = { ...profileSlice.actions, getProfileAction };
export const profileReducer = profileSlice.reducer;
