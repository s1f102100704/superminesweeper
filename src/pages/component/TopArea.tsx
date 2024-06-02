import { useGame } from '../hooks/useGame';
import { useCustom } from '../hooks/useCustom';
import styles from '../index.module.css';
const TopArea = () => {
  const { boardReset, smileState, time } = useGame();
  const { bombcount } = useCustom();

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
