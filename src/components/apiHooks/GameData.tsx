import { useEffect, useState } from 'react';

// interface to hold values extracted from api return
export interface GameValue {
  title: string;
  id: number | string;
  bgImg: string;
  ageRating?: string;
  genres: string[];
  rating: number | string;
  platforms?: string[];
  screenshots?: string[];
  releaseDate: string;
}

interface Genre {
  id: number | string;
  name?: string;
  slug?: string;
  image?: string;
}

// gets GameVAlue data based on user input game title
export default function useGameData({
  orderBy,
  genres,
}: {
  orderBy?: string;
  genres?: string[];
}) {
  const [data, setData] = useState<GameValue[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const url = `https://api.rawg.io/api/games?${
      // if genre array is empty return all genres else specific genre games
      !genres?.length ? `` : `genres=${genres?.join()}`
    }&ordering=${orderBy}&page_size=30&metacritic=1,100&dates=1965-01-01,2030-12-31&key=${
      import.meta.env.VITE_RAWG
    }`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        return res.json();
      })
      .then((response) => {
        console.log(response);
        const games: GameValue[] = response.results
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((res: any) => ({
            // creates obj with api call extracted values
            title: res.name,
            id: res.id,
            bgImg: res.background_image ?? 'No bg img',
            ageRating: res.esrb_rating?.name_en ?? 0,
            genres: res.genres.map((genre: Genre) => genre.name),
            rating: res.metacritic ?? 0,
            platforms: res.platforms.map(
              (p: { platform: { name: string } }) => p.platform.name
            ) ?? ['unknown platform'],
            screenshots: res.short_screenshots.map(
              (shots: Genre) => shots.image
            ) ?? ['No screenshots'],
            releaseDate: res.released ?? '2030-12-31',
          }))
          .filter((game: GameValue) => game.bgImg !== 'No bg img');

        setData(games);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) setError(error.message);
        else setError('Unknown Error');
      })
      .finally(() => setLoading(false));
  }, [genres, orderBy]);

  return { data, error, loading };
}
