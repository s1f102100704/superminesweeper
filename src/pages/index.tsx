import styles from './index.module.css';
import { useState } from 'react';

const Home = () => {
  const [bombmap, setBombmap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]); //clickhandler を使って初回かどうか
  // const [userInputs,setUserInputs]=([

  // ]); //userの行動管理
  const [samplePos, setSamplePos] = useState(0);
  console.log('sample:', samplePos);
  return (
    <div className={styles.container}>
      <div className={styles.boardstyle}>
        {bombmap.map((row, y) =>
          row.map((color, x) => <div className={styles.cellstyle} key={`${x}-${y}`} />),
        )}
      </div>
      <div
        className={styles.samplestyle}
        style={{ backgroundPosition: `${-30 * samplePos}px  0px` }}
      />

      <button onClick={() => setSamplePos((p) => (p + 1) % 14)}>sample</button>
    </div>
  );
};

export default Home;
