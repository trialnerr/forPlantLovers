import { Link } from "react-router-dom";
function NotFound() {
  return (
    <main className="grid h-screen place-content-center bg-white px-4 relative">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>
        <p className="mt-4 text-gray-500">We can't find that page.</p>
        <Link
          to={"/"}
          className="mt-6 inline-block bg-green px-5 py-3 text-sm font-medium text-white hover:bg-lightGreen focus:outline-none focus:ring rounded-lg transition"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
