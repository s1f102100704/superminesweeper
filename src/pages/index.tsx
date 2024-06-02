import styles from './index.module.css';
import Board from './component/Board';
import CustomArea from './component/CustomArea';
import TopArea from './component/TopArea';
import { useCustom } from './hooks/useCustom';
import { useGame } from './hooks/useGame';

import React from 'react';

const Home = () => {
  const {
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
  } = useGame();
  const { mineSweeperConfig } = useCustom(
    setMove,
    setTime,
    initCount,
    setUserInputs,
    setBombmap,
    board,
  );

  return (
    <div className={styles.container}>
      <CustomArea
        easyMap={easyMap}
        midMap={midMap}
        hardMap={hardMap}
        customMap={customMap}
        onChangeWidth={onChangeWidth}
        onchangeHeight={onChangeHeight}
        onChangeBomb={onChangeBomb}
        buttonClick={buttonClick}
      />
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
          <Board
            board={board}
            clickHandler={clickHandler}
            mineSweeperConfig={mineSweeperConfig}
            rightClick={rightClick}
          />
          <div className={styles.bottomborder} />
        </div>
        <div className={styles.rightborder} />
      </div>
    </div>
  );
};
export default Home;
