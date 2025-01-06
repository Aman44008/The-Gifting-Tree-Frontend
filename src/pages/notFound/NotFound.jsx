import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-grow justify-center items-center flex-col gap-8 dark:bg-gray-900 dark:text-white pb-12">
      <h1 className="font-semibold text-9xl text-primary800 mt-12 md:mt-24">
        Oops!
      </h1>
      <h2 className="text-2xl font-semibold text-primary800 dark:text-white">404 Not Found</h2>
      <p className="text-gray-600 dark:text-white">Looks like you lost your way</p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 rounded-md hover:scale-[1.01] transition-transform duration-200 ease-in-out text-sm sm:text-base"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;