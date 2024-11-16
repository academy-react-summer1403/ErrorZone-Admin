import { useMutation, useQueryClient } from '@tanstack/react-query';
import http from '../core/services/interceptor';
// import { useMutation, useQueryClient } from 'react-query';



export const useMutationPost = (url, key) => {
    const queryClient = useQueryClient();

    const handleAdd = async (values) => {
        const res = await http.post(url, values);
        return res;
    };




    return useMutation({
        mutationFn: handleAdd,

        onSuccess: (data) => {
            queryClient.invalidateQueries(key)


            // extra option



            // queryClient.setQueryData('list' , (oldData)=>{
            //     let newData = [...oldData]
            //     newData.push(data)

            //     console.log(oldData);
            //     return newData

            // })
        },


        // onMutate :async (data)=>{
        //     await queryClient.cancelQueries('list2')
        //     const lastData = queryClient.getQueriesData('list2')

        //     queryClient.setQueriesData('list2' , (oldQueryData)=>{
        //         let newarr = [...oldQueryData]
        //         newarr.push(data.values)
        //         return newarr
        //     }

        //     )
        //     return lastData

        // },


        // onSettled:(data)=>{
        //     queryClient.invalidateQueries('list2')

        // },

        // onError : (error , hero , context)=>{
        //     queryClient.setQueriesData('list2', context[0][1])
        //     // queryClient.setQueriesData('list', [{id:1 ,fname:'ali' , lname:'hasani'}] )
        //     // console.log(context[0][1]);
        // },

    }
    )




};



export const useMutationPostOnSuccesOpt = (url, onSuccessFn) => {
    return useMutation({
        mutationFn: async (value) => await http.post(url, value),
        onSuccess: onSuccessFn,
    })
}

export default useMutationPost;