import { useBoardStore } from "../zus/BoardStore"
import "./components.css"

interface CellProps {
  content: string,
  row: number,
  col: number,
}

const Cell = ({ content, row, col }: CellProps) => {
  const focusedRow = useBoardStore((state) => state.row);
  const focusedCol = useBoardStore((state) => state.col);
  const setFocusedCell = useBoardStore((state) => state.setFocusedCell);

  const cellClass = (row == focusedRow && col == focusedCol) ? "focused-cell" : "cell";

  return (
    <div className={cellClass} onClick={() => setFocusedCell(row, col)}>
      <span>
        {content}
      </span>
    </div>
  )
}

export default Cell
