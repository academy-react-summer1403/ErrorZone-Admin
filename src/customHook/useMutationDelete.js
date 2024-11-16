
import React, { useEffect } from 'react'
import { useQuery , useMutation, useQueryClient } from 'react-query'
import instance from '../core/services/interceptor'




const useMutationDelete = (key) => {
    const queryClient = useQueryClient()

    const handleDel =async (url ) =>{
        const res =await instance.delete(url);
        return res.data

    }

    return useMutation(handleDel, {
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