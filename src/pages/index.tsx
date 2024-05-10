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
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];

  const clickHandler = (x: number, y: number) => {
    const newBombmap = structuredClone(bombmap);
    const usermap = structuredClone(userInputs);

    firstMake(newBombmap, x, y);
    makeuserinputs(usermap, x, y);
    setUserInputs(usermap);
    setBombmap(newBombmap);

    console.log('bombmap:', newBombmap);
    console.log('usermap:', usermap);
  };
  //爆弾の周りの数字
  const allDirections = (usermap: number[][], newBombmap: number[][]) => {
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
      makeNum(usermap, newBombmap, direction.dx, direction.dy);
    });
  };

  const makeNum = (usermap: number[][], newBombmap: number[][], dx: number, dy: number) => {
    for (let p = 0; p <= 8; p++) {
      for (let q = 0; q <= 8; q++) {
        if (usermap[p][q] === 1) {
          if (newBombmap[p + dy][q + dx]) {
            board[p][q] += 1;
          }
        }
      }
    }
  };
  allDirections(userInputs, bombmap);
  //ユーザーの動作
  const makeuserinputs = (usermap: number[][], x: number, y: number) => {
    usermap[y][x] = 1;
  };
  //整数のランダム生成
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  //爆弾の配置
  const firstMake = (newBombmap: number[][], x: number, y: number) => {
    let total = 0;
    for (let p = 0; p <= 8; p++) {
      for (let q = 0; q <= 8; q++) {
        if (newBombmap[p][q] === 1) {
          total++;
        }
      }
    }
    if (total === 0) {
      makeBomb(newBombmap, x, y);
    }
  };
  const makeBomb = (newBombmap: number[][], x: number, y: number) => {
    let a, b;
    for (let i = 0; i <= 10; ) {
      a = getRandomInt(0, 8);
      b = getRandomInt(0, 8);
      if (a !== y || b !== x) {
        if (newBombmap[a][b] !== 1) {
          newBombmap[a][b] = 1;
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
                <div
                  className={styles.bombstyle}
                  style={{ backgroundPosition: `${-30 * color}px  0px` }}
                />
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
