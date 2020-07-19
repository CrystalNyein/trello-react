import React, { useState, useEffect } from "react";
import "./CardModal.css";
import Member from "./Member";
import Label from "./Label";
import Description from "./Description";
import Axios from "axios";
import Checklist from "./Checklist";
import Activity from "./Activity";
import Aside from "./Aside";

const CardModal = ({ card, setCard, setCardClick }) => {
  const [Desc, setDesc] = useState(card.description ? card.description : "");
  const [cardTitle, setcardTitle] = useState(card.title ? card.title : "");
  const [cardTitleClick, setCardTitleClick] = useState(false);
  useEffect(() => {
    setDesc(card.description);
  }, [card.description]);
  useEffect(() => {
    setcardTitle(card.title);
  }, [card.title]);
  useEffect(() => {
    if (card.list) {
      card.listId = card.list.id;
      card.listTitle = card.list.title;
    }
  });
  const closeModal = () => {
    setCardClick({});
  };
  const changeDesc = (desc) => {
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
      setDesc(res.data.description);
      setCard(res.data);
    });
  };
  const submitTitle = (e) => {
    e.preventDefault();    
    if (card.title !== cardTitle)
      Axios.put(
        process.env.REACT_APP_END_POINT +
          "/card/update/" +
          card.listId +
          "/" +
          card.id,
        {
          title: cardTitle,
          description: card.description,
          position: card.position,
          status: card.status,
        }
      ).then((res) => {
        setCard(res.data);
      });
    setCardTitleClick(false);
  };
  const openCardTitle = () => {
    setCardTitleClick(true);
  };
  return card.id ? (
    <div id="cardModal" className="s-modal card-modal">
      <div className="s-modal-content">
        <span className="s-close" onClick={closeModal}>
          &times;
        </span>
        <div className="cardTitle icon">
          <i className="far fa-credit-card"></i>
          {cardTitleClick ? (
            <form onSubmit={submitTitle}>
              <input
                type="text"
                className="rounded"
                value={cardTitle}
                onChange={(e) => setcardTitle(e.target.value)}
                onBlur={submitTitle}
                autoFocus
              />
            </form>
          ) : (
            <h3 onClick={openCardTitle}>{cardTitle}</h3>
          )}
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
          <h4 className="icon">
            <i className="fas fa-server"></i>Description<a href="#">Edit</a>
          </h4>
          <Description desc={Desc ? Desc : ""} changeDescription={changeDesc} />
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
        <Aside card={card}/>
      </div>
    </div>
  ) : null;
};

export default CardModal;
