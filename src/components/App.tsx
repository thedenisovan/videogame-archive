import useGameData from './GameData';

export default function App() {
  const { data } = useGameData({ title: 'skyrim' });

  console.log(data);

  return (
    <div>
      <h1>Main</h1>
    </div>
  );
}
