import { useState } from 'react';
import { useGame } from '../hooks/useGame';
import { useHead } from '../hooks/useHead';
import styles from './index.module.css';
const TopArea = (props) => {
  const { board, clickHandler, rightClick, mineSweeperConfig } = useGame();
  const { bombcount, smileState, time, boardReset } = useHead();
  return (
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
  );
};
export default TopArea;
