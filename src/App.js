import "./App.css";
import GameStore from "./store/GameStore";
import { AuthContext, GameContext } from "./store/Context";
import { Outlet } from "react-router-dom";

function App() {
  const gameStore = new GameStore();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-blue-400 via-indigo-500 via-45% to-purple-400 text-center text-base text-white dark:from-sky-950 dark:via-indigo-950 dark:to-purple-950">
      <AuthContext.Provider value={null}>
        <GameContext.Provider value={gameStore}>
          <Outlet />
        </GameContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
