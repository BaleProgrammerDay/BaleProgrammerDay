import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";

// replace console.* for disable log on production
if (import.meta.env.PROD) {
  console.log = () => {
    /**/
  };
  console.error = () => {
    /**/
  };
  console.debug = () => {
    /**/
  };
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
