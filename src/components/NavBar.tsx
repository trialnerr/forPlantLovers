import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import icon from "../client/assets/android-chrome-192x192.png"

function NavBar() {
  const context = useContext(AuthContext);

  return (
    <nav className="bg-grey shadow-lg px-8 md:px-16 fixed top-0 left-0 w-full z-20 border-b border-b-inherit">
      <div className="container mx-auto flex items-center justify-between h-16">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={icon} className="h-6 md:h-8" alt="forPlantLovers icon" />
          <span className="-ml-1   self-center md:text-2xl font-semibold whitespace-nowrap text-green">
            forPlantLovers
          </span>
        </a>

        {/* Navigation Links */}
        {context?.user && (
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <NavLink
                to="/"
                className="text-black hover:text-green transition"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/identify"
                className="text-black hover:text-green transition"
              >
                Identify a Plant
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gallery"
                className="text-black hover:text-green transition"
              >
                Gallery
              </NavLink>
            </li>
            <li></li>
          </ul>
        )}
        <div className="flex items-center gap-4">
          {!context?.user ? (
            <>
              <NavLink
                to="/login"
                className="text-black hover:text-green text-sm md:text-lg"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="px-2 py-1 md:px-4 md:py-2 bg-green text-grey rounded-lg hover:bg-lightGreen transition text-sm md:text-lg"
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={context.logout}
              className="px-2 py-1 md:px-4 md:py-2 bg-green text-grey rounded-lg hover:bg-lightGreen transition flex items-center gap-2 text-sm md:text-lg"
            >
              Logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {/* Navigation Links on mobile*/}
      {context?.user && (
        <ul className="flex items-center gap-6 w-full justify-center py-2  border-t md:hidden">
          <li>
            <NavLink
              to="/"
              className="text-black hover:text-green transition text-sm md:text-md"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/identify"
              className="text-black hover:text-green transition text-sm md:text-md"
            >
              Identify a Plant
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className="text-black hover:text-green transition text-sm md:text-md"
            >
              Gallery
            </NavLink>
          </li>
          <li></li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
