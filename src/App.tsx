import Cell from './components/Cell'

function App() {
  const board = [["1", "2"], ["3", "4"]]
  return (
    <>
      <p>hellosu</p>
      {board.map(row => (
        <div>
          {row.map(cell => (
            <Cell content={cell} />
          ))}
        </div>
      ))}
    </>
  )
}

export default App
