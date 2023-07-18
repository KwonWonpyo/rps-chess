import { action, makeObservable, observable } from "mobx";

class GameStore {
  num_of_players;
  row = 5;
  col = 5;
  field;
  xIsNext = true;
  numScissors = 0;
  numRocks = 0;
  numPapers = 0;
  selectedPawn;
  highlights = [];
  stage;

  constructor() {
    this.field = Array.from(Array(this.row), () =>
      Array(this.col).fill("undefined")
    );
    this.xIsNext = false;
    this.selectedPawn = undefined;

    makeObservable(this, {
      field: observable,
      initField: action,
      updateField: action,
      xIsNext: observable,
      numScissors: observable,
      numRocks: observable,
      numPapers: observable,
      updateNumbers: action,
      selectedPawn: observable,
      SelectPawn: action,
    });
  }

  initField() {
    this.field = Array.from(Array(this.row), () =>
      Array(this.col).fill("undefined")
    );
  }

  setNumPlayers(num_of_players) {
    this.num_of_players = num_of_players;
  }

  updateField(field) {
    this.field = field;
  }

  updateNumbers() {
    let scissors = 0;
    let rocks = 0;
    let papers = 0;
    this.field.forEach((row) => {
      row.forEach((element) => {
        if (element?.value === "SCISSORS") scissors++;
        else if (element?.value === "ROCK") rocks++;
        else if (element?.value === "PAPER") papers++;
      });
    });

    this.numScissors = scissors;
    this.numRocks = rocks;
    this.numPapers = papers;
  }

  SelectPawn(pawn) {
    this.selectedPawn = pawn;
  }
}

export default GameStore;
