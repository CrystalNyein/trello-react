import React, { useState, useEffect } from "react";
import "./AddList.css";
import Axios from "axios";

const AddList = ({ addList, position }) => {
  const [listTitle, setlistTitle] = useState("");
  const [addListClick, setAddListClick] = useState(false);

  const addListDisplay = () => {
    setAddListClick(true);
  };
  const closeAddList = (event) => {
    event.preventDefault();
    setAddListClick(false);
  };
  const submitListTitle = (e) => {
    e.preventDefault();
    if (listTitle !== "") {
      Axios.post(process.env.REACT_APP_END_POINT + "/list", {
        title: listTitle,
        position: position + 1,
      }).then((res) => {
        addList(res.data);
      });
    }
    setlistTitle("");
    setAddListClick(false);
  };

  return (
    <div className="add-list rounded">
      {addListClick ? (
        <form className="list-fill" onSubmit={submitListTitle}>
          <input
            type="text"
            className="rounded"
            value={listTitle}
            onChange={(e) => setlistTitle(e.target.value)}
            placeholder="Enter list title..."
          ></input>
          <button type="submit" className="btn add text-light">
            Add List
          </button>
          <button className="btn close" onClick={closeAddList}>
            <i className="fas fa-times"></i>
          </button>
        </form>
      ) : (
        <p onClick={addListDisplay} className="rounded">
          <i className="fa fa-plus"></i>&nbsp;&nbsp; Add another list
        </p>
      )}
    </div>
  );
};

export default AddList;
