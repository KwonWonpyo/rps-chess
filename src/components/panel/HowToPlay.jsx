// HowToPlay.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

function HowToPlay() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "팀 선택",
      text: "두 플레이어는 각각 가위팀과 보자기팀 중 한 팀을 선택합니다.",
      image: "Scissors_vs_Paper.jpg",
    },
    {
      title: "게임 준비",
      text: "가위팀은 가위 2개와 바위 8개, 보자기팀은 보자기 2개와 바위 8개를 가지고 시작합니다.",
      image: "Numbers_of_pawns.jpg",
    },
    {
      title: "게임 시작",
      text: "말을 배치한 후 게임이 시작되면, 모든 말은 비공개 상태가 됩니다.",
      image: "game_board_initial.jpg",
    },
    {
      title: "말의 이동",
      text: "각 플레이어는 자기 차례에 말을 한 칸 씩 이동할 수 있습니다.",
      image: "move_direction.jpg",
    },
    {
      title: "이동과 공격",
      text: "상대방의 말을 공격하면 가위바위보 규칙에 따라 승패가 결정됩니다.",
      image: "attack_example.jpg",
    },
    {
      title: "승리 조건",
      text: "각 팀 마다 승리 조건이 다릅니다. 승리 조건을 확인하고 승리하세요!",
      image: "how_to_win_scissors.jpg",
    },
  ];

  const handlePrevious = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? pages.length - 1 : prevPage - 1
    );
  };

  const handleNext = () => {
    setCurrentPage((prevPage) =>
      prevPage === pages.length - 1 ? 0 : prevPage + 1
    );
  };

  return (
    <div
      className="relative z-30"
      aria-label="howToPlay"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity"></div>
      <div className="fixed inset-0 z-10">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative h-auto w-[90%] max-w-lg rounded-md bg-slate-50 p-6 shadow-lg">
            <Link
              type="button"
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              to={"../"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M 2 2 L 22 22 M 22 2 L 2 22 Z"
                />
              </svg>
            </Link>
            <div className="text-center font-sans text-xl font-extrabold text-cyan-500 lg:mb-4 lg:mt-2 lg:text-3xl">
              {pages[currentPage].title}
            </div>
            <button
              type="button"
              className="absolute left-0 top-1/3 text-gray-400 hover:text-gray-700 lg:top-60"
              onClick={handlePrevious}
            >
              <svg
                className="h-6 w-6 lg:h-9 lg:w-9"
                fill="none"
                viewBox="0 0 20 40"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M 20 2 L 2 20 L 20 38 M 20 38 z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="absolute right-0 top-1/3 text-gray-400 hover:text-gray-700 lg:top-60"
              onClick={handleNext}
            >
              <svg
                className="h-6 w-6 lg:h-9 lg:w-9"
                fill="none"
                viewBox="0 0 20 40"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M 2 2 L 20 20 L 2 38 M 2 38 z"
                />
              </svg>
            </button>
            <div className="flex flex-col items-center">
              <div className="m-3 h-52 w-52 bg-slate-500 sm:h-80 sm:w-80">
                <img
                  src={require(`../../resource/${pages[currentPage].image}`)}
                  alt="Page Illustration"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-2 h-28 text-justify indent-2 font-sans text-lg font-normal text-cyan-800 lg:text-2xl lg:font-light lg:leading-normal">
                {pages[currentPage].text}
              </div>
              <div className="mt-2 flex items-center justify-center space-x-2">
                {pages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-3 w-3 rounded-full ${
                      currentPage === index ? "bg-cyan-800" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToPlay;
