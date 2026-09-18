import { Link } from "react-router";

const MovieCard = ({ movie }) => {
  const image =
    movie.image?.medium ||
    "https://via.placeholder.com/210x295?text=No+Image";

  const year = movie.premiered
    ? new Date(movie.premiered).getFullYear()
    : "N/A";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-700/70 bg-gray-800 shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-1 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-black/25">
      <img
        src={image}
        alt={movie.name}
        className="aspect-2/3 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
      />

      <div className="flex flex-1 flex-col p-4">
        <h2 className="min-h-7 truncate text-lg font-semibold text-white">
          {movie.name}
        </h2>

        <div className="mt-3 flex items-center justify-between gap-3 text-sm">
          <span className="text-yellow-400" aria-label={`Rating ${movie.rating?.average || "not available"}`}>
            <span aria-hidden="true">★</span> {movie.rating?.average || "N/A"}
          </span>

          <span className="text-right text-gray-400">
            {year}
          </span>
        </div>

        <button
          className="mt-auto block rounded-lg bg-yellow-400 py-2.5 text-center font-semibold text-gray-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-0 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer"
        >
          See Details
        </button>
      </div>
    </article>
  );
};

export default MovieCard;
