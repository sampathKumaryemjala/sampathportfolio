'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CommonHeader } from '@/app/reusableComponents/layout/CommonHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/reusableComponents/ui/Table';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Analytics {
  userId: number;
  userName: string;
  email: string;
  totalPosts: number;
  totalComments: number;
}

type SortField = 'posts' | 'comments' | 'total';
type FilterType = 'all' | 'highActivity';

export default function AnalyticsTablePage() {
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [filteredAnalytics, setFilteredAnalytics] = useState<Analytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('total');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
          axios.get<User[]>('https://jsonplaceholder.typicode.com/users'),
          axios.get('https://jsonplaceholder.typicode.com/posts'),
          axios.get('https://jsonplaceholder.typicode.com/comments')
        ]);

        const postsByUser = new Map<number, number>();
        const commentsByUser = new Map<number, number>();

        postsRes.data.forEach((post: { userId: number; id: number }) => {
          postsByUser.set(post.userId, (postsByUser.get(post.userId) || 0) + 1);
        });

        commentsRes.data.forEach((comment: { postId: number }) => {
          const postId = comment.postId;
          const post = postsRes.data.find((p: { id: number; userId: number }) => p.id === postId);
          if (post) {
            commentsByUser.set(post.userId, (commentsByUser.get(post.userId) || 0) + 1);
          }
        });

        const analyticsData = usersRes.data.map(user => ({
          userId: user.id,
          userName: user.name,
          email: user.email,
          totalPosts: postsByUser.get(user.id) || 0,
          totalComments: commentsByUser.get(user.id) || 0,
        }));

        setAnalytics(analyticsData);
        setFilteredAnalytics(analyticsData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...analytics];
    
    if (filter === 'highActivity') {
      const avgPosts = analytics.reduce((sum, a) => sum + a.totalPosts, 0) / analytics.length;
      const avgComments = analytics.reduce((sum, a) => sum + a.totalComments, 0) / analytics.length;
      filtered = filtered.filter(a => a.totalPosts > avgPosts || a.totalComments > avgComments);
    }

    filtered.sort((a, b) => {
      let valueA, valueB;
      if (sortField === 'posts') {
        valueA = a.totalPosts;
        valueB = b.totalPosts;
      } else if (sortField === 'comments') {
        valueA = a.totalComments;
        valueB = b.totalComments;
      } else {
        valueA = a.totalPosts + a.totalComments;
        valueB = b.totalPosts + b.totalComments;
      }
      return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
    });

    setFilteredAnalytics(filtered);
  }, [filter, sortField, sortOrder, analytics]);

  const handleSort = (field: SortField) => {
    setSortOrder(sortField === field && sortOrder === 'desc' ? 'asc' : 'desc');
    setSortField(field);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <CommonHeader title="Analytics" description="Loading..." icon="📈" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CommonHeader
        title="Combined Analytics Table"
        description="User activity metrics from posts and comments"
        icon="📈"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setFilter('highActivity')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'highActivity'
                ? 'bg-orange-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            }`}
          >
            High Activity Only
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900/50">
                <TableHead>User Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead 
                  onClick={() => handleSort('posts')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    Total Posts
                    {sortField === 'posts' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
                  </div>
                </TableHead>
                <TableHead 
                  onClick={() => handleSort('comments')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    Total Comments
                    {sortField === 'comments' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
                  </div>
                </TableHead>
                <TableHead 
                  onClick={() => handleSort('total')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    Total Activity
                    {sortField === 'total' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnalytics.map((item) => (
                <TableRow key={item.userId}>
                  <TableCell className="font-semibold">{item.userName}</TableCell>
                  <TableCell className="text-blue-600 dark:text-blue-400">{item.email}</TableCell>
                  <TableCell>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full font-medium">
                      {item.totalPosts}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full font-medium">
                      {item.totalComments}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full font-semibold">
                      {item.totalPosts + item.totalComments}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}

