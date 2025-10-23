'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CommonHeader } from '@/app/reusableComponents/layout/CommonHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/reusableComponents/ui/Table';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default function NestedUsersPostsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<{ [key: number]: Post[] }>({});
  const [expandedUser, setExpandedUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const fetchUserPosts = async (userId: number) => {
    if (userPosts[userId]) {
      setExpandedUser(expandedUser === userId ? null : userId);
      return;
    }

    setLoadingPosts(userId);
    try {
      const response = await axios.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      setUserPosts(prev => ({ ...prev, [userId]: response.data }));
      setExpandedUser(userId);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingPosts(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <CommonHeader title="Nested Table" description="Loading..." icon="📊" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CommonHeader
        title="Nested Users → Posts"
        description="Click any user to expand and view their posts"
        icon="📊"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900/50">
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <React.Fragment key={user.id}>
                  <TableRow
                    onClick={() => fetchUserPosts(user.id)}
                    className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    <TableCell>
                      <motion.div
                        animate={{ rotate: expandedUser === user.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </TableCell>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell className="font-semibold">{user.name}</TableCell>
                    <TableCell className="text-purple-600 dark:text-purple-400">@{user.username}</TableCell>
                    <TableCell className="text-blue-600 dark:text-blue-400">{user.email}</TableCell>
                  </TableRow>
                  
                  <AnimatePresence>
                    {expandedUser === user.id && (
                      <TableRow>
                        <TableCell colSpan={5} className="p-0 bg-gray-50 dark:bg-gray-900/30">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            {loadingPosts === user.id ? (
                              <div className="p-6 text-center">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                              </div>
                            ) : (
                              <div className="p-6">
                                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Posts by {user.name}</h3>
                                <div className="space-y-3">
                                  {userPosts[user.id]?.map((post) => (
                                    <div key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                      <p className="font-medium text-gray-900 dark:text-white mb-1">{post.title}</p>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">{post.body}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}

