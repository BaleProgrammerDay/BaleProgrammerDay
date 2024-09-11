import { useEffect, useRef } from "react";
import { AppRouter } from "./router/Router";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { questionActions } from "./store/questions.slice";
import { profileActions } from "./store/profile.slice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notificationActions } from "./store/notification-slice";
import { fetchMoreThanUThink } from "./utils";

const App = () => {
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
      fetchMoreThanUThink(() => dispatch(profileActions.getProfileAction(token)), 60000)
    }
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
    </div>
  );
};

export default App;
