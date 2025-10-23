'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CommonHeader } from '@/app/reusableComponents/layout/CommonHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/reusableComponents/ui/Table';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface UserSummary {
  userId: number;
  totalTodos: number;
  completed: number;
  pending: number;
}

type SortField = 'completed' | 'pending' | 'total';

export default function TodosSummaryPage() {
  const [summaries, setSummaries] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('completed');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
        const userMap = new Map<number, UserSummary>();
        
        response.data.forEach(todo => {
          if (!userMap.has(todo.userId)) {
            userMap.set(todo.userId, { userId: todo.userId, totalTodos: 0, completed: 0, pending: 0 });
          }
          const summary = userMap.get(todo.userId)!;
          summary.totalTodos++;
          if (todo.completed) summary.completed++;
          else summary.pending++;
        });

        const sorted = Array.from(userMap.values()).sort((a, b) => b.completed - a.completed);
        setSummaries(sorted);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleSort = (field: SortField) => {
    const newOrder = sortField === field && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortField(field);
    setSortOrder(newOrder);

    const sorted = [...summaries].sort((a, b) => {
      const valueA = field === 'total' ? a.totalTodos : field === 'completed' ? a.completed : a.pending;
      const valueB = field === 'total' ? b.totalTodos : field === 'completed' ? b.completed : b.pending;
      return newOrder === 'desc' ? valueB - valueA : valueA - valueB;
    });

    setSummaries(sorted);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <CommonHeader title="Todos Summary" description="Loading..." icon="📊" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CommonHeader
        title="Todos Summary Table"
        description="Overview of todos per user with sortable columns"
        icon="📊"
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900/50">
                <TableHead>User ID</TableHead>
                <TableHead 
                  onClick={() => handleSort('total')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    Total Todos
                    {sortField === 'total' && (
                      <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  onClick={() => handleSort('completed')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    Completed
                    {sortField === 'completed' && (
                      <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  onClick={() => handleSort('pending')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    Pending
                    {sortField === 'pending' && (
                      <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </div>
                </TableHead>
                <TableHead>Completion %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaries.map((summary) => {
                const percentage = Math.round((summary.completed / summary.totalTodos) * 100);
                return (
                  <TableRow key={summary.userId}>
                    <TableCell className="font-medium">User #{summary.userId}</TableCell>
                    <TableCell className="font-semibold">{summary.totalTodos}</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                        {summary.completed}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm font-medium">
                        {summary.pending}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">
                          {percentage}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}

