import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchUrl = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const useInfiniteQueryGet = (initialUrl) => {
  return useInfiniteQuery({
    queryKey: ["ew-people"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });
};

export default useInfiniteQueryGet;
