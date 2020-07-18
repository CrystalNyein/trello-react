import React from "react";
import './MemberModal.css';

const MemberModal = () => {
    const closeMemberModal = (e) => {
        e.target.parentNode.parentNode.style.display="none";
    }
  return (
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
  );
};

export default MemberModal;
