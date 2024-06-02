import styles from '../index.module.css';
interface Props {
  easyMap: () => void;
  midMap: () => void;
  hardMap: () => void;
  customMap: () => void;
  onChangeWidth: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeHeight: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBomb: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonClick: () => void;
}
export const CustomArea: React.FC<Props> = (props) => {
  const {
    easyMap,
    midMap,
    hardMap,
    customMap,
    onChangeWidth,
    onChangeHeight,
    onChangeBomb,
    buttonClick,
  } = props;
  return (
    <div>
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
    </div>
  );
};
