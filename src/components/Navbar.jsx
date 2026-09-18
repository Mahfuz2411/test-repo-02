import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className=" bg-gray-800 text-white p-4 ">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">
          Movie<span className="text-yellow-400">Expo</span>
        </h1>
        <ul className="flex gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition duration-200 ${isActive ? "text-yellow-400 font-semibold" : "text-white hover:underline"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `transition duration-200 ${isActive ? "text-yellow-400 font-semibold" : "text-white hover:underline"}`
              }
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
