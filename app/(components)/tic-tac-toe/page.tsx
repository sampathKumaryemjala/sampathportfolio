'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type Player = 'X' | 'O' | null;
type Board = Player[];
type GameMode = 'pvp' | 'ai';
type Winner = { player: Player; line: number[] } | null;

// Custom hook for Tic-Tac-Toe game logic
function useTicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Winner>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  // Load scores from localStorage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem('ticTacToeScores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  // Save scores to localStorage
  useEffect(() => {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
  }, [scores]);

  // Winning combinations
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Check for winner
  const checkWinner = (board: Board): Winner => {
    for (const line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { player: board[a], line };
      }
    }
    return null;
  };

  // Minimax algorithm for AI (unbeatable)
  const minimax = (board: Board, depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(board);
    
    if (winner?.player === 'O') return 10 - depth;
    if (winner?.player === 'X') return depth - 10;
    if (board.every(cell => cell !== null)) return 0;

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          maxScore = Math.max(score, maxScore);
        }
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          minScore = Math.min(score, minScore);
        }
      }
      return minScore;
    }
  };

  // Find best move for AI
  const findBestMove = (board: Board): number => {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, 0, false);
        board[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  // Handle cell click
  const handleCellClick = (index: number) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScores(prev => ({
        ...prev,
        [gameWinner.player!]: prev[gameWinner.player as 'X' | 'O'] + 1
      }));
      return;
    }

    if (newBoard.every(cell => cell !== null)) {
      setIsDraw(true);
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // AI move (triggered by useEffect)
  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 'O' && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const bestMove = findBestMove([...board]);
        if (bestMove !== -1) {
          handleCellClick(bestMove);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, board, winner, isDraw]);

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  };

  // Start new game (with mode selection)
  const startNewGame = (mode: GameMode) => {
    setGameMode(mode);
    resetGame();
  };

  return {
    board,
    currentPlayer,
    winner,
    isDraw,
    gameMode,
    scores,
    handleCellClick,
    resetGame,
    startNewGame,
  };
}

export default function TicTacToePage() {
  const {
    board,
    currentPlayer,
    winner,
    isDraw,
    gameMode,
    scores,
    handleCellClick,
    resetGame,
    startNewGame,
  } = useTicTacToe();

  const [showModeSelector, setShowModeSelector] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Tic-Tac-Toe
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {gameMode === 'ai' ? 'Play against AI' : 'Two Player Mode'}
          </p>
        </motion.div>

        {/* Scoreboard */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{scores.X}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Player X</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">{scores.draws}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Draws</div>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">{scores.O}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {gameMode === 'ai' ? 'AI (O)' : 'Player O'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game Board */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-6"
        >
          {/* Status Bar */}
          <div className="mb-6 text-center">
            <AnimatePresence mode="wait">
              {winner ? (
                <motion.div
                  key="winner"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-2xl font-bold"
                >
                  <span className={winner.player === 'X' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}>
                    🎉 Player {winner.player} Wins! 🎉
                  </span>
                </motion.div>
              ) : isDraw ? (
                <motion.div
                  key="draw"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-2xl font-bold text-gray-600 dark:text-gray-400"
                >
                  🤝 It's a Draw! 🤝
                </motion.div>
              ) : (
                <motion.div
                  key="playing"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-xl font-semibold text-gray-700 dark:text-gray-300"
                >
                  Current Player: 
                  <span className={currentPlayer === 'X' ? 'text-blue-600 dark:text-blue-400 ml-2' : 'text-red-600 dark:text-red-400 ml-2'}>
                    {currentPlayer}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6">
            {board.map((cell, index) => {
              const isWinningCell = winner?.line.includes(index);
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: cell ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCellClick(index)}
                  disabled={!!cell || !!winner || isDraw}
                  className={`
                    aspect-square rounded-xl text-5xl font-bold
                    transition-all duration-200
                    ${!cell && !winner && !isDraw ? 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer' : 'cursor-not-allowed'}
                    ${isWinningCell ? 'bg-gradient-to-br from-yellow-200 to-yellow-300 dark:from-yellow-600 dark:to-yellow-700 shadow-lg' : 'bg-gray-50 dark:bg-gray-700'}
                    ${cell === 'X' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}
                  `}
                >
                  <AnimatePresence>
                    {cell && (
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      >
                        {cell}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md"
            >
              🔄 Reset Game
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModeSelector(true)}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-md"
            >
              🎮 New Game
            </motion.button>
          </div>
        </motion.div>

        {/* Mode Selector Modal */}
        <AnimatePresence>
          {showModeSelector && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowModeSelector(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Choose Game Mode
                </h2>
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      startNewGame('pvp');
                      setShowModeSelector(false);
                    }}
                    className="w-full p-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold text-lg shadow-lg transition-all"
                  >
                    <div className="text-3xl mb-2">👥</div>
                    Two Players
                    <div className="text-sm font-normal mt-1 opacity-90">Play with a friend</div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      startNewGame('ai');
                      setShowModeSelector(false);
                    }}
                    className="w-full p-6 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl font-semibold text-lg shadow-lg transition-all"
                  >
                    <div className="text-3xl mb-2">🤖</div>
                    Play vs AI
                    <div className="text-sm font-normal mt-1 opacity-90">Challenge the computer</div>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

