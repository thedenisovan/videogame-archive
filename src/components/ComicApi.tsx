import { useEffect, useState } from 'react';
import md5 from 'md5';

interface ComicData {
  hero: string;
  imgUrl: string;
}

export default function useComicData() {
  const [data, setData] = useState<ComicData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | null>(null);

  const publicKey = import.meta.env.VITE_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);

  const url = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=The+Amazing+Spider-Man&orderBy=focDate&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  useEffect(() => {
    fetch(url, { mode: 'cors' }) // allows to leave current dev server to fetch data
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: Status ${res.status}`);
        }
        return res.json();
      })
      .then((res) => setData(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
