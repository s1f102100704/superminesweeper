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
  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(bombmap);
    makeBomb(newBoard);
  };
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const makeBomb = (newBoard: number[][]) => {
    let a, b;
    for (let i = 0; i <= 10; ) {
      a = getRandomInt(0, 8);
      b = getRandomInt(0, 8);
      if (newBoard[a][b] !== 1) {
        newBoard[a][b] = 1;
        i++;
      }
    }
  };
  console.log('sample:', samplePos);
  return (
    <div className={styles.container}>
      <div className={styles.fullboard}>
        <div className={styles.boardstyle}>
          <div className={styles.headBoard} />
          {bombmap.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.cellstyle}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
              />
            )),
          )}
        </div>
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
