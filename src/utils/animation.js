export function triggerMoveAnimation(x, y, targetX, targetY) {
  return new Promise((resolve) => {
    const piece = document.querySelector(`[piece-position='${x}-${y}']`);
    const cell = document.querySelector(`[cell-position='${x}-${y}']`);
    const targetCell = document.querySelector(
      `[cell-position='${targetX}-${targetY}']`
    );

    if (!cell || !targetCell) return resolve();

    // z-index를 확인하고 쌓임 맥락 조정
    const cellZindex = cell.style.zIndex;
    cell.style.zIndex = "50";

    playSoundEffect("move");
    const animation = piece.animate(
      [
        { transform: "translate(0, 0)" },
        {
          transform: `translate(${targetCell.offsetLeft - cell.offsetLeft}px, ${
            targetCell.offsetTop - cell.offsetTop
          }px)`,
        },
      ],
      {
        duration: 500,
        easing: "ease-out",
      }
    );

    animation.onfinish = () => {
      // 애니메이션 종료 후 DOM 상태를 업데이트하여 플리커링 방지
      piece.style.transform = `translate(${
        targetCell.offsetLeft - cell.offsetLeft
      }px, ${targetCell.offsetTop - cell.offsetTop}px)`;
      // cell.style.position = "";
      cell.style.zIndex = cellZindex;
      resolve();
    };
  });
}

export function triggerFightAnimation(x, y, targetX, targetY) {
  return new Promise((resolve) => {
    const piece = document.querySelector(`[piece-position='${x}-${y}']`);
    const targetPiece = document.querySelector(
      `[piece-position='${targetX}-${targetY}']`
    );
    const cell = document.querySelector(`[cell-position='${x}-${y}']`);
    const targetCell = document.querySelector(
      `[cell-position='${targetX}-${targetY}']`
    );

    if (!cell || !targetCell) return resolve();

    // 애니메이션 단계 1: Open 상태로 변환
    const openAnimation = [
      { transform: "scale(1)", opacity: 1 },
      { transform: "scale(1.2)", opacity: 0.8 },
      { transform: "scale(1)", opacity: 1 },
    ];

    const openTiming = {
      duration: 300,
      easing: "ease-in-out",
    };

    const elementOpenAnim = piece.animate(openAnimation, openTiming);
    const targetOpenAnim = targetPiece.animate(openAnimation, openTiming);

    elementOpenAnim.onfinish = () => {
      // element.classList.add("open");
      playSoundEffect("fight");
    };

    targetOpenAnim.onfinish = () => {
      // targetElement.classList.add("open");

      // 애니메이션 단계 2: 충돌 애니메이션
      const elementMoveAnim = piece.animate(
        [
          { transform: "translate(0, 0)" },
          {
            transform: `translate(${
              (targetPiece.offsetLeft - piece.offsetLeft) / 2
            }px, ${(targetPiece.offsetTop - piece.offsetTop) / 2}px)`,
          },
          { transform: "translate(0, 0)" },
        ],
        {
          duration: 500,
          easing: "ease-in-out",
        }
      );

      const targetMoveAnim = targetPiece.animate(
        [
          { transform: "translate(0, 0)" },
          {
            transform: `translate(${
              (piece.offsetLeft - targetPiece.offsetLeft) / 2
            }px, ${(piece.offsetTop - targetPiece.offsetTop) / 2}px)`,
          },
          { transform: "translate(0, 0)" },
        ],
        {
          duration: 500,
          easing: "ease-in-out",
        }
      );

      targetMoveAnim.onfinish = () => {
        resolve(); // 충돌 애니메이션 완료 후 Promise 해결
      };
    };
  });
}

function playSoundEffect(type) {
  const audio = new Audio();
  switch (type) {
    case "move":
      audio.src = `${process.env.PUBLIC_URL}/sounds/ficha-de-ajedrez-34722.mp3`;
      break;
    case "fight":
      audio.src = `${process.env.PUBLIC_URL}/sounds/KM184_ST_192_cut.mp3`;
      break;
    // 추가적인 효과음 타입 처리
    default:
      console.warn("Unknown sound effect type:", type);
      return;
  }
  audio.play().catch((error) => console.error("Error playing sound:", error));
}
