import React, { useEffect, useRef, useState } from "react";
import "./chats.scss";
import Avatar from "@components/avatar";
import { Image, Info, Mic, Phone, Send, Smile, Video } from "react-feather";
import {
  Form,
  Label,
  Input,
  Button,
  InputGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupText,
  UncontrolledDropdown,
} from "reactstrap";
import EmojiPicker from "emoji-picker-react";
import classnames from "classnames";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
import { useUserStore } from "../../../lib/userStore";
const Chats = () => {
  const [chat, setChat] = useState();
  const [text, setText] = useState("");

  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userChats", id);
        const userChatSnapShot = await getDoc(userChatsRef);

        if (userChatSnapShot.exists()) {
          const userChatsData = userChatSnapShot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chats">
      <div className="top">
        <div className="user">
          <Avatar
            size="lg"
            img={user?.avatar ? user?.avatar : undefined}
          />
          <div className="texts">
            <span>{user?.username ? user?.username : "User"}</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <Phone size={18} />
          <Video size={18} />
          <Info size={18} />
        </div>
      </div>

      <div className="center">
        {chat?.messages?.map((message, index) => (
          <div
            className={
              message.senderId === currentUser.id ? "message own" : "message"
            }
            key={index}
          >
            <div className="texts">
              <p>{message.text}</p>
              {/* <span>1 min ago</span> */}
            </div>
          </div>
        ))}

        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <Form className="chat-app-form" onSubmit={handleSend}>
          <InputGroup className="input-group-merge me-1 form-send-message">
            <InputGroupText >
              <Mic className="cursor-pointer" size={14} />
            </InputGroupText>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={isCurrentUserBlocked || isReceiverBlocked ? "You cannot send a message" :"Type your message"}
              disabled={isCurrentUserBlocked || isReceiverBlocked}
            />
            <InputGroupText>
              <Label className="attachment-icon mb-0" for="attach-doc">
                <Image className="cursor-pointer text-secondary" size={14} />
                <input type="file" id="attach-doc" hidden />
              </Label>
            </InputGroupText>
          </InputGroup>
          {isCurrentUserBlocked || isReceiverBlocked ? (
            <Button className="send" color="secondary" disabled>
              <Send size={14} className="d-lg-none" />
              <span className="d-none d-lg-block">Send</span>
            </Button>
          ) : (
            <Button className="send" color="primary">
              <Send size={14} className="d-lg-none" />
              <span className="d-none d-lg-block">Send</span>
            </Button>
          )}
        </Form>
        <div className="emoji">
          <Smile size={18} onClick={() => setOpen((prev) => !prev)} />
          <div className="picker" ref={pickerRef}>
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
