import { useState } from "react";

const useGas = () => {
  const [gas, setGas] = useState({
    slow: 10,
    standard: 15,
    fast: 20,
    turbo: 25,
  });
  return gas;
};

export default useGas;
