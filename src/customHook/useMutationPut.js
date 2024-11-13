import { useMutation, useQueryClient } from '@tanstack/react-query';
import http from '../core/services/interceptor';

export const useMutationPutFormData = (url, key) => {
    const queryClient = useQueryClient();

    const handlePut = async (values) => {
        const res = await http.put(url, values, {headers: { 'Content-Type': 'multipart/form-data' }});
        return res;
    };

    return useMutation({
        mutationFn: (obj) => handlePut(obj),
        onSuccess: () => {
            queryClient.invalidateQueries(key);
        },
    }
    );
};

const useMutationPut = (url, key) => {
    const queryClient = useQueryClient();

    const handlePut = async (values) => {
        const res = await http.put(url, values);
        return res;
    };

    return useMutation({
        mutationFn: (obj) => handlePut(obj),
        onSuccess: () => {
            queryClient.invalidateQueries(key);
        },
    }
    );
};

export default useMutationPut;