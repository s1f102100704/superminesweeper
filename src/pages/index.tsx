import styles from './index.module.css';

import { useGame } from '../hooks/useGame';
import React from 'react';
import CustomArea from '../component/CustomArea';
import Board from '../component/Board';

const Home = () => {
  const {
    easyMap,
    midMap,
    hardMap,
    customMap,
    onChangeWidth,
    onChangeHeight,
    onChangeBomb,
    buttonClick,
    boardReset,
    clickHandler,
    rightClick,
    mineSweeperConfig,
    bombcount,
    smileState,
    time,
    board,
  } = useGame();

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

      <Board
        bombcount={bombcount}
        smileState={smileState}
        time={time}
        boardReset={boardReset}
        board={board}
        clickHandler={clickHandler}
        mineSweeperConfig={mineSweeperConfig}
        rightClick={rightClick}
      />
    </div>
  );
};
export default Home;
