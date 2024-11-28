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
const Chats = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  const handleEmoji = (e) => {
    // console.log(e);
    setText((prev) => prev + e.emoji);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });

    return () => {};
  }, []);

  return (
    <div className="chats">
      <div className="top">
        <div className="user">
          <Avatar
            color="light-primary"
            size="lg"
            content="Benyamin HosseinZadeh"
            status="offline"
            initials
          />
          <div className="texts">
            <span>Jane Doe</span>
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
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, totam suscipit! Eveniet quae doloribus, alias soluta
              atque consequuntur iusto quasi sapiente ratione quia provident
              consectetur, voluptate fuga distinctio animi id!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, totam suscipit! Eveniet quae doloribus, alias soluta
              atque consequuntur iusto quasi sapiente ratione quia provident
              consectetur, voluptate fuga distinctio animi id!
            </p>
            <span>1 min ago</span>
          </div>
          <Avatar
            color="light-primary"
            content="Benyamin HosseinZadeh"
            initials
          />
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, totam suscipit! Eveniet quae doloribus, alias soluta
              atque consequuntur iusto quasi sapiente ratione quia provident
              consectetur, voluptate fuga distinctio animi id!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, totam suscipit! Eveniet quae doloribus, alias soluta
              atque consequuntur iusto quasi sapiente ratione quia provident
              consectetur, voluptate fuga distinctio animi id!
            </p>
            <span>1 min ago</span>
          </div>
          <Avatar
            color="light-primary"
            content="Benyamin HosseinZadeh"
            initials
          />
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, totam suscipit! Eveniet quae doloribus, alias soluta
              atque consequuntur iusto quasi sapiente ratione quia provident
              consectetur, voluptate fuga distinctio animi id!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <Form
          className="chat-app-form"
          // onSubmit={(e) => handleSendMsg(e)}
        >
          <InputGroup className="input-group-merge me-1 form-send-message">
            <InputGroupText>
              <Mic className="cursor-pointer" size={14} />
            </InputGroupText>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message or use speech to text"
            />
            <InputGroupText>
              <Label className="attachment-icon mb-0" for="attach-doc">
                <Image className="cursor-pointer text-secondary" size={14} />
                <input type="file" id="attach-doc" hidden />
              </Label>
            </InputGroupText>
          </InputGroup>
          <Button className="send" color="primary">
            <Send size={14} className="d-lg-none" />
            <span className="d-none d-lg-block">Send</span>
          </Button>
        </Form>
        <div className="emoji">
          <Smile size={18} onClick={() => setOpen((prev) => !prev)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
