// ** React Imports
import { Link } from "react-router-dom";

// ** Utils


// ** Image Imports
import blankThumbnail from "../../../assets/images/portrait/small/blank-thumbnail.jpg";
import { convertDateToPersian } from "../../../../utility/hooks/date-helper.utils";

export const USER_FAVORITE_COURSES_COLUMNS = [
  {
    name: "نام دوره",
    reorder: true,
    width: "200px",
    cell: (row) => {
      return (
        <Link
          to={`/courses/${row.courseId}`}
          className="d-flex align-items-center"
        >
          <img
            src={
              !row?.tumbImageAddress ||
              row?.tumbImageAddress === "undefined" ||
              row?.tumbImageAddress === "<string>"
                ? blankThumbnail
                : row?.tumbImageAddress
            }
            className="student-course-reserve-picture"
            style={{width: "35px" , height: "35px" , borderRadius: "50px"}}
          />
          <div className="text-truncate ms-1">
            <span
              to={`/courses/${row.courseId}`}
              className="course-reserve-student-name"
            >
              {row.title}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    name: "آخرین بروزرسانی",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      const formattedLastUpdate = convertDateToPersian(row.lastUpdate);

      return (
        <div>
          <div className="user-info text-truncate ms-1">
            <span className="course-reserve-student-name">
              {formattedLastUpdate}
            </span>
          </div>
        </div>
      );
    },
  },
];
