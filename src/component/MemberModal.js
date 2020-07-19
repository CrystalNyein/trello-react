import React,{useState,useEffect} from "react";
import './MemberModal.css';

const MemberModal = ({card,setMemberClick}) => {
  
    const closeMemberModal = () => {
      setMemberClick({});
    }
  return (card && card.id) ? (
    <div id="memberModal" className="s-modal">
      <div className="mem-content content">
        <span className="close" onClick={closeMemberModal}>
          &times;
        </span>
        <h3>Members</h3>
        <hr />
        <input type="text" placeholder="Search members" />
        <p>Board members</p>
        <div className="members"></div>
      </div>
    </div>
  ):null;
};

export default MemberModal;
