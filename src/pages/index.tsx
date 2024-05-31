import styles from './index.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';
import { useGame } from './hooks/useGame';
import { useCustom } from './hooks/useCustom';
import Board from './component/Board';
import TopArea from './component/TopArea';
import CustomArea from './component/CustomArea';
//a
const Home = () => {
  const { board, clickHandler, rightClick, time } = useGame();
  const { mineSweeperConfig } = useCustom();
  return (
    <div className={styles.container}>
      <CustomArea />
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

          <TopArea />
          <div className={styles.midborder} />
          <Board board={board} onClick={clickHandler} onContextMenu={rightClick} />
          <div className={styles.bottomborder} />
        </div>
        <div className={styles.rightborder} />
      </div>
    </div>
  );
};

export default Home;
