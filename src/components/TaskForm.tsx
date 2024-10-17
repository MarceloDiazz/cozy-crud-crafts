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
            toast.success('Tarea agregada con éxito');
          },
          onError: (error) => {
            toast.error('Error al agregar la tarea');
            console.error('Error al agregar tarea:', error);
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
        placeholder="Ingresa una nueva tarea"
        className="flex-grow"
      />
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Agregar Tarea
      </Button>
    </form>
  );
};

export default TaskForm;