'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

// Custom hook for calculator logic
function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastResult, setLastResult] = useState<string | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('calculatorHistory', JSON.stringify(history));
    }
  }, [history]);

  // Safe evaluation with operator precedence
  const evaluateExpression = (expr: string): string => {
    try {
      // Replace × and ÷ with * and /
      const sanitized = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-');

      // Validate expression
      if (!/^[\d+\-*/.%() ]+$/.test(sanitized)) {
        throw new Error('Invalid expression');
      }

      // Evaluate using Function constructor (safer than eval)
      const result = Function(`'use strict'; return (${sanitized})`)();
      
      if (!isFinite(result)) {
        throw new Error('Invalid result');
      }

      return String(Math.round(result * 100000000) / 100000000); // Round to 8 decimals
    } catch (error) {
      return 'Error';
    }
  };

  // Add number to display
  const addNumber = useCallback((num: string) => {
    setDisplay(prev => {
      if (prev === '0' || prev === 'Error' || lastResult !== null) {
        setLastResult(null);
        return num;
      }
      return prev + num;
    });
  }, [lastResult]);

  // Add operator
  const addOperator = useCallback((op: string) => {
    if (display === 'Error') return;

    const currentDisplay = display;
    const lastChar = expression.slice(-1);

    // Prevent multiple operators in a row
    if (['+', '−', '×', '÷', '%'].includes(lastChar) && currentDisplay === '') {
      setExpression(prev => prev.slice(0, -1) + op);
      return;
    }

    if (lastResult !== null) {
      setExpression(lastResult + ' ' + op + ' ');
      setLastResult(null);
    } else {
      setExpression(prev => prev + currentDisplay + ' ' + op + ' ');
    }
    setDisplay('');
  }, [display, expression, lastResult]);

  // Calculate result
  const calculate = useCallback(() => {
    if (display === 'Error') return;

    const fullExpression = expression + display;
    if (!fullExpression || fullExpression.trim() === '') return;

    const result = evaluateExpression(fullExpression);
    
    if (result !== 'Error') {
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        expression: fullExpression,
        result,
        timestamp: Date.now(),
      };
      setHistory(prev => [historyItem, ...prev].slice(0, 50)); // Keep last 50
    }

    setDisplay(result);
    setExpression('');
    setLastResult(result);
  }, [display, expression]);

  // Clear display (AC)
  const clear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setLastResult(null);
  }, []);

  // Toggle sign (±)
  const toggleSign = useCallback(() => {
    setDisplay(prev => {
      if (prev === '0' || prev === 'Error') return prev;
      return prev.startsWith('-') ? prev.slice(1) : '-' + prev;
    });
  }, []);

  // Add decimal point
  const addDecimal = useCallback(() => {
    setDisplay(prev => {
      if (prev === 'Error' || lastResult !== null) {
        setLastResult(null);
        return '0.';
      }
      if (prev.includes('.')) return prev;
      return prev + '.';
    });
  }, [lastResult]);

  // Percentage
  const percentage = useCallback(() => {
    setDisplay(prev => {
      if (prev === 'Error') return prev;
      const num = parseFloat(prev);
      return String(num / 100);
    });
  }, []);

  // Delete last character
  const deleteLast = useCallback(() => {
    setDisplay(prev => {
      if (prev === 'Error' || prev.length === 1) return '0';
      return prev.slice(0, -1);
    });
  }, []);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('calculatorHistory');
  }, []);

  return {
    display,
    expression,
    history,
    addNumber,
    addOperator,
    calculate,
    clear,
    toggleSign,
    addDecimal,
    percentage,
    deleteLast,
    clearHistory,
  };
}

export default function CalculatorPage() {
  const {
    display,
    expression,
    history,
    addNumber,
    addOperator,
    calculate,
    clear,
    toggleSign,
    addDecimal,
    percentage,
    deleteLast,
    clearHistory,
  } = useCalculator();

  const [showHistory, setShowHistory] = useState(false);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.key >= '0' && e.key <= '9') {
        addNumber(e.key);
      } else if (e.key === '.') {
        addDecimal();
      } else if (e.key === '+') {
        addOperator('+');
      } else if (e.key === '-') {
        addOperator('−');
      } else if (e.key === '*') {
        addOperator('×');
      } else if (e.key === '/') {
        addOperator('÷');
      } else if (e.key === '%') {
        percentage();
      } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clear();
      } else if (e.key === 'Backspace') {
        deleteLast();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [addNumber, addOperator, addDecimal, calculate, clear, deleteLast, percentage]);

  // Button configuration
  const buttons = [
    { label: 'AC', action: clear, className: 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white', span: 'col-span-2' },
    { label: '⌫', action: deleteLast, className: 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white' },
    { label: '÷', action: () => addOperator('÷'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '7', action: () => addNumber('7'), className: 'bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white' },
    { label: '8', action: () => addNumber('8'), className: 'bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white' },
    { label: '9', action: () => addNumber('9'), className: 'bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white' },
    { label: '×', action: () => addOperator('×'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '4', action: () => addNumber('4'), className: 'bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white' },
    { label: '5', action: () => addNumber('5'), className: 'bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white' },
    { label: '6', action: () => addNumber('6'), className: 'bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white' },
    { label: '−', action: () => addOperator('−'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '1', action: () => addNumber('1'), className: 'bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white' },
    { label: '2', action: () => addNumber('2'), className: 'bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white' },
    { label: '3', action: () => addNumber('3'), className: 'bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white' },
    { label: '+', action: () => addOperator('+'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '±', action: toggleSign, className: 'bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white' },
    { label: '0', action: () => addNumber('0'), className: 'bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white' },
    { label: '.', action: addDecimal, className: 'bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white' },
    { label: '=', action: calculate, className: 'bg-blue-600 hover:bg-blue-700 text-white' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-3">
            Calculator
          </h1>
          <p className="text-gray-300">
            Keyboard supported • Press Esc to clear
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calculator */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
              {/* Display */}
              <div className="mb-6 p-6 bg-gray-900/50 rounded-2xl min-h-[140px] flex flex-col justify-end">
                <div className="text-gray-400 text-lg mb-2 h-8 overflow-x-auto whitespace-nowrap">
                  {expression || ' '}
                </div>
                <div className="text-white text-5xl font-bold text-right overflow-x-auto">
                  {display}
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-4 gap-3">
                {buttons.map((btn, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={btn.action}
                    className={`
                      ${btn.className}
                      ${btn.span || ''}
                      py-6 rounded-xl text-2xl font-semibold
                      transition-all duration-200 shadow-lg
                      hover:shadow-xl active:shadow-inner
                    `}
                  >
                    {btn.label}
                  </motion.button>
                ))}
              </div>

              {/* Additional Operations */}
              <div className="mt-4 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={percentage}
                  className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg font-semibold transition-colors shadow-lg"
                >
                  % Percent
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-semibold transition-colors shadow-lg"
                >
                  📜 History
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* History Panel */}
          <AnimatePresence>
            {(showHistory || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:col-span-1"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">History</h2>
                    {history.length > 0 && (
                      <button
                        onClick={clearHistory}
                        className="text-red-400 hover:text-red-300 text-sm font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                    {history.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <div className="text-4xl mb-2">📝</div>
                        <p>No calculations yet</p>
                      </div>
                    ) : (
                      history.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors cursor-pointer border border-white/10"
                          onClick={() => {
                            clear();
                            setTimeout(() => {
                              item.result.split('').forEach(char => {
                                addNumber(char);
                              });
                            }, 100);
                          }}
                        >
                          <div className="text-gray-300 text-sm mb-1">
                            {item.expression}
                          </div>
                          <div className="text-white text-xl font-bold">
                            = {item.result}
                          </div>
                          <div className="text-gray-500 text-xs mt-2">
                            {new Date(item.timestamp).toLocaleString()}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Keyboard Shortcuts Help */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-white font-semibold mb-3">⌨️ Keyboard Shortcuts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
            <div><kbd className="px-2 py-1 bg-white/10 rounded">0-9</kbd> Numbers</div>
            <div><kbd className="px-2 py-1 bg-white/10 rounded">+ - * /</kbd> Operators</div>
            <div><kbd className="px-2 py-1 bg-white/10 rounded">Enter</kbd> Calculate</div>
            <div><kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd> Clear</div>
            <div><kbd className="px-2 py-1 bg-white/10 rounded">.</kbd> Decimal</div>
            <div><kbd className="px-2 py-1 bg-white/10 rounded">%</kbd> Percent</div>
            <div><kbd className="px-2 py-1 bg-white/10 rounded">Backspace</kbd> Delete</div>
            <div><kbd className="px-2 py-1 bg-white/10 rounded">C</kbd> Clear</div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

