import Board from "../components/board/Board";
import PawnBase from "../components/pawn/PawnBase";

function TestPage() {
  const testField = Array.from(Array(5), () => Array(5).fill(undefined));

  for (let m = 0; m < 2; m++) {
    for (let n = 0; n < 5; n++) {
      testField[m][n] = new PawnBase("ROCK", true, "SCISSORS");
    }
  }

  for (let m = 3; m < 5; m++) {
    for (let n = 0; n < 5; n++) {
      testField[m][n] = new PawnBase("ROCK", true, "PAPER");
    }
  }

  testField[1][0].changeValue("SCISSORS");
  testField[1][1].changeValue("SCISSORS");
  testField[3][0].changeValue("PAPER");
  testField[3][1].changeValue("PAPER");

  // testField[2][2] = new PawnBase("SCISSORS", true, "SCISSORS");
  // testField[1][2] = new PawnBase("ROCK", true, "PAPER");
  // testField[2][1] = new PawnBase("PAPER", true, "PAPER");
  // testField[2][2] = new PawnBase("ROCK", false, "PAPER");

  return (
    <div className="m-2">
      <span className="h-32">테스트 페이지 입니다.</span>
      <Board field={testField} onClick={() => {}} />
    </div>
  );
}

export default TestPage;
