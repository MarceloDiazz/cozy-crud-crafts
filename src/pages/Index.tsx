import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Task Manager</h1>
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <TaskForm />
        </div>
        <div className="bg-white rounded-lg shadow-xl p-6">
          <TaskList />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;