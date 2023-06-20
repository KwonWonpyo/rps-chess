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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route path="/main" element={<Main />}>
          <Route path="/main" element={<SelectPlayer />} />
          <Route path="/main/singlePlay" element={<SelectPlayer />} />
          <Route path="/main/multiPlay" element={<SelectPlayer />} />
        </Route>
      </Route>
      <Route path="test" element={<TestPage />} />
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
