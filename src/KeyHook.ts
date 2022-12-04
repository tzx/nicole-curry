import { useCallback } from "react";
import { useBoardStore, DIR } from "./zus/BoardStore";

const useKeyHook = () => {
  const setBoard = useBoardStore((state) => state.setBoard);
  const setDirection = useBoardStore((state) => state.setDirection);
  const onKeypress = useCallback((key: string) => {
    if (key.length == 1 && key.match(/[a-z]/i)) {
      setBoard(key);
    } else if (key == "ArrowDown") {
      setDirection(DIR.VERTICAL);
    } else if (key == "ArrowRight") {
      setDirection(DIR.HORIZONTAL);
    } else if (key == "Backspace") {
      setBoard("");
    }
  }, []);

  return onKeypress;
}

export default useKeyHook;
