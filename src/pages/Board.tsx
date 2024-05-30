import { useGame } from './useGame';

const Board = (props) => {
  const {} = useGame();
  return (
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
  );
};
