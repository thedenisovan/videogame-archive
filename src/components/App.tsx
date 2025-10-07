import useComicData from './ComicApi';

export default function App() {
  const { data } = useComicData();

  return (
    <div>
      <h1>Main</h1>
    </div>
  );
}
