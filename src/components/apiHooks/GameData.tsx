import { useEffect, useState } from 'react';

// Action → action
// Indie → indie
// Adventure → adventure
// RPG → role-playing-games-rpg
// Strategy → strategy
// Shooter → shooter
// Casual → casual
// Simulation → simulation
// Puzzle → puzzle
// Arcade → arcade
// Platformer → platformer
// Massively Multiplayer → massively-multiplayer
// Racing → racing
// Sports → sports
// Fighting → fighting
// Family → family
// Board Games → board-games
// Card → card
// Education → educational

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
  genre,
  orderBy,
}: {
  genre?: string;
  orderBy?: string;
}) {
  const [data, setData] = useState<GameValue[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const url = `https://api.rawg.io/api/games?genres=${genre}&ordering=${orderBy}&page_size=20&metacritic=1,100&key=${
      import.meta.env.VITE_RAWG
    }`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        return res.json();
      })
      .then((response) => {
        const games: GameValue[] = response.results
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((res: any) => ({
            title: res.name,
            id: res.id,
            bgImg: res.background_image ?? 'No bg img',
            ageRating: res.esrb_rating?.name_en ?? 'Not rated',
            genres: res.genres.map((genre: Genre) => genre.name),
            rating: res.metacritic ?? 0,
            platforms: res.platforms.map(
              (p: { platform: { name: string } }) => p.platform.name
            ) ?? ['unknown platform'],
            screenshots: res.short_screenshots.map(
              (shots: Genre) => shots.image
            ) ?? ['No screenshots'],
            releaseDate: res.released ?? 'No date provided',
          }))
          .filter((game: GameValue) => game.bgImg !== 'No bg img');

        setData(games);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) setError(error.message);
        else setError('Unknown Error');
      })
      .finally(() => setLoading(false));
  }, [genre, orderBy]);

  return { data, error, loading };
}
