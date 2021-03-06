import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./ListModal.css";
import Axios from "axios";
import { useDocumentEvent } from "../useDocumentEvent";

const ListModal = ({ list, setListEditClick, pos, archiveList }) => {
  const ref = useRef(null);
  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModal();
      }
    },
    [ref]
  );
  useDocumentEvent({ type: "mousedown", callback: handleClickOutside });
  const closeModal = () => {
    setListEditClick({});
  };
  const archive = () => {
    Axios.put(
      process.env.REACT_APP_END_POINT + "/list/" + list.id + "/status/2"
    ).then((res) => {
      archiveList(list.id);
    });
    closeModal();
  };
  return list.id ? (
    <div
      id="listMenu"
      ref={ref}
      className="s-modal list-modal"
      style={{
        left:
          (window.innerWidth - pos.right < 300
            ? window.innerWidth - 304
            : pos.left) + "px",
      }}
    >
      <div className="s-modal-content rounded">
        <span className="s-close" onClick={closeModal}>
          &times;
        </span>
        <h3>List Actions</h3>
        <hr />
        <p className="link">Add Card...</p>
        <p className="link">Copy List...</p>
        <p className="link">Move List...</p>
        <p className="link">Watch</p>
        <hr />
        <p className="link">Move All Cards in This List...</p>
        <p className="link">Archive All Cards in This Lists...</p>
        <hr />
        <p className="link" onClick={archive}>
          Archive This List
        </p>
      </div>
    </div>
  ) : null;
};

export default ListModal;
