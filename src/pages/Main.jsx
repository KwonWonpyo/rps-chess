import { Outlet } from "react-router-dom";
import logo from "../logo.svg";

function Main() {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <div className="text-u mt-2 px-2 py-2 font-mono text-5xl font-bold">
        <span className="text-red-500">가위</span>
        <span className="text-orange-500">바위</span>
        <span className="text-emerald-400">보</span>
      </div>
      <div className="mb-2 px-2 py-1 font-mono text-5xl font-extrabold">
        체스
      </div>
      <div className="flex flex-col">
        <Outlet />
      </div>
      <div className="fixed bottom-0 text-xs text-gray-200">
        &copy;copyright 2024, 권원표
      </div>
    </>
  );
}

export default Main;
