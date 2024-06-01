import { useState } from 'react';
export const useHead = () => {
  const [mineSweeperConfig, setMinsweeperConfig] = useState({
    level: 'easy',
    width: 9,
    height: 9,
    bombs: 10,
  });
  return { bombcount, smileState, time, boardReset };
};
