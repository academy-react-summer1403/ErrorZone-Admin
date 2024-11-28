import React, { useEffect, useState } from "react";
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
import { MinusCircle, PlusCircle, Search } from "react-feather";
import Avatar from "@components/avatar";
import { useUserStore } from "../../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import AddUser from "./AddUser/AddUser";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
      const items = res.data().chats;

      const promises = items.map(async(item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(docRef);

        const user = userDocSnap.data();

        return {...item, user }
      } )

      const chatData = await Promise.all(promises);

      setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));

    });
    return () => {
      unsub();
    };
  }, [currentUser.id]);

  console.log(chats);

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

      {chats.map((chat,index) => (
        <div className="item" key={index}>
          <Avatar
            color="light-primary"
            size="lg"
            content="Benyamin HosseinZadeh"
            status="offline"
            initials
          />
          {/* <Avatar size="lg" img={avatar} status='offline' />       */}

          <div className="texts">
            <span>Jane Doe</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
      
    </div>
  );
};

export default ChatList;
