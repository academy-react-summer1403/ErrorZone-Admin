// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "../@core/components/StatsHorizontal";
import BreadCrumbs from "../@core/components/breadcrumbs";

// ** Icons Imports
import { User, UserCheck, UserPlus, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import UsersListTable from "../@core/components/users/Table";
import useQueryGet from "../customHook/useQueryGet";
import { useQueryClient } from "@tanstack/react-query";
import { getUserListsAPI } from "../core/services/Paper";

const Users = () => {
  const [allUsers, setAllUsers] = useState();
  const [userLists, setUserLists] = useState();
  const [students, setStudents] = useState();
  const [teachers, setTeachers] = useState();
  const [admins, setAdmins] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [rowsOfPage, setRowsOfPage] = useState(10);
  const [query, setQuery] = useState();
  const [sortingCol, setSortingCol] = useState("DESC");
  const [sortType, setSortType] = useState();
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "انتخاب نقش",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "انتخاب وضعیت",
  });

  const queryClient = useQueryClient() 

 // const { data:fetchUserLists } = useQueryGet(["fetchUserLists"] , `/User/UserMannage?${currentPage ? `PageNumber=${currentPage}` : ""}&${rowsOfPage ? `RowsOfPage=${rowsOfPage}` : "" }&${sortingCol ? `SortingCol=${sortingCol}` : ""}&${sortType ? `SortType=${sortType}` : ""}&${query ? `Query=${query}` : ""}&${currentStatus.value  ? `IsActiveUser=true` : ""}&${currentStatus.value ? `IsActiveUser=false` : ""}&${currentRole ? `roleId=${currentRole}` : ""}`)
  
 const fetchUserLists = async (roleId, setData) => {
  try {
    const getUserLists = await getUserListsAPI(
      1,
      rowsOfPage,
      "desc",
      undefined,
      undefined,
      undefined,
      undefined,
      roleId
    );

    setData(getUserLists);
  } catch (error) {
    toast.error("مشکلی در دریافت کاربران به وجود آمد !");
  }
};

useEffect(() => {
  fetchUserLists(undefined, setUserLists);
  fetchUserLists(undefined, setAllUsers);
  fetchUserLists(5, setStudents);
  fetchUserLists(2, setTeachers);
  fetchUserLists(1, setAdmins);
}, []);

useEffect(() => {
  const fetchUserLists = async () => {
    try {
      const getUserLists = await getUserListsAPI(
        currentPage,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
        currentStatus.value === true ? true : undefined,
        currentStatus.value === false ? true : undefined,
        currentRole.value || undefined
      );

      setUserLists(getUserLists);
    } catch (error) {
      toast.error("مشکلی در دریافت کاربران به وجود آمد !");
    }
  };

  fetchUserLists();
}, [
  rowsOfPage,
  currentPage,
  sortingCol,
  sortType,
  query,
  currentRole,
  currentStatus,
]);

  return (
    <div className="app-user-list">
      <BreadCrumbs
        title="لیست کاربران"
        data={[
          { title: "مدیریت کاربران", link: "/users" },
          { title: "لیست کاربران" },
        ]}
      />
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="همه کاربران"
            icon={<User size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{allUsers?.totalCount || 0}</h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="دانشجویان"
            icon={<UserPlus size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{students?.totalCount || 0}</h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="استادان"
            icon={<UserCheck size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{teachers?.totalCount || 0}</h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="مدیران"
            icon={<UserX size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{admins?.totalCount || 0}</h3>
            }
          />
        </Col>
      </Row>
      <UsersListTable
        queryClient={queryClient}
        users={userLists}
        rowsOfPage={rowsOfPage}
        currentPage={currentPage}
        query={query}
        currentRole={currentRole}
        currentStatus={currentStatus}
        setRowsOfPage={setRowsOfPage}
        setCurrentPage={setCurrentPage}
        setSortingCol={setSortingCol}
        setSortType={setSortType}
        setQuery={setQuery}
        setCurrentRole={setCurrentRole}
        setCurrentStatus={setCurrentStatus}
      />
    </div>
  );
};

export default Users;