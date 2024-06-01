import { useState } from 'react';
import { useGame } from './useGame';
import { useHead } from './useHead';
import styles from './index.module.css';

export const useCustom = () => {
  const { move, setMove, board, clickHandler, rightClick, time, configs } = useGame();
  const { smileState, time, boardReset } = useHead();
  const [mineSweeperConfig, setMinsweeperConfig] = useState({
    level: 'easy',
    width: 9,
    height: 9,
    bombs: 10,
  });

  let bombcount = 10;
  let bombNumber = 10;
  let boardwidth: number;
  let boardheight: number;

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
  const playLevel = () => {
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
  };
  playLevel();
  return { mineSweeperConfig, easyMap, midMap, hardMap, customMap };
};
