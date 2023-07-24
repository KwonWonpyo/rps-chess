import { action, makeObservable, observable } from "mobx";

class GameStore {
  mode;
  team_single;
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
      field: observable,
      initField: action,
      updateField: action,
      xIsNext: observable,
      scoreBoard: observable,
      updateScore: action,
      stage: observable,
      changeStage: action,
      selectedPawn: observable,
      selectPawn: action,
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
          else if (element.team === "PAPER")
            this.scoreBoard.teamScissors.rocks++;
        }
      });
    });
  }

  changeStage(nextStage) {
    this.stage = nextStage;
  }

  selectPawn(pawn) {
    this.selectedPawn = pawn;
  }
}

export default GameStore;
