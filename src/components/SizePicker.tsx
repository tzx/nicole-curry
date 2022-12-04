import { useState } from "react";
import { useBoardStore } from "../zus/BoardStore";

const SizePicker = () => {
  const [rowSize, setRowSize] = useState<number>();
  const [colSize, setColSize] = useState<number>();
  const setBoardSize = useBoardStore((state) => state.setBoardSize);

  const onClick = () => {
    if (!rowSize || !colSize) {
      return;
    }
    setBoardSize(rowSize, colSize);
  };

  return (
    <>
      <input type="number" value={rowSize || ''} onChange={e => setRowSize(Number(e.target.value))} />
      <input type="number" value={colSize || ''} onChange={e => setColSize(Number(e.target.value))} />
      <button onClick={onClick}>
        change
      </button>

    </>
  );
}

export default SizePicker
