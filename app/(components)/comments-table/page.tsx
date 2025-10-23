'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CommonHeader } from '@/app/reusableComponents/layout/CommonHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/reusableComponents/ui/Table';

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export default function CommentsTablePage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments');
        setComments(response.data);
        setFilteredComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  useEffect(() => {
    const filtered = comments.filter(comment =>
      comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComments(filtered);
  }, [searchTerm, comments]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <CommonHeader title="Comments Table" description="Loading comments..." icon="💬" />
        <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CommonHeader
        title="Comments Table"
        description="Search and browse comments from JSONPlaceholder API"
        icon="💬"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 flex gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Comments</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{comments.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">Filtered Results</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{filteredComments.length}</p>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900/50">
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Comment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComments.map((comment, index) => (
                <TableRow key={comment.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}>
                  <TableCell className="font-medium">#{comment.id}</TableCell>
                  <TableCell className="font-medium">{comment.name}</TableCell>
                  <TableCell className="text-blue-600 dark:text-blue-400">{comment.email}</TableCell>
                  <TableCell className="max-w-md line-clamp-2">{comment.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}

