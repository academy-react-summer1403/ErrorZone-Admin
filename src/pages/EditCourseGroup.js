// ** React Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** Custom Components


// ** Core Imports

import CourseGroupForm from "../@core/components/editCourseGroup/EditCourseGroup";
import { getCourseGroupDetailsAPI } from "../core/services/Paper";

const EditCourseGroupPage = () => {
  // ** States
  const [courseGroup, setCourseGroup] = useState();

  // ** Hooks
  const { id } = useParams();

  useEffect(() => {
    const fetchCourseGroup = async () => {
      try {
        const getCourseGroup = await getCourseGroupDetailsAPI(id);

        setCourseGroup(getCourseGroup.courseGroupDto);
      } catch (error) {
        return false;
      }
    };

    fetchCourseGroup();
  }, []);

  return <CourseGroupForm group={courseGroup} />;
};

export default EditCourseGroupPage;