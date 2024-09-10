import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_LOGIN, AxiosInstance } from "~/api/configApi";

const auth = localStorage.getItem("loggedIn");
const token = localStorage.getItem("token");

export const loginAction = createAsyncThunk(
  "auth/login",
  async (data: { password: string; username: string }, { dispatch }) => {
    try {
      const req = await AxiosInstance.post(
        API_LOGIN,
        JSON.stringify({
          password: data.password,
          group_name: data.username,
        })
      );

      const res = await req.data;

      dispatch(authActions.loggin({ ...data, token: res.group_id }));
    } catch (error) {}
  }
);

export const initialState: {
  username: string;
  password: string;
  isLoggedIn: boolean;
  token: string;
} = {
  username: "",
  password: "",
  isLoggedIn: !!auth,
  token: token ?? "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggin(
      state,
      action: PayloadAction<{
        username: string;
        password: string;
        token: string;
      }>
    ) {
      const { username, password, token } = action.payload;

      state.username = username;
      state.password = password;
      state.isLoggedIn = true;
      state.token = token;

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("token", token);
    },
  },
});

export const authActions = { ...authSlice.actions, loginAction };
export const authReducer = authSlice.reducer;
