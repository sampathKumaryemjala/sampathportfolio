'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/reusableComponents/ui/Table';

// Types
interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  length: number;
}

export default function QuotesTablePage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  // Fetch initial quotes
  useEffect(() => {
    fetchMultipleQuotes(5);
  }, []);

  // Fetch multiple random quotes
  const fetchMultipleQuotes = async (count: number) => {
    try {
      setLoading(true);
      setError(null);
      const promises = Array.from({ length: count }, () =>
        axios.get<Quote>('https://api.quotable.io/random')
      );
      const responses = await Promise.all(promises);
      const newQuotes = responses.map(response => response.data);
      setQuotes(newQuotes);
    } catch (err) {
      setError('Failed to fetch quotes. Please try again later.');
      console.error('Error fetching quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single new quote
  const fetchNewQuote = async () => {
    try {
      setFetching(true);
      const response = await axios.get<Quote>('https://api.quotable.io/random');
      setQuotes(prev => [response.data, ...prev].slice(0, 10)); // Keep only last 10
    } catch (err) {
      setError('Failed to fetch new quote.');
      console.error('Error fetching quote:', err);
    } finally {
      setFetching(false);
    }
  };

  if (loading && quotes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-pink-900/20 dark:to-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8"></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-pink-900/20 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            💭 Random Quotes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover inspiring quotes from Quotable API
          </p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Quotes Loaded</p>
              <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">{quotes.length}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchNewQuote}
              disabled={fetching}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {fetching ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Fetching...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Fetch New Quote
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800 dark:text-red-200">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-900/50">
                  <TableHead className="w-[60px] font-semibold text-gray-700 dark:text-gray-300">#</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Quote</TableHead>
                  <TableHead className="w-[200px] font-semibold text-gray-700 dark:text-gray-300">Author</TableHead>
                  <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">Length</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center gap-3">
                        <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <p className="text-lg">No quotes yet. Click "Fetch New Quote" to get started!</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  quotes.map((quote, index) => (
                    <motion.tr
                      key={quote._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <TableCell className="font-medium text-gray-900 dark:text-white">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-white">
                        <div className="flex items-start gap-3">
                          <svg className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                          </svg>
                          <p className="italic">{quote.content}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {quote.author.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {quote.author}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300">
                          {quote.length} chars
                        </span>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {quotes.length > 0 && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {quotes.length} quote{quotes.length !== 1 ? 's' : ''} loaded • Showing most recent
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fetchMultipleQuotes(5)}
                  disabled={loading}
                  className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Refresh All (5 New Quotes)'}
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quote of the Day Card */}
        {quotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-xl p-8 text-white"
          >
            <div className="flex items-start gap-4">
              <svg className="w-12 h-12 flex-shrink-0 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 opacity-90">
                  Latest Quote
                </h3>
                <p className="text-2xl font-medium mb-4 leading-relaxed">
                  {quotes[0].content}
                </p>
                <p className="text-lg opacity-90">
                  — {quotes[0].author}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

