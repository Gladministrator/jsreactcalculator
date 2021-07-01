import React from "react-dom";
import Buttons from "./buttons";
import { CalculationProvider } from "./contextState";

function App() {
  return (
    <div>
      <CalculationProvider>
        <Buttons />
      </CalculationProvider>
    </div>
  );
}

export default App;
