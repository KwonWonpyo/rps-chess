// src/rules/AISimple.js
/* AI Common Rule */
// 1. AI don't know a value of opponent's unopened pawn
// 2. always do their best and try to win the game

/* AI Simple would */
// move a random pawn to a random position without any prediction or calculation

function findAIPieces(board, team_AI) {
  const AIPieces = [];
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      const piece = board[x][y];
      if (piece && piece.team === team_AI) {
        const position = [x, y];
        AIPieces.push({
          piece: piece,
          position: position,
        });
      }
    }
  }
  return AIPieces;
}

function getValidAttacks(board, piece, team_AI) {
  const [x, y] = piece.position;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1], // 상하좌우
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1], // 대각선
  ];

  const attacks = directions
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(
      ([nx, ny]) =>
        nx >= 0 &&
        nx < board.length &&
        ny >= 0 &&
        ny < board[0].length &&
        board[nx][ny] &&
        board[nx][ny].team !== team_AI // 상대방 말이 있는 칸
    );

  return attacks;
}

function getValidMoves(board, piece, team_AI) {
  const [x, y] = piece.position;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1], // 상하좌우
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1], // 대각선
  ];

  const moves = directions
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(
      ([nx, ny]) =>
        nx >= 0 &&
        nx < board.length &&
        ny >= 0 &&
        ny < board[0].length &&
        !board[nx][ny] // 빈 칸
    );

  return moves;
}

function getRandomMove(validMoves) {
  return validMoves[Math.floor(Math.random() * validMoves.length)];
}

export function executeAIMove(board, team_AI) {
  const aiPieces = findAIPieces(board, team_AI);

  // 공격할 수 있으면 공격을 우선시
  for (const piece of aiPieces) {
    const validAttacks = getValidAttacks(board, piece, team_AI);
    if (validAttacks.length > 0) {
      const chosenAttack = getRandomMove(validAttacks);
      return { position: piece.position, move: chosenAttack };
    }
  }

  // 공격할 수 없는 경우 랜덤 이동
  let i = 0;
  while (i < 10) {
    const randomPiece = aiPieces[Math.floor(Math.random() * aiPieces.length)];
    const validMoves = getValidMoves(board, randomPiece, team_AI);
    if (validMoves.length > 0) {
      const chosenMove = getRandomMove(validMoves);
      return { position: randomPiece.position, move: chosenMove }; // 이동 정보 반환
    }
    i++;
  }

  return null; // 움직일 수 없는 경우
}
