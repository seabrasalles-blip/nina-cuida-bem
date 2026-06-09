import { useState } from "react";
import { GameStage } from "./GameStage";
import { StartScreen } from "./StartScreen";
import { InstructionsScreen } from "./InstructionsScreen";
import { BoardGame } from "./BoardGame";
import { FinalScreen } from "./FinalScreen";

type Screen = "start" | "instructions" | "board" | "final";

export function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [gameKey, setGameKey] = useState(0);

  return (
    <GameStage>
      {screen === "start" && <StartScreen onStart={() => setScreen("instructions")} />}
      {screen === "instructions" && (
        <InstructionsScreen onContinue={() => setScreen("board")} />
      )}
      {screen === "board" && (
        <BoardGame key={gameKey} onFinish={() => setScreen("final")} />
      )}
      {screen === "final" && (
        <FinalScreen
          onReplay={() => {
            setGameKey((k) => k + 1);
            setScreen("board");
          }}
          onFinish={() => setScreen("start")}
        />
      )}
    </GameStage>
  );
}
