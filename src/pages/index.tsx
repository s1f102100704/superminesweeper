import styles from './index.module.css';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import React from 'react';

const Home = () => {
  type Difficulty = 'easy' | 'medium' | 'hard' | 'custom';

  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
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
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const board: number[][] = [];
  let bombcount = 10;
  let bombNumber = 10;

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
  let boardwidth: number;
  let boardheight: number;
  const newBombmap = structuredClone(bombmap);
  const usermap = structuredClone(userInputs);
  let smileState = 11;

  const clickHandler = (x: number, y: number) => {
    first(usermap, newBombmap, x, y);
    clicked(usermap, x, y);

    setUserInputs(usermap);
  };

  const easyMap = () => {
    setDifficulty('easy');
    list(9, 9);
  };
  const midMap = () => {
    setDifficulty('medium');
    list(16, 16);
  };
  const hardMap = () => {
    setDifficulty('hard');
    list(30, 16);
  };
  const customMap = () => {
    setDifficulty('custom');
    customDocument();
  };

  const customDocument = () => {
    document.addEventListener('DOMContentLoaded', () => {});
  };
  //usermapとnewBombmapの設定
  const list = (wid: number, hei: number) => {
    console.log('boardheight:', boardheight);
    const bo: (0 | 1 | 2 | 3)[][] = [];
    for (let p = 0; p < hei; p++) {
      bo.push([]);
      for (let q = 0; q < wid; q++) {
        bo[p][q] = 0;
      }
    }
    for (let p = 0; p < hei; p++) {
      for (let q = 0; q < wid; q++) {
        const element = document.getElementById(`${q}-${p}`);

        if (element) {
          element.style.backgroundColor = '';

          element.style.border = 'none';
        }
      }
    }
    setUserInputs(bo);
    setBombmap(bo);
  };
  const makeBoard = (width: number, height: number) => {
    for (let p = 0; p < height; p++) {
      board.push([]);
      for (let q = 0; q < width; q++) {
        board[p][q] = -1;
      }
    }
  };
  if (difficulty === 'easy') {
    boardwidth = 9;
    boardheight = 9;
    bombNumber = 10;
    bombcount = 10;
    makeBoard(boardwidth, boardheight);
  } else if (difficulty === 'medium') {
    console.log('medium');
    boardwidth = 16;
    boardheight = 16;
    bombNumber = 40;
    bombcount = 40;
    makeBoard(boardwidth, boardheight);
  } else if (difficulty === 'hard') {
    boardwidth = 30;
    boardheight = 16;
    bombNumber = 99;
    bombcount = 99;
    makeBoard(boardwidth, boardheight);
  }
  //右クリック
  const rightClick = (event: React.MouseEvent, x: number, y: number) => {
    event.preventDefault();
    if (usermap[y][x] === 0) {
      usermap[y][x] = 3;
    } else if (usermap[y][x] === 3) {
      usermap[y][x] = 0;
    }

    setUserInputs(usermap);
  };
  const playFailed = (usermap: number[][], newBombmap: number[][]) => {
    let fail = -1;

    for (let p = 0; p < boardheight; p++) {
      for (let q = 0; q < boardwidth; q++) {
        if (usermap[p][q] === 1 && newBombmap[p][q] === 1) {
          smileState = 13;
          fail = 10;
        }
      }
    }
    for (let p = 0; p < boardheight; p++) {
      for (let q = 0; q < boardwidth; q++) {
        if (newBombmap[p][q] === 1) {
          board[p][q] = fail;
        }
      }
    }
  };
  playFailed(usermap, newBombmap);
  //空白連鎖
  const judgeUsermap = (usermap: number[][], newBombmap: number[][]) => {
    for (let p = 0; p < boardheight; p++) {
      for (let q = 0; q < boardwidth; q++) {
        if (usermap[p][q] === 1 && board[p][q] === -1) {
          directions.forEach((direction) => {
            makeNum(usermap, newBombmap, q, p, direction.dx, direction.dy);
          });
          if (board[p][q] === -1) {
            directions.forEach((direction) => {
              nearWhite(usermap, newBombmap, q, p, direction.dx, direction.dy);
            });
          }
        }
      }
    }

    for (let p = 0; p < boardheight; p++) {
      for (let q = 0; q < boardwidth; q++) {
        if (usermap[p][q] === 1) {
          white(p, q);
          if (board[p][q] === -1) {
            let ar = 0;
            directions.forEach((direction) => {
              ar += around(usermap, q, p, direction.dx, direction.dy);
            });
            if (ar !== 8) {
              judgeUsermap(usermap, newBombmap);
            }
          }
        }
        if (usermap[p][q] === 3) {
          flag(q, p);
        }
      }
    }
  };
  //user側の処理
  const clicked = (usermap: number[][], x: number, y: number) => {
    usermap[y][x] = 1;
  };
  //周りに爆弾があるかの判定
  const makeNum = (
    usermap: number[][],
    newBombmap: number[][],
    x: number,
    y: number,
    dx: number,
    dy: number,
  ) => {
    if (y + dy >= 0 && y + dy < boardheight && newBombmap[y + dy][x + dx] === 1) {
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
    if (y + dy >= 0 && y + dy < boardheight && newBombmap[y + dy][x + dx] !== 1) {
      clicked(usermap, x + dx, y + dy);
    }
  };
  const white = (p: number, q: number) => {
    const element = document.getElementById(`${q}-${p}`);
    if (element) {
      element.style.backgroundColor = 'white';
      element.style.border = '2px solid black';
    }
  };
  //ますの周りのusermap がすべて1かどうかの判断
  const around = (usermap: number[][], x: number, y: number, dx: number, dy: number) => {
    let aro = 0;
    if (y + dy >= 0 && y + dy < boardheight && usermap[y + dy][x + dx] === 1) {
      aro = 1;
    }
    if (y + dy < 0 || y + dy >= boardheight || x + dx < 0 || x + dx >= boardwidth) {
      aro = 1;
    }
    return aro;
  };
  //旗立てる
  const flag = (x: number, y: number) => {
    board[y][x] = 9;
  };
  judgeUsermap(usermap, newBombmap);

  //爆弾を作る
  const makeBomb = (newBombmap: number[][], x: number, y: number) => {
    for (let i = 0; i <= bombNumber - 1; ) {
      const p = getRandomInt(boardheight);
      const q = getRandomInt(boardwidth);
      if (newBombmap[p][q] !== 1 && (p !== y || q !== x)) {
        newBombmap[p][q] = 1;
        i++;
      }
    }
    setBombmap(newBombmap);
  };
  const getRandomInt = (len: number) => {
    return Math.floor(Math.random() * len);
  };
  //初めてのクリック
  const first = (usermap: number[][], newBombmap: number[][], x: number, y: number) => {
    let count = 0;
    for (let p = 0; p < boardheight; p++) {
      for (let q = 0; q < boardwidth; q++) {
        if (usermap[p][q] === 1) {
          count += 1;
        }
      }
    }
    if (count === 0) {
      console.log(newBombmap);
      makeBomb(newBombmap, x, y);
      return true;
    }
  };
  const bombCount = (usermap: number[][], count: number) => {
    let co = count;
    for (let p = 0; p < boardheight; p++) {
      for (let q = 0; q < boardwidth; q++) {
        if (usermap[p][q] === 3) {
          co -= 1;
        }
      }
    }
    bombcount = co;
  };
  bombCount(usermap, bombcount);
  useEffect(() => {
    let usercount = 0; //クリック
    let bombuser = 0; //爆弾のクリック
    let nocb = 0; //爆弾をクリックしていない数
    let flagbomb = 0; //爆弾の箇所が旗
    let noclick = 0;
    for (let p = 0; p < boardheight; p++) {
      for (let q = 0; q < boardwidth; q++) {
        if (usermap[p][q] === 0) {
          noclick += 1;
        }
        if (usermap[p][q] === 1) {
          usercount += 1;
        }
        if (usermap[p][q] === 1 && newBombmap[p][q] === 1) {
          bombuser = 1;
        }
        if (usermap[p][q] === 0 && newBombmap[p][q] === 1) {
          nocb += 1;
        }
        if (usermap[p][q] === 3 && newBombmap[p][q] === 1) {
          flagbomb += 1;
        }
      }
    }

    intervalRef.current = window.setInterval(() => {
      if (usercount > 0 && bombuser !== 1 && bombNumber !== flagbomb && bombNumber === nocb) {
        setTime((prevCount) => prevCount + 1);
      }

      if (noclick === boardheight * boardwidth) {
        console.log('A');
        setTime(0);
      }
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.allDifficulcy}>
        <div className={styles.difficulcy} onClick={() => easyMap()}>
          初級
        </div>
        <div className={styles.difficulcy} onClick={() => midMap()}>
          中級
        </div>
        <div className={styles.difficulcy} onClick={() => hardMap()}>
          上級
        </div>
        <div className={styles.difficulcy} onClick={() => customMap()}>
          カスタム
        </div>
      </div>
      <div className={styles.allCustom}>
        <div className={styles.form}>
          <label htmlFor="numberInput">幅:</label>
          <input className={styles.inp} type="number" id="numberInput" />
        </div>
        <div className={styles.form}>
          <label htmlFor="numberInput">高さ:</label>
          <input className={styles.inp} type="number" id="numberInput" />
        </div>
        <div className={styles.form}>
          <label htmlFor="numberInput">爆弾数:</label>
          <input className={styles.inp} type="number" id="numberInput" />
        </div>
      </div>
      <div id="fullboard" className={`${styles.fullboard} ${styles[difficulty]}`}>
        <div id="board" className={styles.boardstyle}>
          <div className={styles.headBoard}>
            <div className={styles.bombcount}>{bombcount}</div>
            <div className={styles.smilestyle}>
              <div
                className={styles.smile}
                style={{ backgroundPosition: `${-40 * smileState}px  0px` }}
              />
            </div>
            <div className={styles.timecount}>{time}</div>
          </div>
          {board.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.cellstyle}
                key={`${x}-${y}`}
                id={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
                onContextMenu={() => rightClick(event, x, y)}
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
