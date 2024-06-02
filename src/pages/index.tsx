import styles from './index.module.css';
import Board from './component/Board';
import CustomArea from './component/CustomArea';
import TopArea from './component/TopArea';
import { useCustom } from './hooks/useCustom';
import { useGame } from './hooks/useGame';

import React from 'react';

const Home = () => {
  const {
    easyMap,
    midMap,
    hardMap,
    customMap,
    bombbomb,
    onChangeWidth,
    onChangeHeight,
    onChangeBomb,
    buttonClick,
    board,
    mineSweeperConfig,
    boardwidth,
    boardheight,
    bombNumber,
    bombcount,
  } = useCustom();
  const { smileState, time, boardReset, clickHandler, rightClick } = useGame({
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
  });
  return (
    <div className={styles.container}>
      <CustomArea
        easyMap={easyMap}
        midMap={midMap}
        hardMap={hardMap}
        customMap={customMap}
        onChangeWidth={onChangeWidth}
        onChangeHeight={onChangeHeight}
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
          <TopArea
            bombcount={bombcount}
            smileState={smileState}
            time={time}
            boardReset={boardReset}
          />
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
