import { motion, AnimatePresence } from "framer-motion";
import { useTicTacToe } from "./hooks/useTicTacToe";
import Button from "./components/Button";
import Square from "./components/Square";

function App() {
    const {
        squares,
        turn,
        winner,
        isAiMode,
        difficulty,
        updateSquares,
        resetGame,
        toggleAiMode,
        changeDifficulty,
    } = useTicTacToe();

    return (
        <div className="tic-tac-toe">
            <h1>
                TIC-TAC-TOE
                {isAiMode
                    ? ` (AI Mode - ${
                          difficulty.charAt(0).toUpperCase() +
                          difficulty.slice(1)
                      } Level)`
                    : ""}
            </h1>
            <div className="game-controls">
                <Button resetGame={resetGame} text="Reset Game" />
                <button onClick={toggleAiMode} className="ai-toggle">
                    {isAiMode ? "Disable AI" : "Enable AI"}
                </button>
                {isAiMode && (
                    <button
                        onClick={changeDifficulty}
                        className="difficulty-toggle"
                    >
                        {difficulty.charAt(0).toUpperCase() +
                            difficulty.slice(1)}
                    </button>
                )}
            </div>
            <div className="game">
                {Array.from("012345678").map((ind) => (
                    <Square
                        key={ind}
                        ind={ind}
                        updateSquares={updateSquares}
                        clsName={squares[ind]}
                    />
                ))}
            </div>
            <div className={`turn ${turn === "x" ? "left" : "right"}`}>
                <Square clsName="x" />
                <Square clsName="o" />
            </div>
            <AnimatePresence>
                {winner && (
                    <motion.div
                        key={"parent-box"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="winner"
                    >
                        <motion.div
                            key={"child-box"}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{
                                scale: 0,
                                opacity: 0,
                            }}
                            className="text"
                        >
                            <motion.h2
                                initial={{
                                    scale: 0,
                                    y: 100,
                                }}
                                animate={{
                                    scale: 1,
                                    y: 0,
                                    transition: {
                                        y: {
                                            delay: 0.7,
                                        },
                                        duration: 0.7,
                                    },
                                }}
                            >
                                {winner === "x | o"
                                    ? "Tie :/"
                                    : "Winner!! :)"}
                            </motion.h2>
                            <motion.div
                                initial={{
                                    scale: 0,
                                }}
                                animate={{
                                    scale: 1,
                                    transition: {
                                        delay: 1.3,
                                        duration: 0.2,
                                    },
                                }}
                                className="win"
                            >
                                {winner === "x | o" ? (
                                    <>
                                        <Square clsName="x" />
                                        <Square clsName="o" />
                                    </>
                                ) : (
                                    <>
                                        <Square clsName={winner} />
                                    </>
                                )}
                            </motion.div>
                            <motion.div
                                initial={{
                                    scale: 0,
                                }}
                                animate={{
                                    scale: 1,
                                    transition: {
                                        delay: 1.5,
                                        duration: 0.3,
                                    },
                                }}
                            >
                                <Button
                                    resetGame={resetGame}
                                    text="Play Again"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
