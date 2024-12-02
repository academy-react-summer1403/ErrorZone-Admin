import React, { useEffect, useRef, useState } from "react";
import "./chatList.scss";
import {
  CardText,
  InputGroup,
  InputGroupText,
  Badge,
  Input,
  Button,
  Label,
} from "reactstrap";
import { MessageCircle, MinusCircle, PlusCircle, Search } from "react-feather";
import Avatar from "@components/avatar";
import avatar from "../../../../assets/images/userStatic/avatar-s-6.jpg";
import { useUserStore } from "../../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import AddUser from "./AddUser/AddUser";
import { useChatStore } from "../../../../lib/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  const [addMode, setAddMode] = useState(false);

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unsub();
    };
  }, [currentUser.id]);



  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userChats", currentUser.id);

    try {
      changeChat(chat.chatId, chat.user);
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <InputGroup className="input-group-merge ms-1 w-100 round">
            <InputGroupText className="round">
              <Search className="text-muted" size={14} />
            </InputGroupText>
            <Input
              // value={query}
              className="round"
              placeholder="Search or start a new chat"
              // onChange={handleFilter}
              onChange={(e) => setInput(e.target.value)}
            />
          </InputGroup>
        </div>

          {addMode ? (
            <MinusCircle
              size={30}
              className="add"
              onClick={() => setAddMode((prev) => !prev)}
            />
          ) : (
            <PlusCircle
              size={30}
              className="add"
              onClick={() => setAddMode((prev) => !prev)}
            />
          )}

      </div>

      {filteredChats.map((chat, index) => (
        <div className="item" key={index} onClick={() => handleSelect(chat)}>
          <Avatar
            size="lg"
            img={
              chat.user.blocked.includes(currentUser.id)
                ? undefined
                : chat.user.avatar || avatar
            }
          />

          <div className="texts">
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </span>
            <p>{chat.lastMessage}</p>
          </div>
          {chat?.isSeen ? null : (
            <Badge pill color="primary" style={{ marginRight: "auto" }}>
              <MessageCircle size={12} />
            </Badge>
          )}
        </div>
      ))}
      {addMode && <AddUser setAddMode={setAddMode}/>}
    </div>
  );
};

export default ChatList;
