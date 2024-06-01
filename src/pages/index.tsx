import styles from './index.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';

const Home = () => {
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
