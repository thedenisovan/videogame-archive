import useComicData from './ComicApi';

export default function App() {
  const { data } = useComicData();
  console.log(data);

  return (
    <div>
      <h1>Main</h1>
    </div>
  );
}
