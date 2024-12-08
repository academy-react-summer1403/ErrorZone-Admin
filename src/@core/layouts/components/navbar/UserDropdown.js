// ** React Imports
import { useEffect, useState } from "react";
// ** Custom Components
import { Link } from "react-router-dom";
import Avatar from "@components/avatar";
import toast from "react-hot-toast";
// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
  Archive,
  Code,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { getProfileInfoAPI } from "../../../../core/services/Paper";
import { onUserChange } from "../../../../redux/user";
import { useDispatch } from "react-redux";
import { removeItem } from "../../../../core/services/common/storage.services";

const UserDropdown = () => {
  const [profileInfo, setProfileInfo] = useState({
    fName: "ادمین",
    lName: "",
    currentPictureAddress: defaultAvatar,
  });

  const dispatch = useDispatch()

  const token = localStorage.getItem("Token");
  const userId = localStorage.getItem("userId");

  const handleLogout = async () => {
    removeItem("Token");
    removeItem("token");    
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const getProfileInfo = await getProfileInfoAPI();

        setProfileInfo(getProfileInfo);
        dispatch(onUserChange(getProfileInfo));
      } catch (error) {
        toast.error("مشکلی در دریافت اطلاعات شما به وجود آمد !");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {profileInfo?.fName + " " + profileInfo?.lName}
          </span>
          <span className="user-status">ادمین</span>
        </div>
        <Avatar
          img={
            profileInfo?.currentPictureAddress == "Not-set"
              ? defaultAvatar
              : profileInfo?.currentPictureAddress
          }
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
      <DropdownItem tag="a" href={`http://localhost:5173/${token}`}>
          <Archive size={14} className="me-75" />
          <span className="align-middle">سایت اصلی</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to={`/users/${userId}`}>
          <User size={14} className="me-75" />
          <span className="align-middle">حساب کاربری من</span>
        </DropdownItem>
        <DropdownItem tag={Link} to={`/user/edit/${userId}`}>
          <Settings size={14} className="me-75" />
          <span className="align-middle">ویرایش پروفایل</span>
        </DropdownItem>
        <DropdownItem tag={Link} to={`/mycourses`}>
          <Code size={14} className="me-75" />
          <span className="align-middle">دوره های من</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/login" onClick={handleLogout}>
          <Power size={14} className="me-75" />
          <span className="align-middle">خروح از سایت</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
