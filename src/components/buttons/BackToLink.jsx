import { Link } from "react-router-dom";

function BackToLink({ backTo, text }) {
  return (
    <Link
      className="m-1 text-lg font-bold text-cyan-400 hover:text-green-300"
      to={backTo}
    >
      {text ?? "이전으로 돌아가기"}
    </Link>
  );
}

export default BackToLink;
