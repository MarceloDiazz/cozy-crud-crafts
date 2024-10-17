import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TaskForm />
          <TaskList />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;