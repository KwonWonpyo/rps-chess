import sleep from "../utils/sleep";

export function fight(attacker, defender) {
  if (attacker.value === "ROCK") {
    if (defender.value === "SCISSORS") return attacker;
    else if (defender.value === "ROCK") return undefined;
    else if (defender.value === "PAPER") return defender;
  } else if (attacker.value === "SCISSORS") {
    if (defender.value === "SCISSORS") return undefined;
    else if (defender.value === "ROCK") return defender;
    else if (defender.value === "PAPER") return attacker;
  } else if (attacker.value === "PAPER") {
    if (defender.value === "SCISSORS") return defender;
    else if (defender.value === "ROCK") return attacker;
    else if (defender.value === "PAPER") return undefined;
  }
}

export function MovePawn(game, x, y, targetX, targetY) {
  if (game.field[x][y] === undefined) return false;

  // change highlight squares
  game.highlights = [];
  game.highlights.push({ x: x, y: y });
  game.highlights.push({ x: targetX, y: targetY });

  if (game.field[targetX][targetY] === undefined) {
    /* move to empty square */
    game.field[targetX][targetY] = game.field[x][y];
    game.field[x][y] = undefined;
    game.toNext();
    game.updateField(game.field);
  } else {
    /* open both and fight */
    // open both (animation)
    game.field[x][y].setOpen(true);
    game.field[targetX][targetY].setOpen(true);
    game.toNext();
    game.updateField(game.field);

    // fight
    sleep(2000)
      .then(() => {
        game.field[targetX][targetY] = fight(
          game.field[x][y],
          game.field[targetX][targetY]
        );
        game.field[x][y] = undefined;
        game.updateScore();
        game.updateField(game.field);
      })
      .then(() => {
        // check the winner
        if (game.scoreBoard.teamScissors.scissors === 0) {
          game.changeStage("RESULT");
        } else if (game.scoreBoard.teamPapers.papers === 1) {
          game.changeStage("RESULT");
        }
      });
  }
}

export function canGo(game, pawn, x, y) {
  if (!pawn) return false;

  const opponent = game.field[x][y];
  if (opponent === undefined) return true;
  if (opponent.team === pawn.team) return false;
  if (pawn.isOpen && opponent.isOpen) {
    return fight(pawn, opponent) === pawn ? true : false;
  }
  return true;
}

export function moveHelper(game, x, y) {
  if (game.stage !== "PLAY") return [];

  const thisPawn = game.field[x][y];
  if (game.selectedPawn !== thisPawn) return;

  const canGoList = [];

  if (x > 0 && y > 0) {
    canGo(game, thisPawn, x - 1, y - 1) &&
      canGoList.push(
        <div
          className="absolute -left-16 -top-16 z-20 m-0 h-16 w-16 border border-gray-300 bg-cyan-500 opacity-30 md:-left-24 md:-top-24 md:h-24 md:w-24"
          onClick={() => {
            MovePawn(game, x, y, x - 1, y - 1);
          }}
        />
      );
  }
  if (x > 0 && y > -1) {
    canGo(game, thisPawn, x - 1, y) &&
      canGoList.push(
        <div
          className="absolute -top-16 z-20 m-0 h-16 w-16 border border-gray-300 bg-cyan-500 opacity-30 md:-top-24 md:h-24 md:w-24"
          onClick={() => {
            MovePawn(game, x, y, x - 1, y);
          }}
        />
      );
  }
  if (x > 0 && y < 4) {
    canGo(game, thisPawn, x - 1, y + 1) &&
      canGoList.push(
        <div
          className="absolute -top-16 left-16 z-20 m-0 h-16 w-16 border border-gray-300 bg-cyan-500 opacity-30 md:-top-24 md:left-24 md:h-24 md:w-24"
          onClick={() => {
            MovePawn(game, x, y, x - 1, y + 1);
          }}
        />
      );
  }
  if (y > 0) {
    canGo(game, thisPawn, x, y - 1) &&
      canGoList.push(
        <div
          className="absolute -left-16 top-0 z-20 m-0 h-16 w-16 border border-gray-300 bg-cyan-500 opacity-30 md:-left-24 md:h-24 md:w-24"
          onClick={() => {
            MovePawn(game, x, y, x, y - 1);
          }}
        />
      );
  }
  if (y < 4) {
    canGo(game, thisPawn, x, y + 1) &&
      canGoList.push(
        <div
          className="absolute left-16 top-0 z-20 m-0 h-16 w-16 border border-gray-300 bg-cyan-500 opacity-30 md:left-24 md:h-24 md:w-24"
          onClick={() => {
            MovePawn(game, x, y, x, y + 1);
          }}
        />
      );
  }
  if (x < 4 && y > 0) {
    canGo(game, thisPawn, x + 1, y - 1) &&
      canGoList.push(
        <div
          className="absolute -left-16 top-16 z-20 m-0 h-16 w-16 border border-gray-300 bg-cyan-500 opacity-30 md:-left-24 md:top-24 md:h-24 md:w-24"
          onClick={() => {
            MovePawn(game, x, y, x + 1, y - 1);
          }}
        />
      );
  }
  if (x < 4) {
    canGo(game, thisPawn, x + 1, y) &&
      canGoList.push(
        <div
          className="absolute top-16 z-20 m-0 h-16 w-16 border border-gray-300 bg-cyan-500 opacity-30 md:top-24 md:h-24 md:w-24"
          onClick={() => {
            MovePawn(game, x, y, x + 1, y);
          }}
        />
      );
  }
  if (x < 4 && y < 4) {
    canGo(game, thisPawn, x + 1, y + 1) &&
      canGoList.push(
        <div
          className="absolute left-16 top-16 z-20 m-0 h-16 w-16 border border-gray-300 bg-cyan-500 opacity-30 md:left-24 md:top-24 md:h-24 md:w-24"
          onClick={() => {
            MovePawn(game, x, y, x + 1, y + 1);
          }}
        />
      );
  }

  return canGoList;
}
