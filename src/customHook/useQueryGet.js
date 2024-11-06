import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'

const getList = async (url) => {
    const result = await axios.get(url)
    return result.data
    // console.log(result);
}

const useQueryGet = (key, url) => {
    return useQuery(key, () => getList(url))
}

export default useQueryGet