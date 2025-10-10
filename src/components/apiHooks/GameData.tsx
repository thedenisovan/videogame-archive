import { useEffect, useState } from 'react';

// interface to hold values extracted from api return
interface GameValue {
  title: string;
  id: number;
  bgImg: string;
  ageRating: string;
  genres: string[];
  rating: number;
  platforms: string[];
  screenshots: string[];
  releaseDate: string;
}

interface Genre {
  id: number;
  name?: string;
  slug?: string;
  image?: string;
}

// gets GameVAlue data based on user input game title
export default function useGameData({ title }: { title: string }) {
  const [data, setData] = useState<GameValue[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const url = `https://api.rawg.io/api/games?search=${title}&key=${
      import.meta.env.VITE_RAWG
    }`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        return res.json();
      })
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.results.forEach((res: any) => {
          // for each response data create new gameData obj
          const gameData: GameValue = {
            title: res.name,
            id: res.id,
            bgImg: res.background_image ?? 'No bg img',
            ageRating: res.esrb_rating?.name_en ?? 'Not rated',
            genres: res.genres.map((genre: Genre) => genre.name),
            rating: res.metacritic ?? 0,
            platforms:
              res.platforms.map(
                (p: { platform: { name: string } }) => p.platform.name
              ) ?? 'Unknown platform',
            screenshots:
              res.short_screenshots.map((shots: Genre) => shots.image) ??
              'No screenshots',
            releaseDate: res.released ?? 'No date provided',
          };
          // condition for gameData obj not to be empty
          if (gameData.bgImg !== 'No bg img') {
            setData((prev) => [...prev, gameData]);
          }
        });
      })
      .catch((error: unknown) => {
        if (error instanceof Error) setError(error.message);
        else setError('Unknown Error');
      })
      .finally(() => setLoading(false));
  }, [title]);

  return { data, error, loading };
}
