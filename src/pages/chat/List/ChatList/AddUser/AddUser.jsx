import React, { useState } from "react";
import "./addUser.scss";
import { Button, InputGroup, Input } from "reactstrap";
import { Search } from "react-feather";
import Avatar from "@components/avatar";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import avatar from "../../../../../assets/images/userStatic/avatar-s-5.jpg";

const AddUser = () => {
  const [user, setUser] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
      else{
        setUser(null);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <InputGroup>
          <Input type="text" placeholder="userName" name="username" />
          <Button color="primary" name="username" outline>
            Search !
          </Button>
        </InputGroup>
      </form>

      {user && (
        <div className="user">
          <div className="detail">
            <Avatar
              size="lg"
              img={user.avatar ? user?.avatar : avatar}
              status="offline"
            />
            <span>{user.username}</span>
          </div>
          <Button color="primary" size="sm">
            Add User !
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
