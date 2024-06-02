import styles from '../index.module.css';
import React from 'react';
interface MineSweeperConfig {
  level: string;
  width: number;
  height: number;
  bombs: number;
}
interface Props {
  board: number[][];
  clickHandler: (x: number, y: number) => void;
  mineSweeperConfig: MineSweeperConfig;
  rightClick: (x: number, y: number) => void;
  bombcount: number;
  smileState: number;
  time: number;
  boardReset: () => void;
}

const Board: React.FC<Props> = (props) => {
  const {
    bombcount,
    smileState,
    time,
    boardReset,
    board,
    clickHandler,
    mineSweeperConfig,
    rightClick,
  } = props;
  const height = mineSweeperConfig.height || 0;
  const width = mineSweeperConfig.width || 0;
  return (
    <div
      id={styles.fullboard}
      style={{
        height: `${33 * height + 124}px`,
        width: `${33 * width + 42}px`,
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
            height: `${33 * height + 6}px`,
            width: `${33 * width + 6}px`,
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
  );
};
export default Board;
