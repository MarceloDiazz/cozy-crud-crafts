import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

const deleteTask = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

const TaskList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete task');
      console.error('Delete error:', error);
    },
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      {tasks && tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
              <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.title}</span>
              <div>
                <Button variant="outline" size="icon" className="mr-2">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => deleteMutation.mutate(task.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks yet. Add a task to get started!</p>
      )}
    </div>
  );
};

export default TaskList;