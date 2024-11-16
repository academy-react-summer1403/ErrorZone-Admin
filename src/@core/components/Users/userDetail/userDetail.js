// ** React Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** User View Components
import UserTabs from "./Tabs";
import UserInfoCard from "./UserInfoCard";

// ** api


// ** Styles
import "@styles/react/apps/app-users.scss";
import { useDispatch } from "react-redux";
import useQueryGet from "../../../../customHook/useQueryGet";


const UserDetail = () => {
  // ** Store Vars
  const store = {
    fullName: "محسن مرتضی زاده",
    email: "mohsen@gmail.com",
    status: "فعال",
    role: "ادمین",
    nationalCode: "2354156987",
    contact: "09112345685",
  };

  const [active, setActive] = useState("1");
  //const [userDetails, setUserDetails] = useState([]);
  const [reftch, setReftch] = useState(true);
  const [show, setShow] = useState(false);
const [modalShow, setModalShow] = useState(false);
const [coursGroup, setCoursGroup] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };


   const { data:userDetails } = useQueryGet(["userDetails"] , `/User/UserDetails/${id}`)

//   const getProfile = async (id) => {
//     try {
//       const users = await getUserDetails(id);

//       setUserDetails(users);
//       dispatch(handleUsersDetails(users));
//     } catch (error) {
//       throw new Error("ERROR: ", error);
//     }
//   };

//   const submitUserUpdate = async (values) => {
//     const userInfo = {
//       id: userDetails.id,
//       fName: values.firstName,
//       lName: values.lastName,
//       userName: values.username,
//       gmail: values.email,
//       active: values.status,
//       nationalCode: values.nationalCode,
//       phoneNumber: values.contact,
//       isDelete: userDetails.isDelete ?? false,
//       isTecher: userDetails.isTecher ?? false,
//       isStudent: userDetails.isStudent ?? false,
//       recoveryEmail: userDetails.recoveryEmail ?? "",
//       twoStepAuth: userDetails.twoStepAuth ?? false,
//       userAbout: userDetails.userAbout ?? "",
//       currentPictureAddress: userDetails.currentPictureAddress ?? "",
//       linkdinProfile: userDetails.linkdinProfile ?? "",
//       telegramLink: userDetails.telegramLink ?? "",
//       receiveMessageEvent: userDetails.receiveMessageEvent ?? "",
//       homeAdderess: userDetails.homeAdderess ?? "",
//       gender: userDetails.gender ?? false,
//       latitude: userDetails.latitude ?? "",
//       longitude: userDetails.longitude ?? "",
//       insertDate: userDetails.insertDate ?? undefined,
//       birthDay: userDetails.birthDay ?? undefined,
//       roles: userDetails.roles ?? [],
//       courses: userDetails.courses ?? [],
//       coursesReseves: userDetails.coursesReseves ?? [],
//       userProfileId: userDetails.userProfileId ?? undefined,
//     };
//     try {
//       const res= await updateUser(userInfo);
//       console.log("respon",res);
//       setReftch((old) => !old);
//       setShow(false);
//     } catch (error) {
//       throw new Error("ERROR: ", error);
//     }
//   };


//   useEffect(() => {
//     getProfile(id);
//   }, [id, reftch]);

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
           <UserInfoCard
            userDetails={userDetails}
            setReftch={setReftch}
           // submitUserUpdate={submitUserUpdate}
            show={show}
            setShow={setShow}
            reftch={reftch}
          /> 
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs
            active={active}
            toggleTab={toggleTab}
            userDetails={userDetails}
          />
        </Col>
      </Row>
    </div>
  );
};
export default UserDetail;