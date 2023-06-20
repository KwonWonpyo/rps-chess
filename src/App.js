import "./App.css";
import GameStore from "./store/GameStore";
import { AuthContext, GameContext } from "./store/Context";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-blue-400 via-indigo-500 via-45% to-purple-400 text-center text-base text-white">
      <AuthContext.Provider value={null}>
        <GameContext.Provider value={GameStore}>
          <Outlet />
        </GameContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
