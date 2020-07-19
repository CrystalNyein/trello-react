import React, { useState, useEffect } from "react";
import "./Aside.css";
import MemberModal from "./MemberModal";
import LabelModal from "./LabelModal";

const Aside = ({ card }) => {
  const [memberClick, setMemberClick] = useState({});

  const openMemberModal = () => {
    setMemberClick(card);
  };
  const openLabelModal = () => {
    const labelModal = document.getElementById("labelModal");
    labelModal.style.display = "block";
  };
  return (
    <React.Fragment>
      <div className="aside">
        <div className="add-to-card">
          <h5>Add to card</h5>
          <a href="#" onClick={openMemberModal}>
            <i className="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Members
          </a>
          <a href="#" onClick={openLabelModal}>
            <i className="fas fa-tag"></i>&nbsp;&nbsp;&nbsp;Labels
          </a>
          <a href="#">
            <i className="fas fa-tasks"></i>&nbsp;&nbsp;&nbsp;Checklist
          </a>
          <a href="#">
            <i className="far fa-clock"></i>&nbsp;&nbsp;&nbsp;Due Date
          </a>
          <a href="#">
            <i className="fas fa-paperclip"></i>&nbsp;&nbsp;&nbsp;Attachment
          </a>
          <a href="#">
            <i className="fas fa-image"></i>&nbsp;&nbsp;&nbsp;Cover
          </a>
        </div>
        <div className="power-ups">
          <h5>Power-ups</h5>
          <a href="#">
            <i className="fas fa-concierge-bell"></i>
            &nbsp;&nbsp;&nbsp;Butler Tips (2)
          </a>
          <a href="#" style={{ textAlign: "center" }}>
            Get more power-ups
          </a>
        </div>
        <div className="actions">
          <h5>Actions</h5>
          <a href="#">
            <i className="fas fa-arrow-right"></i>
            &nbsp;&nbsp;&nbsp;Move
          </a>
          <a href="#">
            <i className="far fa-copy"></i>
            &nbsp;&nbsp;&nbsp;Copy
          </a>
          <a href="#">
            <i className="fas fa-file-invoice"></i>
            &nbsp;&nbsp;&nbsp; Make Template
          </a>
          <a href="#">
            <i className="far fa-eye"></i>
            &nbsp;&nbsp;&nbsp;Watch
          </a>
          <hr />
          <a href="#">
            <i className="far fa-file-archive"></i>
            &nbsp;&nbsp;&nbsp; File Archive
          </a>
          <a href="#">
            <i className="fas fa-share"></i>
            &nbsp;&nbsp;&nbsp;Share
          </a>
        </div>
      </div>
      <MemberModal card={memberClick} setMemberClick={setMemberClick} />
      <LabelModal />
    </React.Fragment>
  );
};

export default Aside;
