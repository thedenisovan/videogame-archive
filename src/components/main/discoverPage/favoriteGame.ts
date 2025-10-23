function addGameToFavorites(gameId: string | number): void {
  const result = localStorage.getItem('current-user');
  if (!result) return;
  const parsed = JSON.parse(result);
  const parsedSet = new Set<string>(parsed.savedGames);
  if (parsedSet.has(String(gameId))) parsedSet.delete(String(gameId));
  if (!parsedSet.has(String(gameId))) parsedSet.add(String(gameId));

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
  const parsedSet = new Set<string>(parsed.savedGames);
  if (parsedSet.has(String(gameId))) return liked;
  else return notLiked;
}

export { displayHeartIcon, addGameToFavorites };
