import React, { useState, useEffect } from "react";
import "./NavTwo.css";
import Axios from "axios";
import { getInitName } from "../utils";

const NavTwo = () => {
  const [members, setmembers] = useState([]);
  const fetchMembers = async () => {
    const res = await Axios.get(process.env.REACT_APP_END_POINT + "/account");
    setmembers(res.data);
  };
  useEffect(() => {
    fetchMembers();
  }, []);
  return (
    <div className="nav2">
      <div className="nav-flex">
        <h2>FE - Common</h2>
        <button className="link">
          <i className="far fa-star"></i>
        </button>
        <div className="border-left border-dark"></div>
        <p className="px-2">Private Team</p>
        <div className="border-left border-dark"></div>
        <button className="link">
          <i className="fas fa-user-friends"></i>&nbsp; Team Visible
        </button>
        <div className="border-left border-dark"></div>
        {members &&
          members.slice(0,5).map((member, index) => (
            <button className="avatar" key={index}>
              {getInitName(member.name)}
            </button>
          ))}
          <button className="avatar"> +{members.length-5}</button>
        <button className="link">Invite</button>
      </div>
      <div className="nav-flex">
        <button className="link">
          <i className="fas fa-concierge-bell"></i>&nbsp; Butler (2 Tips)
        </button>
        <button className="link">
          <i className="fas fa-ellipsis-h"></i>&nbsp; Show Menu
        </button>
      </div>
    </div>
  );
};

export default NavTwo;
