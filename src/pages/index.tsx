import Board from './component/Board';
import CustomArea from './component/CustomArea';
import TopArea from './component/TopArea';
import { useCustom } from './hooks/useCustom';
import styles from './index.module.css';
import React from 'react';

const Home = () => {
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
          <Board />
          <div className={styles.bottomborder} />
        </div>
        <div className={styles.rightborder} />
      </div>
    </div>
  );
};
export default Home;
