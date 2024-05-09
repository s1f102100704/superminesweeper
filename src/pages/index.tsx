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
  // 0 未クリック
  // 1 左クリック
  // 2 はてな
  // 3 旗
  const [userInputs, setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [samplePos, setSamplePos] = useState(0);

  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(bombmap);
    const usermap = structuredClone(userInputs);
    if (samplePos === 0) {
      makeBomb(newBoard, x, y);
    }
    makeuserinputs(usermap, x, y);
    allDirections(newBoard);
    setUserInputs(usermap);
    setBombmap(newBoard);
    setSamplePos(10);
  };
  //爆弾の周りの数字
  const allDirections = (newBoard: number[][]) => {
    const directions = [
      { dy: -1, dx: 0 }, // 上
      { dy: 1, dx: 0 }, // 下
      { dy: 0, dx: -1 }, // 左
      { dy: 0, dx: 1 }, // 右
      { dy: -1, dx: 1 }, // 右斜め上
      { dy: 1, dx: 1 }, // 右斜め下
      { dy: -1, dx: -1 }, // 左斜め上
      { dy: 1, dx: -1 }, // 左斜め下
    ];
    directions.forEach((direction) => {
      makeNum(newBoard, direction.dx, direction.dy);
    });
  };

  const makeNum = (newBoard: number[][], dx: number, dy: number) => {
    for (let y = 0; y <= 8; y++) {
      for (let x = 0; x <= 8; x++) {
        if (newBoard[y + dy][x + dx] === 1) {
        }
      }
    }
  };

  //ユーザーの動作
  const makeuserinputs = (usermap: number[][], x: number, y: number) => {
    usermap[y][x] = 1;
  };
  //整数のランダム生成
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  //爆弾の配置
  const makeBomb = (newBoard: number[][], x: number, y: number) => {
    let a, b;
    for (let i = 0; i <= 10; ) {
      a = getRandomInt(0, 8);
      b = getRandomInt(0, 8);
      if (a !== y || b !== x) {
        if (newBoard[a][b] !== 1) {
          newBoard[a][b] = 1;
          i++;
        }
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.fullboard}>
        <div className={styles.boardstyle}>
          <div className={styles.headBoard} />
          {board.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.cellstyle}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
              >
                {color === 1 && (
                  <div
                    className={styles.bombstyle}
                    style={{ backgroundPosition: `${-30 * samplePos}px  0px` }}
                  />
                )}
              </div>
            )),
          )}
        </div>
      </div>
      <div style={{ backgroundPosition: `${-30 * samplePos}px  0px` }} />

      <button onClick={() => setSamplePos((p) => (p + 1) % 14)}>sample</button>
    </div>
  );
};

export default Home;
