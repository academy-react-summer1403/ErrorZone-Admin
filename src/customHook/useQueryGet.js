import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
import http from "../core/services/interceptor"
import React, { useEffect } from 'react'


const getList = async (url) => {
    const result = await http.get(url)
    return result

    // console.log(result);
}

const useQueryGet = (key, url) => {
    return useQuery({ queryKey: key, queryFn: () => getList(url) })

}

export default useQueryGet