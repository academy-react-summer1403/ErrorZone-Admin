import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import { Card } from "reactstrap";
import "./chat.scss";
import List from "./List/List";
import Chats from "./Chats/Chats";
import Detail from "./Detail/Detail";
import { useChatStore } from "../../lib/chatStore";
const Chat = () => {
  const { currentUser, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  return (
    <Card>
      <div className="chat-container">
        <List />
        {chatId && <Chats />}
        {chatId && <Detail />}
      </div>
    </Card>
  );
};

export default Chat;
