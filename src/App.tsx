import Cell from './components/Cell'
import Row from './components/Row'
import SizePicker from './components/SizePicker';
import DirectionDisplay from './components/DirectionDisplay'
import { useBoardStore } from './zus/BoardStore'
import useKeyHook from './KeyHook'

const Board = () => {
  const board = useBoardStore((state) => state.board)
  const onKeyDown = useKeyHook();

  return (
    <div tabIndex={0} onKeyDown={(e) => onKeyDown(e.key)}>
      {board.map((row, row_idx) => (
        <Row key={row_idx}>
          {row.map((cell, col_idx) => (
            <Cell
              key={`${row_idx},${col_idx}`}
              content={cell}
              row={row_idx}
              col={col_idx}
            />
          ))}
        </Row>
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <DirectionDisplay /> 
      <SizePicker />
      <Board />
    </>
  );
}

export default App
