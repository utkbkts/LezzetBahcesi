import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";
import App from "./App.jsx";
import "./index.css";
import "./variants/Typography.css";
import "moment/dist/locale/tr";
import "moment/min/locales";
import { SocketProvider } from "./context/SocketContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  </StrictMode>
);
