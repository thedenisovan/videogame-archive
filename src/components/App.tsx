import useGame from './UseGameHook';

export default function App() {
  const { data } = useGame();

  console.log(data);

  return (
    <div>
      <h1>Main</h1>
    </div>
  );
}
