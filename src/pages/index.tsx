import styles from './index.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';
import { useGame } from './useGame';
import { Board } from './Board';
import { TopArea } from './TopArea';
const Home = () => {
  const {} = useGame();

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

          <TopArea />
          <div className={styles.midborder} />
          <Board />
          <div className={styles.bottomborder} />
        </div>
        <div className={styles.rightborder} />
      </div>
    </div>
  );
};

export default Home;
