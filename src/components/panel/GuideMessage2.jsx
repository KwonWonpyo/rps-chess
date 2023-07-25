function GuideMessage2({ game }) {
  if (game.stage !== "PLAY") {
    return (
      <div className="m-3 h-12 animate-pulse font-mono text-orange-200">
        게임이 종료되었습니다.
      </div>
    );
  }
  return (
    <div className="m-3 h-12 animate-pulse font-mono text-orange-200">
      {game.xIsNext
        ? "가위팀이 움직일 차례입니다."
        : "보자기팀이 움직일 차례입니다."}
    </div>
  );
}

export default GuideMessage2;
