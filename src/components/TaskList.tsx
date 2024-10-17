import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { useTasks, useDeleteTask, useUpdateTask } from '../integrations/supabase';

interface Task {
  id: string;
  title: string;
  is_complete: boolean;
}

const TaskList: React.FC = () => {
  const { data: tasks, isLoading, error } = useTasks();
  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks</div>;

  const handleDelete = (id: string) => {
    deleteTaskMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Task deleted successfully');
      },
      onError: (error) => {
        toast.error('Failed to delete task');
        console.error('Delete error:', error);
      },
    });
  };

  const handleToggleComplete = (task: Task) => {
    updateTaskMutation.mutate(
      { id: task.id, is_complete: !task.is_complete },
      {
        onSuccess: () => {
          toast.success('Task updated successfully');
        },
        onError: (error) => {
          toast.error('Failed to update task');
          console.error('Update error:', error);
        },
      }
    );
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
  };

  const handleSaveEdit = (id: string) => {
    updateTaskMutation.mutate(
      { id, title: editingTitle },
      {
        onSuccess: () => {
          toast.success('Task updated successfully');
          setEditingId(null);
        },
        onError: (error) => {
          toast.error('Failed to update task');
          console.error('Update error:', error);
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      {tasks && tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task: Task) => (
            <li key={task.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
              {editingId === task.id ? (
                <>
                  <Input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="flex-grow mr-2"
                  />
                  <div>
                    <Button variant="outline" size="icon" className="mr-2" onClick={() => handleSaveEdit(task.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleCancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <span 
                    className={task.is_complete ? 'line-through text-gray-500' : ''}
                    onClick={() => handleToggleComplete(task)}
                  >
                    {task.title}
                  </span>
                  <div>
                    <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEdit(task)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
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