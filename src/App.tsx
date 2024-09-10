import { useEffect, useRef } from "react";
import { Piano } from "./pages";
import { AppRouter } from "./router/Router";
import {
  API_CREATE_GROUP,
  API_CREATE_Question,
  AxiosInstance,
  GetAxiosInstance,
  PostAxiosInstance,
} from "./api/configApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { questionActions } from "./store/questions.slice";
import { profileActions } from "./store/profile.slice";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notificationActions } from "./store/notification-slice";

const App = () => {
  // const text =
  // "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore maiores animi quam tempora voluptate porro, laboriosam odit voluptatum accusamus quisquam nobis dolor pariatur quia dicta eos dolorem facere quod! Aliquam molestias, cupiditate optio amet id corrupti molestiae ducimus numquam fugit ipsum vitae? Necessitatibus nulla ratione soluta exercitationem corrupti consequatur quidem.".toLocaleLowerCase();
  const shortText =
    "Lorem ipsum dolor sit amet consectetur,".toLocaleLowerCase();

  const text2 = "یک روز معذرت از سوی کارکنان بله و دست اندر کاران ما";

  const { isLoggedIn, token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const { error, success } = useSelector(
    (state: RootState) => state.notification
  );

  const errorTimer = useRef<NodeJS.Timeout | null>(null);
  const successTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (success.exist) {
      toast.success(success.message);
      clearTimeout(successTimer.current ?? 0);
      successTimer.current = setTimeout(() => {
        dispatch(notificationActions.resetSuccess());
      }, 1000);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error.exist) {
      toast.error(error.message);
      clearTimeout(errorTimer.current ?? 0);
      errorTimer.current = setTimeout(() => {
        dispatch(notificationActions.resetError());
      }, 3000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(questionActions.getAllQuestion(token));
      dispatch(profileActions.getProfileAction(token));
    }
    AxiosInstance.post(
      API_CREATE_GROUP,
      JSON.stringify({
        id: 12,
        group_name: "hello3",
        password: "1234",
        keys: 30,
      })
    );
  }, [isLoggedIn]);

  return (
    <div className="app">
      <AppRouter />

      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={true}
        draggable
        pauseOnHover
        className="toast"
        theme={"light"}
      />
      {/* <Piano /> */}
    </div>
  );
};

export default App;
