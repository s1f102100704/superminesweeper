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
  const newBombmap = structuredClone(bombmap);
  const usermap = structuredClone(userInputs);
  const clickHandler = (x: number, y: number) => {
    const element = document.getElementById(`${x}-${y}`);
    if (element) {
      element.style.backgroundColor = 'white';
    }
    firstMake(newBombmap, x, y);
    makeuserinputs(usermap, x, y);
    setUserInputs(usermap);
    setBombmap(newBombmap);
  };

  //爆弾の周りの数字
  const playFailed = (newBombmap: number[][], p: number, q: number) => {
    if (newBombmap[p][q] === 1) {
      for (let j = 0; j <= 8; j++) {
        for (let k = 0; k <= 8; k++) {
          if (newBombmap[j][k] === 1) {
            board[j][k] = 10;
            console.log('playfailed');
          }
        }
      }
    }
  };
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

    for (let p = 0; p <= 8; p++) {
      for (let q = 0; q <= 8; q++) {
        if (usermap[p][q] === 1) {
          directions.forEach((direction) => {
            console.log('board', board);
            console.log('usermap', usermap);
            makeNum(usermap, newBombmap, p, q, direction.dx, direction.dy);
            // chain(usermap, newBombmap, direction.dx, direction.dy);
          });
        }
      }
    }
  };
  //爆弾を踏んだ時

  const makeNum = (
    usermap: number[][],
    newBombmap: number[][],
    p: number,
    q: number,
    dx: number,
    dy: number,
  ) => {
    if (p + dy !== -1 && p + dy !== 9 && newBombmap[p + dy][q + dx] === 1) {
      board[p][q] += 1;
    }
    // else if (
    //   p + dy !== -1 &&
    //   p + dy !== 9 &&
    //   newBombmap[p + dy][q + dx] === 0 &&
    //   usermap[p + dy][q + dx] !== 1
    // ) {
    //   usermap[p + dy][q + dx] = 1;
    //   makeNum(usermap, newBombmap, dx, dy); //再起関数
    // }
    playFailed(newBombmap, p, q);
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
    console.log('爆弾:', newBombmap);
  };
  const makeBomb = (newBombmap: number[][], x: number, y: number) => {
    let a, b;
    for (let i = 0; i <= 9; ) {
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

  const first = (usermap: number[][], newBombmap: number[][]) => {
    let total = 0;
    let to = 0;
    for (let p = 0; p <= 8; p++) {
      for (let q = 0; q <= 8; q++) {
        if (usermap[p][q] === 1) {
          total = 1;
        }
        if (newBombmap[p][q] === 1) {
          to = 1;
        }
      }
    }
    if (total > 0 && to > 0) {
      allDirections(usermap, newBombmap);
    }
  };
  first(usermap, newBombmap);
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
                id={`${x}-${y}`}
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
