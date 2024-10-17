import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { useAddTask } from '../integrations/supabase';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const addTaskMutation = useAddTask();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      addTaskMutation.mutate(
        { title, is_complete: false },
        {
          onSuccess: () => {
            setTitle('');
            toast.success('Task added successfully');
          },
          onError: (error) => {
            toast.error('Error adding task');
            console.error('Add task error:', error);
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new task"
        className="flex-grow"
      />
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;