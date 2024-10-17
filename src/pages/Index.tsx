import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Toaster } from "@/components/ui/sonner";
import { supabase } from '../lib/supabase';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const { data, error } = await supabase.from('tasks').select('count', { count: 'exact' });
        if (error) throw error;
        setIsLoading(false);
      } catch (error) {
        console.error('Error connecting to Supabase:', error);
        toast.error('Failed to connect to the database');
      }
    };

    checkSupabase();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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