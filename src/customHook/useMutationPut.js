import { useMutation , useQueryClient } from '@tanstack/react-query'
import http from '../core/services/interceptor' 


const useMutationPut = (url , key) => {
    const queryClient = useQueryClient();

    const handlePut = async ( values) => {
        console.log(values);
        const res = await http.put(url, values);
        return res.data;
    };

    

    return useMutation({
         mutationFn:(obj) => handlePut(obj), 
         
        onSuccess: () => {
            queryClient.invalidateQueries(key);
        },
    }
);

    
};

export default useMutationPut;