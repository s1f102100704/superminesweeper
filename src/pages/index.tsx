import styles from './index.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';

const Home = () => {
  const [mineSweeperConfig, setMinsweeperConfig] = useState({
    level: 'easy',
    width: 9,
    height: 9,
    bombs: 10,
  });

  type whbData = {
    width: number;
    height: number;
    bombcount: number;
  };
  const [data, setData] = useState<whbData>({ width: 30, height: 16, bombcount: 15 });
  const [cloneData, setClone] = useState<whbData>({ width: 30, height: 16, bombcount: 15 });
  const cc = { ...cloneData };

  const onChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('width');
    cc.width = parseInt(e.target.value);
    setClone({ width: cc.width, height: cc.height, bombcount: cc.bombcount });
  };
  const onChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('height');
    cc.height = parseInt(e.target.value);
    setClone({ width: cc.width, height: cc.height, bombcount: cc.bombcount });
  };
  const onChangeBomb = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('bomb');
    cc.bombcount = parseInt(e.target.value);
    setClone({ width: cc.width, height: cc.height, bombcount: cc.bombcount });
  };
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
  const board: number[][] = [];

  const configs = {
    easy: { width: 9, height: 9, bombcount: 10 },
    medium: { width: 16, height: 16, bombcount: 40 },
    hard: { width: 30, height: 16, bombcount: 99 },
  };
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

  const easyMap = () => {
    setMinsweeperConfig({
      level: 'easy',
      width: configs.easy.width,
      height: configs.easy.height,
      bombs: configs.easy.bombcount,
    });
    setMove(false);
    setTime(initCount);
    const element: HTMLElement | null = document.getElementById('fullboard');
    if (element) {
      element.style.width = '';
      element.style.height = '';
    }
    const ele: HTMLElement | null = document.getElementById('allcustom');

    if (ele) {
      if (ele.className === styles.allcus) {
        ele.classList.remove(styles.allcus);
        ele.classList.add(styles.allCustom);
      }
    }
    list(9, 9);
  };
  const midMap = () => {
    setMinsweeperConfig({
      level: 'medium',
      width: configs.medium.width,
      height: configs.medium.height,
      bombs: configs.medium.bombcount,
    });
    setMove(false);
    setTime(initCount);
    const element: HTMLElement | null = document.getElementById('fullboard');
    if (element) {
      element.style.width = '';
      element.style.height = '';
    }
    const ele: HTMLElement | null = document.getElementById('allcustom');

    if (ele) {
      if (ele.className === styles.allcus) {
        ele.classList.remove(styles.allcus);
        ele.classList.add(styles.allCustom);
      }
    }
    list(16, 16);
  };
  const hardMap = () => {
    setMinsweeperConfig({
      level: 'hard',
      width: configs.hard.width,
      height: configs.hard.height,
      bombs: configs.hard.bombcount,
    });
    setMove(false);
    setTime(initCount);
    const element: HTMLElement | null = document.getElementById('fullboard');
    if (element) {
      element.style.width = '';
      element.style.height = '';
    }
    const ele: HTMLElement | null = document.getElementById('allcustom');

    if (ele) {
      if (ele.className === styles.allcus) {
        ele.classList.remove(styles.allcus);
        ele.classList.add(styles.allCustom);
      }
    }
    list(30, 16);
  };

  const customMap = () => {
    setMinsweeperConfig({
      level: 'custom',
      width: data.width,
      height: data.width,
      bombs: data.bombcount,
    });
    setMove(false);
    setTime(initCount);
    setMinsweeperConfig({
      level: 'custom',
      width: cloneData.width,
      height: cloneData.height,
      bombs: cloneData.bombcount,
    });
    setData({ width: data.width, height: data.height, bombcount: data.bombcount });
    list(data.width, data.height);
    customDocument();
  };
  const buttonClick = (): void => {
    console.log('buttonclick');
    setMinsweeperConfig({
      level: 'custom',
      width: cloneData.width,
      height: cloneData.height,
      bombs: cloneData.bombcount,
    });
    setTime(initCount);
    setMove(false);
    setData({ width: cloneData.width, height: cloneData.height, bombcount: cloneData.bombcount });

    const element: HTMLElement | null = document.getElementById('fullboard');
    if (element) {
      element.style.width = `${cloneData.width * 32 + 42}px`;
      element.style.height = `${cloneData.height * 32 + 118}px`;
    }

    list(cloneData.width, cloneData.height);
  };
  const customDocument = () => {
    const element: HTMLElement | null = document.getElementById('allcustom');

    if (element) {
      element.classList.remove(styles.allCustom);
      element.classList.add(styles.allcus);
    }
  };
  //usermapとnewBombmapの設定
  const list = (wid: number, hei: number) => {
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
          element.style.backgroundColor = '#c6c6c6';
          element.style.border = '';
          element.style.border = 'solid 3px;';
          element.style.borderColor = ' #fff #808080 #808080#FFF';
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
  if (mineSweeperConfig.level === 'easy') {
    boardwidth = configs.easy.width;
    boardheight = configs.easy.height;
    bombcount = configs.easy.bombcount;
    bombNumber = configs.easy.bombcount;
    makeBoard(configs.easy.width, configs.easy.height);
  } else if (mineSweeperConfig.level === 'medium') {
    boardwidth = configs.medium.width;
    boardheight = configs.medium.height;
    bombcount = configs.medium.bombcount;
    bombNumber = configs.medium.bombcount;
    makeBoard(configs.medium.width, configs.medium.height);
  } else if (mineSweeperConfig.level === 'hard') {
    boardwidth = configs.hard.width;
    boardheight = configs.hard.height;
    bombcount = configs.hard.bombcount;
    bombNumber = configs.hard.bombcount;
    makeBoard(configs.hard.width, configs.hard.height);
  } else if (mineSweeperConfig.level === 'custom') {
    boardwidth = data.width;
    boardheight = data.height;
    bombNumber = data.bombcount;
    bombcount = data.bombcount;

    makeBoard(boardwidth, boardheight);
  }
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
      list(data.width, data.height);
    }
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
      <div id="allcustom" className={styles.allCustom}>
        <div className={styles.form}>
          <label htmlFor="width">幅:</label>
          <input
            className={styles.inp}
            type="number"
            id="width"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeWidth(e)}
          />
        </div>
        <div className={styles.form}>
          <label htmlFor="height">高さ:</label>
          <input
            className={styles.inp}
            id="height"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHeight(e)}
          />
        </div>
        <div className={styles.form}>
          <label htmlFor="bomb">爆弾数:</label>
          <input
            className={styles.inp}
            id="bomb"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeBomb(e)}
          />
        </div>
        <input
          className={styles.button}
          type="button"
          value="更新"
          onClick={(): void => buttonClick()}
        />
      </div>
      <div
        id={styles.fullboard}
        style={{
          height: `${33 * mineSweeperConfig.height + 124}px`,
          width: `${33 * mineSweeperConfig.width + 42}px`,
        }}
      >
        <div className={styles.leftborder} />

        <div id="board" className={styles.boardstyle}>
          <div className={styles.topborder} />
          <div className={styles.headBoard}>
            <div className={styles.bombcount}>{bombcount}</div>
            <div className={styles.smilestyle} onClick={() => boardReset()}>
              <div
                className={styles.smile}
                style={{ backgroundPosition: `${-40 * smileState}px  0px` }}
              />
            </div>
            <div className={styles.timecount}>{time}</div>
          </div>
          <div className={styles.midborder} />
          <div
            id={styles.cellboard}
            style={{
              height: `${33 * mineSweeperConfig.height + 6}px`,
              width: `${33 * mineSweeperConfig.width + 6}px`,
            }}
          >
            {board.map((row, y) =>
              row.map((color, x) => (
                <div
                  className={styles.cellstyle}
                  key={`${x}-${y}`}
                  id={`${x}-${y}`}
                  onClick={() => clickHandler(x, y)}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    rightClick(x, y);
                  }}
                >
                  <div
                    className={styles.bombstyle}
                    style={{ backgroundPosition: `${-30 * color}px  0px` }}
                  />
                </div>
              )),
            )}
          </div>
          <div className={styles.bottomborder} />
        </div>
        <div className={styles.rightborder} />
      </div>
    </div>
  );
};

export default Home;
