const BASE_URL = "https://api.tvmaze.com";

export const getShows = async () => {
  const response = await fetch(`${BASE_URL}/shows`);

  if (!response.ok) {
    throw new Error("Failed to fetch shows");
  }

  return response.json();
};

export const searchShows = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search shows");
  }

  return response.json();
};
