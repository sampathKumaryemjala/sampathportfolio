'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CommonHeader } from '@/app/reusableComponents/layout/CommonHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/reusableComponents/ui/Table';

interface APIStatus {
  name: string;
  endpoint: string;
  status: 'success' | 'failure' | 'checking';
  responseTime: number | null;
  lastUpdated: string;
}

export default function APIStatusPage() {
  const [apiStatuses, setApiStatuses] = useState<APIStatus[]>([
    { name: 'Users API', endpoint: 'https://jsonplaceholder.typicode.com/users', status: 'checking', responseTime: null, lastUpdated: '' },
    { name: 'Posts API', endpoint: 'https://jsonplaceholder.typicode.com/posts', status: 'checking', responseTime: null, lastUpdated: '' },
    { name: 'Comments API', endpoint: 'https://jsonplaceholder.typicode.com/comments', status: 'checking', responseTime: null, lastUpdated: '' },
    { name: 'Todos API', endpoint: 'https://jsonplaceholder.typicode.com/todos', status: 'checking', responseTime: null, lastUpdated: '' },
    { name: 'Albums API', endpoint: 'https://jsonplaceholder.typicode.com/albums', status: 'checking', responseTime: null, lastUpdated: '' },
  ]);

  const checkAPI = async (api: APIStatus): Promise<APIStatus> => {
    const startTime = Date.now();
    try {
      await axios.get(api.endpoint, { timeout: 5000 });
      const responseTime = Date.now() - startTime;
      return {
        ...api,
        status: 'success',
        responseTime,
        lastUpdated: new Date().toLocaleTimeString()
      };
    } catch (error) {
      return {
        ...api,
        status: 'failure',
        responseTime: null,
        lastUpdated: new Date().toLocaleTimeString()
      };
    }
  };

  const checkAllAPIs = async () => {
    const promises = apiStatuses.map(api => checkAPI(api));
    const results = await Promise.all(promises);
    setApiStatuses(results);
  };

  useEffect(() => {
    checkAllAPIs();
    const interval = setInterval(checkAllAPIs, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-900">
      <CommonHeader
        title="API Status Dashboard"
        description="Real-time monitoring of API endpoint health"
        icon="🚦"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {apiStatuses.filter(a => a.status === 'success').length} Online
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {apiStatuses.filter(a => a.status === 'failure').length} Offline
              </span>
            </div>
          </div>
          <button
            onClick={checkAllAPIs}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh All
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900/50">
                <TableHead className="w-[60px]">Status</TableHead>
                <TableHead>API Name</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiStatuses.map((api, index) => (
                <motion.tr
                  key={api.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border-b border-gray-200 dark:border-gray-700 transition-colors ${
                    api.status === 'failure' ? 'bg-red-50 dark:bg-red-900/10' : ''
                  }`}
                >
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {api.status === 'checking' ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      ) : api.status === 'success' ? (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{api.name}</TableCell>
                  <TableCell className="text-blue-600 dark:text-blue-400 font-mono text-sm">
                    {api.endpoint}
                  </TableCell>
                  <TableCell>
                    {api.responseTime ? (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        api.responseTime < 200
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : api.responseTime < 500
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                          : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                      }`}>
                        {api.responseTime}ms
                      </span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400 text-sm">
                    {api.lastUpdated || 'Never'}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          APIs are checked automatically every 30 seconds
        </motion.div>
      </div>
    </div>
  );
}

