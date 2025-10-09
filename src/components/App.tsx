import useGameData from './GameData';

export default function App() {
  const { data } = useGameData({ title: 'elder scrolls morrowind' });

  console.log(data);

  return (
    <div>
      <h1>Main</h1>
    </div>
  );
}
