import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
import http from "../core/services/interceptor"
import React, { useEffect } from 'react'
import { Value } from 'sass'


const getList = async (url) => {
    const result = await http.get(url)
    return result

    // console.log(result);
}

const useQueryGet = (key, url) => {
    return useQuery({ queryKey: key, queryFn: () => getList(url) })

}

export const useQueryGetFiltered = (key, url, filterFn) => {
    return useQuery({ queryKey: key, queryFn: () => getList(url), select: (Value) => filterFn(Value) })

}


export default useQueryGet