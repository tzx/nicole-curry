import { useBoardStore, DIR } from "../zus/BoardStore"

const DirectionDisplay = () => {
  const direction = useBoardStore((state) => state.direction);
  const dirString = direction == DIR.VERTICAL ? "DOWN" : "RIGHT";

  return (
    <>
      <p>Direction: {dirString}</p>
    </>
  )
}

export default DirectionDisplay
