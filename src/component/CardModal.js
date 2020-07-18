import React,{useState,useEffect}  from "react";
import "./CardModal.css";
import Member from "./Member";
import Label from "./Label";
import Description from "./Description";
import Axios from "axios";
import Checklist from "./Checklist";
import Activity from "./Activity";
import Aside from "./Aside";

const CardModal = ({ card, editCardDesc }) => {
  const [Desc, setDesc] = useState(card.description?card.description:"");
  const [cardTitle, setcardTitle] = useState(card.title);
  useEffect(() => {
    setDesc(card.description);
  }, [card.description])
  const closeModal = (e) => {
    e.target.parentNode.parentNode.style.display = "none";
  };
  const changeDesc = (desc) => {
    console.log("changing description");
    Axios.put(
      process.env.REACT_APP_END_POINT +
        "/card/update/" +
        card.listId +
        "/" +
        card.id,
      {
        title: card.title,
        description: desc,
        position: card.position,
        status: card.status,
      }
    ).then((res) => {
      card.description = res.desc;
      editCardDesc(res.data, card.listId);
    });
  };
  const submitTitle = (e) => {
    e.preventDefault();
    console.log(e.target);
  }
  const openCardTitle = (e) => {    
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "inline-block";
  }
  return (
    <div id="cardModal" className="s-modal card-modal">
      <div className="s-modal-content">
        <span className="s-close" onClick={closeModal}>
          &times;
        </span>
        <div className="cardTitle icon">
          <i className="far fa-credit-card"></i>
          <h3 onClick={openCardTitle}>{card.title}</h3>
          <form onSubmit={submitTitle}><input type="text" className="rounded" value={cardTitle} onChange={e => setcardTitle(e.target.value)}></input></form>
        </div>
        <p className="data">
          in list <a href="#">{card.listTitle}</a>
        </p>
        <br />
        {((card.members && card.members.length !== 0) ||
          (card.labels && card.labels.length !== 0)) && (
          <div className="mem-label data">
            {card.members && card.members.length !== 0 && (
              <div className="mem">
                <p>Members</p>
                <div className="members">
                  {card.members.map((mem, index) => (
                    <Member key={index} member={mem} />
                  ))}
                  <div className="memInline">
                    <div className="avatar addMem">
                      <i className="fas fa-plus"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {card.labels && card.labels.length !== 0 && (
              <div className="label">
                <p>Labels</p>
                <div className="labels">
                  {card.labels.map((lab) => (
                    <Label key={lab.id} label={lab} />
                  ))}
                  <div className="labelInline">
                    <div className="lab addLab">
                      <i className="fas fa-plus"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div className=" desc">
          <h3 className="icon">
            <i className="fas fa-server"></i>Description<a href="#">Edit</a>
          </h3>
          <Description
            desc={Desc ?Desc:""}
            changeDescription={changeDesc}
          />
        </div>
        {card.checkList && card.checkList.length !== 0 && (
          <div className="checklist">
            <h3 className="icon">
              <i className="fas fa-tasks"></i>${card.checkList[0].title}
            </h3>
            {card.checkList.map((clist) => (
              <Checklist checklist={clist} />
            ))}
          </div>
        )}
        <Activity />
        <Aside />
        {/*
            <div className=" desc">
                    <h3 className="icon">
                        <i className="fas fa-server"></i>Description<a href="#">Edit</a>
                    </h3>`+
                (card.description?`
                <p className="data">${card.description}</p>`:`
                <textarea id="desc" className="data" onfocus="openDescFunc(this)" placeHolder="Add a more detailed description"></textarea>
                    <div className="desc-func data">
                        <div className="desc-save" onclick="saveDescFunc()">Save</div><div className="desc-cross" onclick="closeDescFunc()"><i className="fas fa-times"></i></div></div>`)+
  `</div>`+getCheckLists(card)+
    `<div className="activity"><div className="title"><h3 className="icon"><i className="fas fa-comment-dots"></i>Activity</h3><div className="detail">Show Details</div></div><div className="comment-line"><img src="assets/Nyein.jpg" alt="Avatar" className="avatar "><div className="comment"><input type="text" placeHolder="Write a comment..." onfocus="writeComment(this)"><div className="func"><div className="func-save"><p onclick="saveComment(this)">Save</p><div className="comment-cross" onclick="closeComment(this)"><i className="fas fa-times"></i></div></div><div className="add-on"><i className="fas fa-paperclip"></i><i className="fas fa-at"></i><i className="far fa-smile-beam"></i><i className="far fa-credit-card"></i></div></div></div></div></div>*/}
      </div>
    </div>
  );
};

export default CardModal;
