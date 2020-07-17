import React, { useState, useEffect } from "react";
import "./Description.css";
import Axios from "axios";

const Description = ({ desc, changeDescription }) => {
  const [Desc, setDesc] = useState(desc);
  useEffect(() => {
    setDesc(desc);
  }, [desc]);
  const changeDesc = (e) => {
    const p = e.target;
    const textArea = p.nextSibling;
    p.style.display = "none";
    textArea.value = p.innerText;
    setTimeout(() => {
      textArea.focus();
      textArea.select();
      p.parentNode.nextSibling.style.display = "block";
    }, 10);
    textArea.style.display = "block";
  };
  const focusDesc = (e) => {
    e.target.nextSibling.style.display = "block";
  };
  const blurDesc = (e) => {
    if (e.target.value)
      if (e.target.className === "data") {
        closeDesc(e.target.nextSibling.lastChild);
      } else {
        closeDesc(e.target.parentNode.nextSibling.lastChild);
      }
  };
  const saveDesc = (e) => {
      console.log(e.target);
    // const parent = e.target.parentNode;
    // let descfunc;
    // if (e.target === "SPAN") {
    //   descfunc = parent.parentNode;
    // } else {
    //   descfunc = parent;
    // }
    const descFunc = document.getElementsByClassName("desc-func")[0];
    // const textGroup = descfunc.parentNode.firstChild;
    const textarea = document.getElementById("desc-textarea");
    // console.log(textGroup);
    let description = textarea.value;
    document.getElementById("desc-p").style.display = "block";
    textarea.style.display = "none";
    if (description !== "Add a more detailed description") {
      changeDescription(description);
    }
    descFunc.style.display = "none";
  };

  const closeDesc = (e) => {
    let func;
    if (e.target.nodeName === "I") func = e.target.parentNode.parentNode;
    else func = e.target.parentNode;
    const textGroup = func.parentNode.firstChild;
    console.log(func.parentNode.firstChild);
    func.style.display = "none";
    textGroup.lastChild.style.display = "none";
    textGroup.firstChild.style.display = "block";
  };
  return (
    <div className="desc-fill">
      <div className="desc-p data">
        <p id = "desc-p" onClick={changeDesc}>
          {desc.length > 0 ? Desc : "Add a more detailed description"}
        </p>
        <textarea id = "desc-textarea"
          value={Desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>

      <div className="desc-func data">
        <div className="desc-save" >
          <span onClick={saveDesc}>Save</span>
        </div>
        <div className="desc-cross" >
          <i className="fas fa-times" onClick={closeDesc}></i>
        </div>
      </div>
    </div>
  );
};

export default Description;
