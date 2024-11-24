import instance from "./interceptor";
import toast from 'react-hot-toast'

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


export const getUserWithIdAPI = async (userId) => {
  try {
    const response = await instance.get(`/User/UserDetails/${userId}`);

    return response;
  } catch (error) {
    return false;
  }
};

export const getCourseReserveWithIdAPI = async (courseId) => {
  try {
    const response = await instance.get(`/CourseReserve/${courseId}`);

    return response;
  } catch (error) {
    return false;
  }
};

export const deleteCourseCommentAPI = async (courseCommentId) => {
  try {
    const response = await instance.delete(`/Course/DeleteCourseComment`, {
      params: {
        courseCommandId: courseCommentId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const getCourseCommentsAPI = async (courseId) => {
  try {
    const response = await instance.get(`/Course/GetCourseCommnets/${courseId}`);

    return response;
  } catch (error) {
    return false;
  }
};

export const acceptCourseCommentAPI = async (commentCourseId) => {
  try {
    const response = await instance.post("/Course/AcceptCourseComment", undefined, {
      params: {
        commentCourseId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const rejectCourseCommentAPI = async (commentCourseId) => {
  try {
    const response = await instance.post("/Course/RejectCourseComment", undefined, {
      params: {
        commentCourseId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const addReplyCommentAPI = async (comment) => {
  try {
    const response = await instance.post("/Course/AddReplyCourseComment", comment);

    return response;
  } catch (error) {
    return false;
  }
};

export const getEditCourseAPI = async (courseId) => {
  try {
    const response = await instance.get("/Course/GetEditCourse", {
      params: {
        courseId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const updateCourseAPI = async (course) => {
  try {
    const response = await instance.put("/Course", course);

    return response;
  } catch (error) {
    return false;
  }
};

export const getCourseReserveAPI = async () => {
  try {
    const response = await instance.get("/CourseReserve");

    return response;
  } catch (error) {
    return false;
  }
};

export const addCourseTechnologyAPI = async (courseId, technologies) => {
  try {
    const response = await instance.post(
      `/Course/AddCourseTechnology?courseId=${courseId}`,
      technologies
    );

    return response;
  } catch (error) {
    return false;
  }
};

export const addCourseGroupAPI = async (data) => {
  try {
    const response = await instance.post("/CourseGroup", data);

    return response;
  } catch (error) {
    return false;
  }
};

export const createCourseAPI = async (data) => {
  try {
    const response = await instance.post("/Course", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const getCreateCourseAPI = async () => {
  try {
    const response = await instance.get("/Course/GetCreate");

    return response;
  } catch (error) {
    return false;
  }
};

export const getCourseGroupsAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query
) => {
  try {
    const response = await instance.get("/CourseGroup", {
      params: {
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const updateCourseGroupAPI = async (data) => {
  try {
    const response = await instance.put("/CourseGroup", data);

    return response;
  } catch (error) {
    return false;
  }
};

export const getCourseListAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  isTeacherCourse
) => {
  try {
    const response = await instance.get(
      `${isTeacherCourse ? "/Course/TeacherCourseList" : "/Course/CourseList"}`,
      {
        params: {
          pageNumber,
          rowsOfPage,
          sortingCol,
          sortType,
          query,
        },
      }
    );

    return response;
  } catch (error) {
    return false;
  }
};

export const getCourseGroupDetailsAPI = async (id) => {
  try {
    const response = await instance.get("/CourseGroup/Details", {
      params: {
        id,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const deleteCourseGroupAPI = async (data) => {
  try {
    const response = await instance.delete("/CourseGroup", {
      data,
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const getProfileInfoAPI = async () => {
  try {
    const response = await instance.get("/SharePanel/GetProfileInfo");

    return response;
  } catch (error) {
    return false;
  }
};

export const dashboardReportAPI = async () => {
  try {
    const response = await instance.get("/Report/DashboardReport");

    return response;
  } catch (error) {
    return false;
  }
};

export const activeAndInactiveCourseAPI = async (active, id) => {
  try {
    const response = await instance.put("/Course/ActiveAndDeactiveCourse", {
      active,
      id,
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const deleteCourseAPI = async (active, id) => {
  try {
    const response = await instance.delete("/Course/DeleteCourse", {
      data: {
        active: !active,
        id,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const addReply = async (data) => {
  try {
    const result = await instance.post("/Course/AddReplyCourseComment", data);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getComment = async (
  search,
  currentPage,
  rowsPerPage,
  accept,
  sort,
  role
) => {
  try {
    const queryParams = [];
    if (role) queryParams.push(`roleId=${role}`);
    if (search) queryParams.push(`Query=${search}`);
    if (currentPage) queryParams.push(`PageNumber=${currentPage}`);
    if (rowsPerPage) queryParams.push(`RowsOfPage=${rowsPerPage}`);
    if (sort) queryParams.push(`SortingCol=${sort}`);
    // if (sortType) queryParams.push(`SortType=${sortType}`);
    if (accept === false || accept === true)
      queryParams.push(`Accept=${accept}`);

    const url = `/Course/CommentManagment?${queryParams.join("&")}`;
    const result = await instance.get(url);
    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const accComment = async (id) => {
  try {
    const result = await instance.post(
      `/Course/AcceptCourseComment?CommentCourseId=${id}`
    );
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const decComment = async (id) => {
  try {
    const result = await instance.post(
      `/Course/RejectCourseComment?CommentCourseId=${id}`
    );
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRepComnt = async (crsId, cmntId) => {
  try {
    const result = await instance.get(
      `/Course/GetCourseReplyCommnets/${crsId}/${cmntId}`
    );

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const delComment = async (id) => {
  try {
    const result = await instance.delete(
      `/Course/DeleteCourseComment?CourseCommandId=${id}`
    );
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPayment = async (data) => {
  try {
    const result = await instance.get(`/CoursePayment/ListOfWhoIsPay?CourseId=${data}`);
    return result;
  } catch (error) {
    console.log(error);
    // return [];
  }
};

export const delCourse = async (data) => {
  try {
    const result = await instance.delete("/Course/DeleteCourse", {data});
    // console.log("form",form);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};


export const getCoursesList = async (search, page, sort) => {
  try {
    const queryParams = [];

    if (search) queryParams.push(`Query=${search}`);
    if (sort) queryParams.push(`SortingCol=${sort}`);
    if (page) queryParams.push(`PageNumber=${page}`);

    const url = `/Course/CourseList?RowsOfPage=10&${queryParams.join("&")}`;
    const result = await instance.get(url);
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getStatictic = async (id) => {
  try {
    const result = await instance.get(`/Course/CourseList?RowsOfPage=1000`);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const ActiveOrDeactive = async (data) => {
  try {
    const result = await instance.put("/Course/ActiveAndDeactiveCourse", data);
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllRes = async () => {
  try {
    const result = await instance.get("/CourseReserve");
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const activeInactiveNewsAPI = async (data) => {
  try {
    const response = await instance.put("/News/ActiveDeactiveNews", data);

    return response;
  } catch (error) {
    return false;
  }
};

export const AddTech = async (id, techId) => {
  try{
   console.log(techId)
   const response = await instance.post(`/Course/AddCourseTechnology?courseId=${id}`,   
       [{
       techId: techId
     }])
   return response

  } catch{
   return []
  }
}

export const ChangeStatusCourse = async (data) => {
  try{
   const response = await instance.put(`/Course/UpdateCourseStatus`, data)
   return response

  } catch{
   return []
  }
}

export const DeleteGroup = async (id) => {
  try{
     console.log(id)
   const response = await instance.delete(`/CourseGroup`, id)
   return response

  } catch(error){
     if(error.response.data.ErrorMessage){
        toast.error(error.response.data.ErrorMessage)
     }
     else{
        toast.error(' مشکلی پیش آمده است ')
    }
  }
}


export const EditGroup = async (data) => {
   try{
    const response = await instance.put(`/CourseGroup`, data)
    return response

   } catch(error){
      if(error.response.data.ErrorMessage){
         toast.error(error.response.data.ErrorMessage)
      }
      else{
         toast.error(' مشکلی پیش آمده است ')
     }
   }
}

export const AddGroup = async (data) => {
  try{
   const response = await instance.post(`/CourseGroup`, data)
   return response

  } catch(error){
     if(error.response.data.ErrorMessage){
        toast.error(error.response.data.ErrorMessage)
     }
     else{
        toast.error(' مشکلی پیش آمده است ')
    }
  }
}

export const AddRole = async (roleId, id, status) => {
  try{
   
   const response = await instance.post(`/User/AddUserAccess?Enable=${status}`, {
       roleId: roleId,
       userId: id
     })

   return response

  } catch(error){
   if(error.response.data.ErrorMessage){
      toast.error(error.response.data.ErrorMessage + '  ' + error.response.data.StatusCode)
   }
   else{
      toast.error(' مشکلی پیش آمده است ')
  }
}
}