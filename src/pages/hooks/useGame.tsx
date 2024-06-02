import { useState } from 'react';
import { useEffect } from 'react';

import { useCustom } from './useCustom';
export const useGame = ({
  easyMap,
  midMap,
  hardMap,
  customMap,
  bombbomb,
  board,
  boardwidth,
  boardheight,
  bombNumber,
  bombcount,
  mineSweeperConfig,
}) => {
  const [move, setMove] = useState(false);
  const initCount = 0; //タイマーの初期値
  const [time, setTime] = useState(initCount);
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
  let smileState = 11;
  const clickHandler = (x: number, y: number) => {
    const f = first(usermap, newBombmap, x, y);
    if (smileState === 11) {
      clicked(usermap, x, y);
    }
    if (f) {
      judgeUsermap(usermap, newBombmap);
    }
    const clear = playClear(usermap, newBombmap);
    const failed = playFailed(usermap, newBombmap);
    if (clear || failed) {
      setMove(false);
    }
    setUserInputs(usermap);
  };

  //usermapとnewBombmapの設定

  //右クリック
  const rightClick = (x: number, y: number) => {
    if (smileState !== 13) {
      if (usermap[y][x] === 0) {
        usermap[y][x] = 3;
      } else if (usermap[y][x] === 3) {
        usermap[y][x] = 0;
      }
    }
    setUserInputs(usermap);
  };

  const playFailed = (usermap: number[][], newBombmap: number[][]) => {
    let fail = -1;
    console.log(boardheight, boardwidth);
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
          const element = document.getElementById(`${q}-${p}`);
          board[p][q] = fail;
          if (element) {
            if (element.style.backgroundColor !== 'red' && smileState === 13) {
              element.style.backgroundColor = '#c6c6c6';
              element.style.border = '1px solid #808080';
            }
          }
        }
      }
    }
    if (smileState === 13) {
      return true;
    } else {
      return false;
    }
  };
  playFailed(usermap, newBombmap);
  const playClear = (usermap: number[][], newBombmap: number[][]) => {
    let count = 0;
    for (let p = 0; p < boardheight; p++) {
      for (let q = 0; q < boardwidth; q++) {
        if (usermap[p][q] === 0 || usermap[p][q] === 3) {
          count += 1;
        }
      }
    }
    if (bombNumber === count) {
      smileState = 12;
    }
    if (smileState === 12) {
      for (let p = 0; p < boardheight; p++) {
        for (let q = 0; q < boardwidth; q++) {
          if (usermap[p][q] === 0 && newBombmap[p][q] === 1) {
            usermap[p][q] = 3;
          }
        }
      }
      return true;
    } else {
      return false;
    }
  };
  playClear(usermap, newBombmap);
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
          white(usermap, newBombmap, p, q);
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
  const white = (usermap: number[][], newBombmap: number[][], p: number, q: number) => {
    const element = document.getElementById(`${q}-${p}`);
    if (usermap[p][q] === 1 && newBombmap[p][q] !== 1) {
      if (element) {
        element.style.border = '1px solid #808080';
      }
    } else if (usermap[p][q] === 1 && newBombmap[p][q] === 1) {
      if (element) {
        element.style.backgroundColor = 'red';
        element.style.border = '1px solid #808080';
      }
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
  const timeMove = () => {
    setMove(true);
  };
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
      makeBomb(newBombmap, x, y);
      timeMove();
      return true;
    }
  };
  const boardReset = () => {
    setTime(0);
    setMove(false);
    if (mineSweeperConfig.level === 'easy') {
      easyMap();
    }
    if (mineSweeperConfig.level === 'medium') {
      midMap();
    }
    if (mineSweeperConfig.level === 'hard') {
      hardMap();
    }
    if (mineSweeperConfig.level === 'custom') {
      customMap();
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
    bombbomb(co);
  };
  bombCount(usermap, bombcount);
  const countIncrement = () => {
    setTime((preCount) => preCount + 1);
  };
  useEffect(() => {
    if (move) {
      const timer = setInterval(countIncrement, 1000);
      // クリーンアップ関数
      return () => {
        clearInterval(timer);
      };
    }
  }, [move]);
  return {
    setMove,
    setTime,
    initCount,
    setUserInputs,
    setBombmap,
    clickHandler,
    rightClick,
    boardReset,
    board,
    smileState,
    time,
  };
};
