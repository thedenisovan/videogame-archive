import type { Games } from '../../App';

// adds/removes game to favorites when user clicks favorite button
function addGameToFavorites(
  updateSavedGames: (games: Map<number | string, Games>) => void,
  screenshots: string[],
  gameId: string | number,
  title: string,
  releaseDate: string,
  rating: number | string,
  genres: string[]
): void {
  const result = localStorage.getItem('current-user');
  if (!result) return;
  const parsed = JSON.parse(result);
  const parsedSet = new Map<number | string, Games>(parsed.savedGames);
  if (parsedSet.has(gameId)) parsedSet.delete(gameId);
  // cache game's data to local storage inside new Set
  else if (!parsedSet.has(gameId))
    parsedSet.set(gameId, {
      screenshots,
      title,
      releaseDate,
      rating,
      genres,
    });

  // updates state of saved games after click event
  updateSavedGames(parsedSet);
  // add updated savedGames back to localStorage
  localStorage.setItem(
    parsed.id,
    JSON.stringify({ ...parsed, savedGames: Array.from(parsedSet) })
  );
  localStorage.setItem(
    'current-user',
    JSON.stringify({ ...parsed, savedGames: Array.from(parsedSet) })
  );
}

// if game is favorite all ready for curr user display red heart icon else empty heart icon
function displayHeartIcon(
  gameId: string | number,
  liked: string,
  notLiked: string
): string {
  const result = localStorage.getItem('current-user');
  if (!result) return ``;
  const parsed = JSON.parse(result);
  const parsedSet = new Map(parsed.savedGames);
  if (parsedSet.has(String(gameId))) return liked;
  else return notLiked;
}

export { displayHeartIcon, addGameToFavorites };
