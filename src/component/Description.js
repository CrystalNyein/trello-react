import React, { useState, useEffect } from "react";
import "./Description.css";
import Axios from "axios";

const Description = ({ desc, changeDescription }) => {
  const [Desc, setDesc] = useState(desc ? desc : "");
  const [descClick, setDescClick] = useState(false);
  useEffect(() => {
    console.log(Desc);
    setDesc(desc);
  }, [desc]);
  const changeDesc = () => {
    setTimeout(() => {
      const textArea = document.getElementById("desc-textarea");
      textArea.select();
    }, 10);
    setDescClick(true);
  };  
  const saveDesc = () => {
    changeDescription(Desc);
    setDescClick(false);
  };

  const closeDesc = () => {
    setDesc(desc);
    setDescClick(false);
  };
  return (
    <div className="desc-fill">
      {descClick ? (
        <div className="desc-func data">
          <textarea
            id="desc-textarea"
            value={Desc}
            onChange={(e) => setDesc(e.target.value)}
            autoFocus
          ></textarea>
          <div className="desc-save">
            <span onClick={saveDesc}>Save</span>
          </div>
          <div className="desc-cross">
            <i className="fas fa-times" onClick={closeDesc}></i>
          </div>
        </div>
      ) : (
        <div className="desc-p data">
          {Desc.length > 0 ? (
            <p onClick={changeDesc}>{Desc}</p>
          ) : (
            <textarea
              placeholder="Add a more detailed description"
              onClick={changeDesc}
            ></textarea>
          )}
        </div>
      )}
    </div>
  );
};

export default Description;
