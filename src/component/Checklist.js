import React from "react";
import './Checklist.css';

const Checklist = ({ checklist }) => {
  return (
    <div className="check">
      <input
        type="checkbox"
        className="checkbox"
        {...(checklist.checked ? "checked" : "")}
      />
      <textarea
        className="item"
        onfocus="editCheckItem(this)"
        spellcheck="false"
      >
        {checklist.item}
      </textarea>
      <div className="check-func data">
        <div className="check-save" onclick="saveCheckFunc(this)">
          Save
        </div>
        <div
          className="check-cross"
          onclick="closeCheckFunc(this,'${checklist.item}')"
        >
          <i className="fas fa-times"></i>
        </div>
      </div>
      <span className="checkmark"></span>
    </div>
  );
};

export default Checklist;
