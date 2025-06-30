import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="text-center mt-12 space-y-4">
      <h1 className="text-3xl mb-12">Oops!</h1>
      <p className="">
        {error?.statusText || "Sorry, an unexpected error has occurred."}
      </p>
      <p>{error?.message}</p>
      <Link to="/dashboard/dashboardHome">
        <button className="p-4 bg-blue-900 text-white mt-6">
          Go to dashboard
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;