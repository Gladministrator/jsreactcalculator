import React, { useState, createContext } from "react";

export const CalcContext = createContext();

export const CalculationProvider = (props) => {
  const [calc, setcalc] = useState(false);

  return <CalcContext.Provider value={[calc, setcalc]}>{props.children}</CalcContext.Provider>;
};
