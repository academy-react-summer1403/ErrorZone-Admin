import instance from "./interceptor";


export const getNewsDet = async (id) => {
    try {
      const result = await instance.get(`/News/${id}`);
      //console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  export const getNewsRep = async (id) => {
    try {
      const result = await instance.get(`/News/GetRepliesComments?Id=${id}`);
      //console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  export const getNewsCat= async () => {
    try {
      const result = await instance.get(`/News/GetListNewsCategory`);
      //console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  export const updateNews= async (data) => {
    try {
      const result = await instance.put("/News/UpdateNews", data);
      //console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  export const activeNews= async (data) => {
    try {
      const result = await instance.put("/News/ActiveDeactiveNews", data);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };