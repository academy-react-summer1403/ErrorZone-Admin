// ** React Imports
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { activeAndInactiveCourseAPI } from "../../core/services/Paper";
import useMutationPost from "../../customHook/useMutationPost";

// ** Core Imports


const MySwal = withReactContent(Swal);

export const handleActiveInactiveCourse = async (
  isActive,
  courseId,
  navigate,
  redirectUrl,
  setIsDeleted,
  handleRefrech,
  ChangeHandler,
  refetch,
  
) => {




  MySwal.fire({
    title: isActive
      ? "آیا از غیر فعال دوره مطمئن هستید؟"
      : "آیا از فعال دوره مطمئن هستید ؟",
    text: `آیا از ${
      isActive ? "غیر فعال" : "فعال"
    } کردن دوره اطمینان کامل دارید ؟`,
    icon: "warning",
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-danger ms-1",
    },
    buttonsStyling: false,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: isActive ? "غیر فعال کردن" : "فعال کردن",
    cancelButtonText: "انصراف",
    showLoaderOnConfirm: true,
    async preConfirm() {
      const deleteCourse = await activeAndInactiveCourseAPI (
        !isActive,
        courseId
      );

      //const {mutate:deleteCourse } = useMutationPost()

      if (deleteCourse.success) {

        toast.success(`دوره با موفقیت ${isActive ? "غیر فعال" : "فعال"} شد !`);
       // navigate(redirectUrl);
       refetch
      } else
        toast.error(
          `مشکلی در ${
            isActive ? "غیر فعال کردن" : "فعال کردن"
          } دوره به وجود آمد !`
        );
    },
  });
};