// saves game to favorite tab if user is logged in and presses heart icon
function addGameToFavorites(gameId: string | number) {
  const result = localStorage.getItem();
}

// if game is favorite all ready for curr user display red heart icon else empty heart icon
function displayHeartIcon(
  gameId: string | number,
  liked: string,
  notLiked: string
): string {
  const result = localStorage.getItem('current-user');
  if (!result) return `No signed in user`;
  const parsed = JSON.parse(result);
  const parsedSet = new Set<string>([parsed.savedGames]);
  if (parsedSet.has(String(gameId))) return liked;
  else return notLiked;
}

export { displayHeartIcon, addGameToFavorites };
