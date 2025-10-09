import { useEffect, useState } from 'react';

interface GameValue {
  id: number;
  bgImg: string;
  ageRating: string;
  genres: Genre[];
  rating: number;
}

interface Genre {
  id: number;
  name: string;
  slug: string;
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
        response.results.forEach((res: any) => {
          const gameData = {
            id: res.id,
            bgImg: res.background_image ?? '',
            ageRating: res.esrb_rating?.name_en ?? 'Not rated',
            genres: extractData(res.genres) ?? 'No genre',
            rating: res.metacritic ?? 'No rating',
          };
          // condition for gameData obj not to be empty
          if (gameData.bgImg !== '') {
            setData((prev) => [...prev, gameData]);
          }
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { data, error, loading };
}

// extracts each value of array of objects
function extractData(arr: Genre[]) {
  return arr.filter((el: Genre) => el.id);
}
