import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-blue-400 via-indigo-500 via-45% to-purple-400 text-center text-base text-white">
      <h1 className="m-5 text-4xl font-bold">Oops!</h1>
      <p className="m-3 text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="text-red-300">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link
        className="m-5 text-2xl font-bold text-green-400 hover:bg-indigo-400 hover:text-green-300"
        to={"/rps-chess"}
      >
        Go back to main
      </Link>
    </div>
  );
}
