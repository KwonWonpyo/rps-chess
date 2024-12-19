import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Routes
import App from "./App";
import Main from "./pages/Main";
import TestPage from "./pages/TestPage";
import ErrorPage from "./pages/ErrorPage";
import SelectPlayer from "./pages/SelectPlayer";
import SelectMode from "./pages/SelectMode";
import PlayGame from "./pages/PlayGame";
import SetupSinglePlay from "./pages/SetupSinglePlay";
import SetupDuoPlay from "./pages/SetupDuoPlay";
import StartPage from "./pages/StartPage";
import HowToPlay from "./components/panel/HowToPlay";
import { AlertModal } from "./components/buttons/BackToMain";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route path="/rps-chess" element={<Main />}>
          <Route path="/rps-chess" element={<StartPage />}>
            <Route path="/rps-chess/howToPlay" element={<HowToPlay />} />
          </Route>
          <Route
            path="/rps-chess/selectPlayerNumber"
            element={<SelectPlayer />}
          />
          <Route path="/rps-chess/singlePlay" element={<SelectMode />} />
        </Route>
        <Route path="/setupSinglePlay" element={<SetupSinglePlay />} />
        <Route path="/setupDuoPlay" element={<SetupDuoPlay />} />
        <Route path="/game" element={<PlayGame />}>
          <Route path="/game/backToMain" element={<AlertModal />} />
        </Route>
        <Route path="/test" element={<TestPage />} />
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
