import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Task Manager</h1>
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 mb-8">
          <TaskForm />
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <TaskList />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;