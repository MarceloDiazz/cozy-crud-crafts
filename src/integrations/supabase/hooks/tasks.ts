import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query: any) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### tasks

| name        | type    | format  | required |
|-------------|---------|---------|----------|
| id          | uuid    | string  | true     |
| title       | text    | string  | false    |
| is_complete | boolean | boolean | false    |

Note: 
- id is the Primary Key and has a default value of extensions.uuid_generate_v4()
- is_complete has a default value of false
*/

export const useTask = (id: string) => useQuery({
    queryKey: ['tasks', id],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*').eq('id', id).single()),
});

export const useTasks = () => useQuery({
    queryKey: ['tasks'],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*')),
});

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask: { title: string; is_complete?: boolean }) => 
            fromSupabase(supabase.from('tasks').insert([newTask])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }: { id: string; title?: string; is_complete?: boolean }) => 
            fromSupabase(supabase.from('tasks').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => fromSupabase(supabase.from('tasks').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};