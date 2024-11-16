
import { useMutation, useQueryClient } from '@tanstack/react-query';
import http from '../core/services/interceptor';




const useMutationDelete = (url, key) => {
    const queryClient = useQueryClient()

    const handleDel = async (value) => {
        const res = await http.delete(url, { data: value });
        console.log(res);
        return res;
    }

    return useMutation({
        mutationFn: handleDel,

        onSuccess: () => {
            queryClient.invalidateQueries(key);


            // extra option

            // queryClient.setQueryData('list2' , (oldData)=>{
            //     let newData = [...oldData]
            //     newData.push(data)

            //     console.log(oldData);
            //     return newData

            // })
        },
    });

    // return useMutation(handleAdd , {
    //     onSuccess:(data)=>{
    //         queryClient.invalidateQueries('list2')
    //         // queryClient.setQueryData('list2' , (oldData)=>{
    //         //     let newData = [...oldData]
    //         //     newData.push(data)

    //         //     console.log(oldData);
    //         //     return newData

    //         // })
    //     },

    //     // onMutate :async (data)=>{
    //     //     await queryClient.cancelQueries('list2')
    //     //     const lastData = queryClient.getQueriesData('list2')
    //     //     // console.log(previosHeroData[0][1])

    //     //     queryClient.setQueriesData('list2' , (oldQueryData)=>{
    //     //         // return [...previosHeroData , NewHero]
    //     //         let newarr = [...oldQueryData]
    //     //         newarr.push(data)
    //     //         return newarr
    //     //     }

    //     //     )
    //     //     return lastData

    //     // },


    //     // onSettled:(data)=>{
    //     //     queryClient.invalidateQueries('list2')
    //     //     // queryClient.setQueryData('list2' , (oldData)=>{
    //     //     //     let newData = [...oldData]
    //     //     //     newData.push(data)

    //     //     //     console.log(oldData);
    //     //     //     return newData

    //     //     // })


    //     // },

    //     // onError : (error , hero , context)=>{
    //     //     // queryClient.setQueriesData('list2', context[0][1])
    //     //     // queryClient.setQueriesData('list2', [{id:1 ,fname:'ali' , lname:'hasani'}] )
    //     //     // console.log(context[0][1]);
    //     // },

    // })

    // const handleMutate = (values)=>{
    //     mutate(values)
    // }


}

export default useMutationDelete