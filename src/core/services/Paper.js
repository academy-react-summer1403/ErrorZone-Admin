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

  export const DeleteNews = async () => {
    try {
      const res = await instance.get("/News/AdminNewsFilterList?PageNumber=1&RowsOfPage=10&SortingCol=InsertDate&SortType=DESC&Query=&IsActive=false")
      return res
    } catch (error) {
      return false
    }
  }

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

  export const adminNewsFilterListAPI = async (
    pageNumber,
    rowsOfPage,
    sortingCol,
    sortType,
    query,
    isActive
  ) => {
    try {
      const response = await instance.get("/News/AdminNewsFilterList", {
        params: {
          pageNumber,
          rowsOfPage,
          sortingCol,
          sortType,
          query,
          isActive,
        },
      });
  
      return response;
    } catch (error) {
      return false;
    }
  };

  export const createNewsAPI = async (data) => {
    try {
      const response = await instance.post("/News/CreateNews", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response;
    } catch (error) {
      return false;
    }
  };

  export const getNewsCategoryListsAPI = async () => {
    try {
      const res = await instance.get("/News/GetListNewsCategory")
      return res
    } catch (error) {
      return false
    }
  }

  export const updateNewsCategoryAPI = async (data) => {
    try {
      const response = await instance.put("/News/UpdateNewsCategory", data);
  
      return response;
    } catch (error) {
      return false;
    }
  };

  export const createNewsCategoryAPI = async (data) => {
    try {
      const response = await instance.post("/News/CreateNewsCategory", data);
  
      return response;
    } catch (error) {
      return false;
    }
  };

  export const getNewsCategoryAPI = async (id) => {
    try {
      const response = await instance.get(`/News/GetNewsCategory/${id}`);
  
      return response;
    } catch (error) {
      return false;
    }
  };
  

export const deleteComments =  async (id) => {
  try {
      const res = await instance.delete(`/Course/DeleteCourseComment?CourseCommandId=${id}`)
      return res
  } catch (error) {
    console.log(error);
    return [];
  }
}



export const updateUserAPI = async (user) => {
  try {
    const response = await instance.put("/User/UpdateUser", user);

    return response;
  } catch (error) {
    return false;
  }
};

export const getCourseGroupAPI = async (teacherId, courseId) => {
  try {
    const response = await instance.get("/CourseGroup/GetCourseGroup", {
      params: {
        teacherId,
        courseId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const deleteCourseReserveAPI = async (id) => {
  try {
    const response = await instance.delete("/CourseReserve", {
      data: {
        id,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const sendReserveToCourseAPI = async (
  courseId,
  courseGroupId,
  studentId
) => {
  try {
    const response = await instance.post("/CourseReserve/SendReserveToCourse", {
      courseId,
      courseGroupId,
      studentId,
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const getCourseByIdAPI = async (id) => {
  try {
    const response = await instance.get(`/Course/${id}`);

    return response;
  } catch (error) {
    return false;
  }
};

export const getUserListsAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  isActiveUser,
  isDeletedUser,
  roleId
) => {
  try {
    const response = await instance.get("/User/UserMannage", {
      params: {
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
        isActiveUser,
        isDeletedUser,
        roleId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const deleteUserAPI = async (userId) => {
  try {
    const response = await instance.delete("/User/DeleteUser", {
      data: {
        userId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const addUserAccessAPI = async (enable, roleId, userId) => {
  try {
    const response = await instance.post(
      `/User/AddUserAccess`,
      {
        roleId,
        userId,
      },
      {
        params: {
          Enable: enable,
        },
      }
    );

    return response;
  } catch (error) {
    return false;
  }
};

export const createUserAPI = async (
  lastName,
  firstName,
  gmail,
  password,
  phoneNumber,
  isStudent,
  isTeacher
) => {
  try {
    const response = await instance.post("/User/CreateUser", {
      lastName,
      firstName,
      gmail,
      password,
      phoneNumber,
      isStudent,
      isTeacher,
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const acceptComment = async (form) => {
  try {
    const result = await instance.post(
      `/Course/AcceptCourseComment?CommentCourseId=${form}`
    );
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const rejectComment = async (form) => {
  try {
    const result = await instance.post(
      `/Course/RejectCourseComment?CommentCourseId=${form}`
    );
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deletComment = async (data) => {
  try {
    const result = await instance.delete(
      `/Course/DeleteCourseComment?CourseCommandId=${data}`
    );
    //console.log(result);
    return result;
  } catch (error) {
    // console.log(error);
    // return [];
    throw new Error(error.response.data.ErrorMessage[0]);
  }
};
  
export const ReserveToActive = async (userId) => {
  try {
    const result = await instance.put("/User/ReverseToActiveUser", userId);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
 
export const deleteUser = async (userId) => {
  try {
    const response = await instance.put("/User/ReverseToActiveUser", userId);

    return response;
  } catch (error) {
    return false;
  }
};