import { useState, useEffect } from "react";
import { checkWinner, checkEndTheGame } from "../utils/gameLogic";
import { findBestMove } from "../utils/aiLogic";

export const useTicTacToe = () => {
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [turn, setTurn] = useState("x");
    const [winner, setWinner] = useState(null);
    const [isAiMode, setIsAiMode] = useState(false);
    const [difficulty, setDifficulty] = useState("easy");

    const updateSquares = (ind) => {
        if (squares[ind] || winner || (isAiMode && turn === "o")) {
            return;
        }
        const s = [...squares];
        s[ind] = turn;
        setSquares(s);
        setTurn(turn === "x" ? "o" : "x");
        const W = checkWinner(s);
        if (W) {
            setWinner(W);
        } else if (checkEndTheGame(s)) {
            setWinner("x | o");
        }
    };

    // AI move logic
    useEffect(() => {
        if (isAiMode && turn === "o" && !winner) {
            const bestMove = findBestMove([...squares], difficulty);
            if (bestMove !== -1) {
                const s = [...squares];
                s[bestMove] = "o";
                setSquares(s);
                setTurn("x");
                const W = checkWinner(s);
                if (W) {
                    setWinner(W);
                } else if (checkEndTheGame(s)) {
                    setWinner("x | o");
                }
            }
        }
    }, [turn, isAiMode, winner, difficulty]);

    const resetGame = () => {
        setSquares(Array(9).fill(""));
        setTurn("x");
        setWinner(null);
    };

    const toggleAiMode = () => {
        setIsAiMode(!isAiMode);
        resetGame();
    };

    const changeDifficulty = () => {
        const difficulties = ["easy", "medium", "hard"];
        const currentIndex = difficulties.indexOf(difficulty);
        const nextDifficulty =
            difficulties[(currentIndex + 1) % difficulties.length];
        setDifficulty(nextDifficulty);
        resetGame();
    };

    return {
        squares,
        turn,
        winner,
        isAiMode,
        difficulty,
        updateSquares,
        resetGame,
        toggleAiMode,
        changeDifficulty,
    };
};
