import { useEffect, useState } from 'react';
import md5 from 'md5';

export default function App() {
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_KEY;
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);

    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=Spider-Man&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setImg(data.data.results[0].thumbnail.path);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Main</h1>
      <img src={`${img}.jpg`} />
    </div>
  );
}
