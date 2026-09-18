import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getShows, searchShows } from "../api/Tvmaze";
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        if (search.trim()) {
          const result = await searchShows(search);
          setMovies(result.map((item) => item.show));
        } else {
          const result = await getShows();
          setMovies(result);
        }
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchMovies, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <section className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl">
          <label htmlFor="movie-search" className="sr-only">
            Search for a movie
          </label>
          <input
            id="movie-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full rounded-xl border border-gray-700 bg-gray-900 px-5 py-3.5 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
          />
        </div>

        {loading && (
          <p className="py-12 text-center text-gray-400">
            Loading movies...
          </p>
        )}

        {error && (
          <p className="rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-4 text-center text-red-300">
            {error}
          </p>
        )}

        {!loading && !error && movies.length === 0 && (
          <p className="py-12 text-center text-gray-400">
            No movies found.
          </p>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Movies;
