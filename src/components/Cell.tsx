interface CellProps {
  content: string
}

const Cell = ({ content }: CellProps) => {
  return (
    <div style={{ "display": "inline" }}>
      {content}
    </div>
  )
}

export default Cell
