import sleep from "../utils/sleep";
import {
  triggerMoveAnimation,
  triggerFightAnimation,
} from "../utils/animation";

export function fight(attacker, defender) {
  const canWin = {
    ROCK: "SCISSORS",
    SCISSORS: "PAPER",
    PAPER: "ROCK",
  };

  if (canWin[attacker.value] === defender.value) {
    return attacker; // 공격자가 승리
  } else if (canWin[defender.value] === attacker.value) {
    return defender; // 수비자가 승리
  } else {
    return undefined; // 무승부
  }
}

export async function MovePawn(game, x, y, targetX, targetY) {
  if (game.field[x][y] === undefined) return false;
  const field = game.field.slice();

  // change highlight squares
  game.highlights = [];
  game.highlights.push({ x: x, y: y });
  game.highlights.push({ x: targetX, y: targetY });

  if (field[targetX][targetY] === undefined) {
    /* move to empty square */
    await triggerMoveAnimation(x, y, targetX, targetY);
    field[targetX][targetY] = field[x][y];
    field[x][y] = undefined;
    game.updateField(field);
    game.toNext();
  } else {
    /* open both and fight */
    field[x][y].setOpen(true);
    field[targetX][targetY].setOpen(true);
    await triggerFightAnimation(x, y, targetX, targetY);
    sleep(1500).then(() => {
      field[targetX][targetY] = fight(field[x][y], field[targetX][targetY]);
      field[x][y] = undefined;
      game.updateField(field);
      game.updateScore();
      game.toNext();
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
