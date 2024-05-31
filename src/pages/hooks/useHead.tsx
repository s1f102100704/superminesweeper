import { useState } from 'react';
export const useCustom = () => {
  const [mineSweeperConfig, setMinsweeperConfig] = useState({
    level: 'easy',
    width: 9,
    height: 9,
    bombs: 10,
  });
  return { mineSweeperConfig };
};
