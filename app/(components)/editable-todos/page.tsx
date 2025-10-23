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

export default function EditableTodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=20');
        setTodos(response.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const handleSave = async (id: number) => {
    setSaving(id);
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        title: editValue,
        completed: todos.find(t => t.id === id)?.completed
      });
      setTodos(todos.map(t => t.id === id ? { ...t, title: editValue } : t));
      setEditingId(null);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(null);
    }
  };

  const toggleStatus = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    setSaving(id);
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        ...todo,
        completed: !todo.completed
      });
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <CommonHeader title="Editable Todos" description="Loading..." icon="✏️" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CommonHeader
        title="Editable Todos Table"
        description="Click to edit titles or toggle completion status"
        icon="✏️"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900/50">
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-[150px]">Status</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell className="font-medium">#{todo.id}</TableCell>
                  <TableCell>
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-500 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span className="text-gray-900 dark:text-white">{todo.title}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => toggleStatus(todo.id)}
                      disabled={saving === todo.id}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        todo.completed
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                      } ${saving === todo.id ? 'opacity-50' : 'hover:opacity-80'}`}
                    >
                      {saving === todo.id ? '...' : todo.completed ? 'Completed' : 'Pending'}
                    </button>
                  </TableCell>
                  <TableCell>
                    {editingId === todo.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(todo.id)}
                          disabled={saving === todo.id}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(todo)}
                        className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                      >
                        Edit
                      </button>
                    )}
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

