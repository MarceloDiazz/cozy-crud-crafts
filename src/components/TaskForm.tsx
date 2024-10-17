import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const addTask = async (title: string): Promise<void> => {
  const { error } = await supabase
    .from('tasks')
    .insert({ title, completed: false });

  if (error) throw error;
};

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTitle('');
      toast.success('Task added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add task');
      console.error('Add task error:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      mutation.mutate(title);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new task"
        className="flex-grow"
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default TaskForm;