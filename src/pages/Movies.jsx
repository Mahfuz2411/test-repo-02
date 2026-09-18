import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getShows, searchShows } from "../api/Tvmaze";
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
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

  useEffect(() => {
    if (!selectedMovie) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedMovie(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMovie]);

  const releaseDate = selectedMovie?.premiered
    ? new Date(selectedMovie.premiered).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const summary = selectedMovie?.summary?.replace(/<[^>]*>/g, "") ||
    "No summary is available for this show.";

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
              <MovieCard
                key={movie.id}
                movie={movie}
                onDetails={setSelectedMovie}
              />
            ))}
          </div>
        )}
      </div>

      {selectedMovie && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedMovie(null);
          }}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="movie-modal-title"
          >
            <div className="relative">
              <img
                src={selectedMovie.image?.original || selectedMovie.image?.medium || "https://via.placeholder.com/800x450?text=No+Image"}
                alt={selectedMovie.name}
                className="h-56 w-full object-cover sm:h-72"
              />
              <button
                type="button"
                onClick={() => setSelectedMovie(null)}
                aria-label="Close movie details"
                className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/70 text-2xl text-white transition hover:bg-yellow-400 hover:text-gray-950 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <h2 id="movie-modal-title" className="text-2xl font-bold text-white sm:text-3xl">
                {selectedMovie.name}
              </h2>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-300">
                <span className="text-yellow-400">
                  <span aria-hidden="true">★</span> Rating: {selectedMovie.rating?.average || "N/A"}
                </span>
                <span>Release: {releaseDate}</span>
                {selectedMovie.runtime && <span>Runtime: {selectedMovie.runtime} min</span>}
              </div>

              {selectedMovie.genres?.length > 0 && (
                <p className="mt-4 text-sm text-gray-400">
                  Genre: {selectedMovie.genres.join(", ")}
                </p>
              )}

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-yellow-400">
                Overview
              </h3>
              <p className="mt-2 leading-7 text-gray-300">{summary}</p>

              {(selectedMovie.network?.name || selectedMovie.status) && (
                <p className="mt-4 text-sm text-gray-400">
                  {selectedMovie.network?.name && `Network: ${selectedMovie.network.name}`}
                  {selectedMovie.network?.name && selectedMovie.status && "  |  "}
                  {selectedMovie.status && `Status: ${selectedMovie.status}`}
                </p>
              )}

              <button
                type="button"
                onClick={() => setSelectedMovie(null)}
                className="mt-7 w-full cursor-pointer rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-gray-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Movies;
