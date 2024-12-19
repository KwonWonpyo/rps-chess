import { action, makeObservable, observable } from "mobx";
import { executeAIMove } from "../rules/AISimple";
import { MovePawn } from "../rules/Moves";

class GameStore {
  mode;
  team_single;
  team_AI;
  row = 5;
  col = 5;
  field;
  xIsNext = true;
  scoreBoard;
  selectedPawn;
  highlights = [];
  stage;
  hoverPreview = true;

  constructor() {
    this.field = Array.from(Array(this.row), () =>
      Array(this.col).fill(undefined)
    );
    this.xIsNext = false;
    this.selectedPawn = undefined;
    this.scoreBoard = {
      teamScissors: {
        scissors: 0,
        rocks: 0,
      },
      teamPapers: {
        papers: 0,
        rocks: 0,
      },
    };
    this.stage = "";

    makeObservable(this, {
      field: observable.shallow,
      initField: action,
      updateField: action,
      xIsNext: observable,
      toNext: action,
      scoreBoard: observable,
      updateScore: action,
      stage: observable,
      changeStage: action,
      selectedPawn: observable,
      selectPawn: action,
      aiTurn: action,
    });
  }

  initField() {
    this.field = Array.from(Array(this.row), () =>
      Array(this.col).fill(undefined)
    );
    this.updateScore();
  }

  updateField(field) {
    this.field = field;
  }

  printField() {
    console.log("----- Print Game Field -----");
    this.field.forEach((row) => {
      const line = [];
      row.forEach((col) => {
        line.push("[" + col.value + "]");
      });
      console.log(line);
    });
  }

  toNext() {
    this.xIsNext = !this.xIsNext;
  }

  updateScore() {
    this.scoreBoard = {
      teamScissors: {
        scissors: 0,
        rocks: 0,
      },
      teamPapers: {
        papers: 0,
        rocks: 0,
      },
    };
    this.field.forEach((row) => {
      row.forEach((element) => {
        if (element?.value === "SCISSORS")
          this.scoreBoard.teamScissors.scissors++;
        else if (element?.value === "PAPER")
          this.scoreBoard.teamPapers.papers++;
        else if (element?.value === "ROCK") {
          if (element.team === "SCISSORS") this.scoreBoard.teamScissors.rocks++;
          else if (element.team === "PAPER") this.scoreBoard.teamPapers.rocks++;
        }
      });
    });

    // check the winner
    if (this.scoreBoard.teamScissors.scissors === 0) {
      this.changeStage("RESULT");
    } else if (this.scoreBoard.teamPapers.papers === 1) {
      this.changeStage("RESULT");
    }
  }

  changeStage(nextStage) {
    this.stage = nextStage;
  }

  selectPawn(pawn) {
    this.selectedPawn = pawn;
  }

  aiTurn() {
    const aiMove = executeAIMove(this.field, this.team_AI);
    if (aiMove) {
      const { position, move } = aiMove;
      const [x, y] = position;
      const [targetX, targetY] = move;

      // MovePawn 호출로 이동/공격 처리
      MovePawn(this, x, y, targetX, targetY);
    } else {
      // 움직일 수 없으면 에러 반환
      alert("AI가 움직일 수 있는 말이 없습니다.");
    }
  }
}

export default GameStore;
