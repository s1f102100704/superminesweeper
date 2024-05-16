import { withRouter } from 'next/router';
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
  ]);
  //clickhandler を使って初回かどうか
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
  const newBombmap = structuredClone(bombmap);
  const usermap = structuredClone(userInputs);
  const clickHandler = (x: number, y: number) => {
    first(usermap, newBombmap, x, y);
    clicked(usermap, x, y);
    console.log('爆弾', newBombmap);
    console.log('usermap', usermap);
    setUserInputs(usermap);
  };
  const judgeUsermap = (usermap: number[][], newBombmap: number[][]) => {
    for (let p = 0; p <= 8; p++) {
      for (let q = 0; q <= 8; q++) {
        if (usermap[p][q] === 1 && board[p][q] === -1) {
          directions.forEach((direction) => {
            makeNum(usermap, newBombmap, q, p, direction.dx, direction.dy);
          });
          if (board[p][q] === -1) {
            directions.forEach((direction) => {
              nearWhite(usermap, newBombmap, q, p, direction.dx, direction.dy);
            });

            console.log('use', usermap);
          }
        }
      }
    }

    for (let p = 0; p <= 8; p++) {
      for (let q = 0; q <= 8; q++) {
        if (usermap[p][q] === 1) {
          white(p, q);
          if (board[p][q] === -1) {
            let ar = 0;
            directions.forEach((direction) => {
              ar += around(usermap, q, p, direction.dx, direction.dy);
              console.log('ar', ar);
            });
            if (ar !== 8) {
              judgeUsermap(usermap, newBombmap);
            }
          }
        }
      }
    }
    console.log('board', board);
  };
  //user側の処理
  const clicked = (usermap: number[][], x: number, y: number) => {
    usermap[y][x] = 1;
  };
  const makeNum = (
    usermap: number[][],
    newBombmap: number[][],
    x: number,
    y: number,
    dx: number,
    dy: number,
  ) => {
    if (y + dy >= 0 && y + dy <= 8 && newBombmap[y + dy][x + dx] === 1) {
      board[y][x] += 1;
    }
  };
  const nearWhite = (
    usermap: number[][],
    newBombmap: number[][],
    x: number,
    y: number,
    dx: number,
    dy: number,
  ) => {
    if (y + dy >= 0 && y + dy <= 8 && newBombmap[y + dy][x + dx] !== 1) {
      clicked(usermap, x + dx, y + dy);
    }
  };
  const white = (p: number, q: number) => {
    const element = document.getElementById(`${q}-${p}`);
    if (element) {
      element.style.backgroundColor = 'white';
    }
  };
  //ますの周りのusermap がすべて1かどうかの判断
  const around = (usermap: number[][], x: number, y: number, dx: number, dy: number) => {
    let aro = 0;
    if (y + dy >= 0 && y + dy <= 8 && usermap[y + dy][x + dx] === 1) {
      aro = 1;
    }
    if (y + dy < 0 || y + dy > 8 || x + dx < 0 || x + dx > 8) {
      aro = 1;
    }
    return aro;
  };
  judgeUsermap(usermap, newBombmap);

  //爆弾を作る
  const makeBomb = (newBombmap: number[][], x: number, y: number) => {
    for (let i = 0; i <= 9; ) {
      const p = getRandomInt();
      const q = getRandomInt();
      if (newBombmap[p][q] !== 1 && (p !== y || q !== x)) {
        newBombmap[p][q] = 1;
        i++;
      }
    }
    setBombmap(newBombmap);
  };
  const getRandomInt = () => {
    return Math.floor(Math.random() * 9);
  };
  //初めてのクリック
  const first = (usermap: number[][], newBombmap: number[][], x: number, y: number) => {
    let count = 0;
    for (let p = 0; p <= 8; p++) {
      for (let q = 0; q <= 8; q++) {
        if (usermap[p][q] === 1) {
          count += 1;
        }
      }
    }
    if (count === 0) {
      makeBomb(newBombmap, x, y);
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
