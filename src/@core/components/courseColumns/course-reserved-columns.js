// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// Column Imports
import { COURSE_RESERVED_COMMON_COLUMNS } from "./course-reserved-common-columns";

// ** Core Imports


// ** Image Imports
import blankThumbnail from "./../../assets/images/portrait/small/blank-thumbnail.jpg";
import { getUserWithIdAPI } from "../../../core/services/Paper";

export const COURSE_RESERVED_COLUMNS = (redirectUrl) => [
  {
    name: "نام رزرو کننده",
    reorder: true,
    minWidth: "250px",
    cell: (row) => {
      const [user, setUser] = useState();

      useEffect(() => {
        const fetchUser = async () => {
          try {
            const getUser = await getUserWithIdAPI(row.studentId);

            setUser(getUser);
          } catch (error) {
            toast.error("مشکلی در دریافت کاربر به وجود آمد !");
          }
        };

        fetchUser();
      }, []);

      return (
        <Link
          to={`/users/${row.studentId}`}
          className="d-flex align-items-center"
        >
          <img
            src={
              user?.currentPictureAddress !== "Not-set"
                ? user?.currentPictureAddress
                : blankThumbnail
            }
            className="student-course-reserve-picture"
            style={{width: "35px" , height: "35px", borderRadius: "10px"}}
          />
          <div className="user-info text-truncate ms-1">
            <span
              to={`/users/${row.studentId}`}
              className="course-reserve-student-name"
            >
              {row.studentName}
            </span>
          </div>
        </Link>
      );
    },
  },
  ...COURSE_RESERVED_COMMON_COLUMNS(redirectUrl),
];
