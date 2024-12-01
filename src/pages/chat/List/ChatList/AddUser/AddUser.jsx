import React, { useState } from "react";
import "./addUser.scss";
import { Button, InputGroup, Input } from "reactstrap";
import { Search } from "react-feather";
import Avatar from "@components/avatar";
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import avatar from "../../../../../assets/images/userStatic/avatar-s-5.jpg";
import { useUserStore } from "../../../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);

  const {currentUser} = useUserStore()

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
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async() => {

    const chatRef = collection(db,"chats");
    const userChatsRef = collection(db,"userChats");

    try {
      const newChatRef = doc(chatRef)
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages:[]
      })

      await updateDoc(doc(userChatsRef, user.id),{
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        })
      })

      await updateDoc(doc(userChatsRef, currentUser.id),{
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        })
      })


    } catch (error) {
      console.log(error);
    }
  }

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
          <Button 
          color="primary" 
          size="sm" 
          onClick={handleAdd}
          >
            Add User !
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
