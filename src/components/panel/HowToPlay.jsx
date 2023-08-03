import { Link } from "react-router-dom";

function HowToPlay() {
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
          <div className="relative h-auto w-auto rounded-md bg-slate-50 p-6 shadow-lg">
            <Link
              type="button"
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              to={"../"}
            >
              <svg
                className="h-6 w-6 "
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M 2 2 L 22 22 M 22 2 L 2 22 Z"
                />
              </svg>
            </Link>
            <button
              type="button"
              className="absolute left-0 top-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-6 w-6 "
                fill="none"
                viewBox="0 0 20 40"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M 20 2 L 2 20 L 20 38 M 20 38 z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="absolute right-0 top-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-6 w-6 "
                fill="none"
                viewBox="0 0 20 40"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M 2 2 L 20 20 L 2 38 M 2 38 z"
                />
              </svg>
            </button>
            <div className="m-3 h-56 w-56 bg-slate-500 sm:h-80 sm:w-80"></div>
            <div className="font-sans font-normal text-cyan-800">
              여기에 게임 설명을 작성합니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToPlay;
