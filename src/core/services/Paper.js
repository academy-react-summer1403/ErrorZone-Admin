import instance from "./interceptor";

export const getPapers = async (search,page,activee) => {
    try {
      const queryParams = [];
  
      if (search) queryParams.push(`Query=${search}`);
      // if (sort) queryParams.push(`SortingCol=${sort}`);
      if (page) queryParams.push(`PageNumber=${page}`);
      if (activee==true||activee==false) queryParams.push(`IsActive=${activee}`);
  
      const url = `/News/AdminNewsFilterList?RowsOfPage=10&${queryParams.join("&")}`;
      const result = await instance.get(url);
      //console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  export const getListNewsCategory = async () => {
    try {
      const response = await instance.get("/News/GetListNewsCategory");
      return response;
    } catch (error) {
      console.error("Failed to fetch news categories", error);
      return false;
    }
  };

  export const createNews = async (formData) => {
    try {
      const response = await instance.post("/News/CreateNews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      throw new Error(error.response.data.ErrorMessage);

    }
  };

 