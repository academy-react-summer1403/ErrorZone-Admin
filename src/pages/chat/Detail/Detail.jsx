import React from "react";
import "./detail.scss";
import Avatar from "@components/avatar";
import { ArrowDown, ArrowUp } from "react-feather";
import { Button } from 'reactstrap'

const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <Avatar
          color="light-primary"
          size="xl"
          content="Benyamin HosseinZadeh"
          status="offline"
          initials
        />
        <h3>Jane Doe</h3>
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
        <Button block outline color='danger'>
            Block User
          </Button>
      </div>
    </div>
  );
};

export default Detail;
