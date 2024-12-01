import React from "react";
import "./detail.scss";
import Avatar from "@components/avatar";
import { ArrowDown, ArrowUp } from "react-feather";
import { Button } from "reactstrap";
import { useChatStore } from "../../../lib/chatStore";
import { useUserStore } from "../../../lib/userStore";
import avatar from "../../../assets/images/userStatic/avatar-s-6.jpg";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <Avatar size="xl" img={user?.avatar || undefined} />
        <h3>{user?.username || "User"}</h3>
        <p>Lorem ipsum, dolor sit amet,</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>chat setting</span>
            <ArrowUp size={20} cursor="pointer" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>privacy & help</span>
            <ArrowUp size={20} cursor="pointer" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>chat setting</span>
            <ArrowUp size={20} cursor="pointer" />
          </div>
        </div>
        {isReceiverBlocked ? (
          <Button block color="danger" onClick={handleBlock}>
            {isCurrentUserBlocked
              ? "You are Blocked !"
              : isReceiverBlocked
              ? "UnBlocke User"
              : "Block User"}
          </Button>
        ) : (
          <Button block outline color="danger" onClick={handleBlock}>
            {isCurrentUserBlocked
              ? "You are Blocked !"
              : isReceiverBlocked
              ? "UnBlocke User"
              : "Block User"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Detail;
