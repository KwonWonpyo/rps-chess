function GameResult({ game }) {
  if (game.stage !== "RESULT") return <></>;

  // check the result and winner
  let result;
  let winner;
  if (game.mode === "SINGLE_PLAY") {
    if (game.team_single === "SCISSORS") {
      if (game.scoreBoard.teamScissors.scissors === 0) {
        result = "패배";
        winner = "AI 보자기 승";
      } else if (game.scoreBoard.teamPapers.papers === 1) {
        result = "승리";
        winner = "AI를 이겼습니다!";
      }
    } else if (game.team_single === "PAPER") {
      if (game.scoreBoard.teamScissors.scissors === 0) {
        result = "승리";
        winner = "AI를 이겼습니다!";
      } else if (game.scoreBoard.teamPapers.papers === 1) {
        result = "패배";
        winner = "AI 가위 승";
      }
    }
  } else if (game.mode === "DUO_PLAY") {
    result = "승리";
    if (game.scoreBoard.teamScissors.scissors === 0) {
      winner = "보자기가 이겼습니다";
    } else if (game.scoreBoard.teamPapers.papers === 1) {
      winner = "가위가 이겼습니다";
    }
  }

  return (
    <div
      className="relative z-30"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full flex-col items-center justify-center p-4 text-center sm:p-0">
          <div className="relative w-full overflow-hidden rounded-lg bg-gradient-to-t from-[#ffffffbb] via-[#ffffffee] to-[#ffffffbb] p-2 text-center shadow-lg sm:my-8">
            <p className="p-2 font-mono text-5xl font-extrabold text-rose-600">
              {result}
            </p>
            <p className="p-1 font-mono text-xl font-extrabold text-gray-900">
              {winner}
            </p>
          </div>
          <button
            type="button"
            className="mt-4 inline-flex w-7/12 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-40 sm:text-base"
            onClick={() => {
              game.changeStage("AFTERGAME");
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameResult;
