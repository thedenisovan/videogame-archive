import { useEffect, useState } from 'react';

export default function useGame() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const url = `https://api.rawg.io/api/games?search=skyrim+special+edition&key=${
      import.meta.env.VITE_RAWG
    }`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        return res.json();
      })
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { data, error, loading };
}
