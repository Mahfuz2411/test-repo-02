import { NavLink } from "react-router";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-gray-900 min-h-screen">
      <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
        alt="Movie theater"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-5">
          Welcome to Movie<span className="text-yellow-400">Expo</span>
        </h1>

        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
           Explore and discover your favorite movies from around the world. 
        </p>

        <NavLink
          to="/movies"
          className="inline-block bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-300 transition duration-200"
        >
          Explore Movies
        </NavLink>
      </div>
    </section>
  );
};

export default Hero;
