import styles from '../index.module.css';
const TopArea = ({ bombcount, smileState, time, boardReset }) => {
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
