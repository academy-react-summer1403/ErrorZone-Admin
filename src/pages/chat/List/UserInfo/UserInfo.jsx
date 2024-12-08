import React from "react";
import "./userInfo.scss";
import { Edit, MoreVertical, Phone } from "react-feather";
import avatar from "../../../../assets/images/userStatic/avatar-s-5.jpg";
import Avatar from "@components/avatar";
import { useUserStore } from "../../../../lib/userStore";

const UserInfo = () => {
  const { currentUser } = useUserStore();


  return (
    <div className="userInfo">
      <div className="user">
          <Avatar size="lg" img={currentUser?.avatar ? currentUser?.avatar : avatar} status="online"/>


        {/* <Avatar size="lg" img={avatar} status='offline' />       */}
        <div>{currentUser?.username}</div>
      </div>
      <div className="icons">
        <Edit size={16} />
        <Phone size={16} />
        <MoreVertical size={16} />
      </div>
    </div>
  );
};

export default UserInfo;
