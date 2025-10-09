import { useEffect, useState } from 'react';

interface GameValue {
  title: string;
  id: number;
  bgImg: string;
  ageRating: string;
  genres: string[];
  rating: number;
  platforms: string[];
  screenshots: string[];
  releaseData: string;
}

interface Genre {
  id: number;
  name?: string;
  slug?: string;
  image?: string;
}

export default function useGameData({ title }: { title: string }) {
  const [data, setData] = useState<GameValue[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const url = `https://api.rawg.io/api/games?search=${title}&key=${
      import.meta.env.VITE_RAWG
    }`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        return res.json();
      })
      .then((response) => {
        // console.log(response);
        response.results.forEach((res: any) => {
          const gameData = {
            title: res.name,
            id: res.id,
            bgImg: res.background_image ?? '',
            ageRating: res.esrb_rating?.name_en ?? 'Not rated',
            genres: extractData(res.genres) ?? 'No genre',
            rating: res.metacritic ?? 'No rating',
            platforms:
              res.platforms.map(
                (p: { platform: { name: string } }) => p.platform.name
              ) ?? 'Unknown platform',
            screenShots: extractData(res.short_screenshots, true),
            releaseData: res.released,
          };
          // condition for gameData obj not to be empty
          if (gameData.bgImg !== '') {
            setData((prev) => [...prev, gameData]);
          }
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [title]);

  return { data, error, loading };
}

// extracts each value individually from array of objects
function extractData(arr: Genre[], isScreenshot: boolean = false) {
  return arr.map((g: Genre) => (!isScreenshot ? g.name : g.image)); // if isScreenshot extract img urls else genre type
}
