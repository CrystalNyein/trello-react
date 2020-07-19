import React, { useEffect, useState } from "react";
import "./Card.css";
import CardModal from "./CardModal";
import CardMenuModal from "./CardMenuModal";
import { getInitName } from "../utils";

const Card = ({ card, listid, listTitle }) => {
  const [Card, setCard] = useState(card);
  const [cardClick, setCardClick] = useState({});
  const [cardMenuClick, setCardMenuClick] = useState({});
  const [pos, setPos] = useState([]);
  useEffect(() => {
    Card.listId = listid;
    Card.listTitle = listTitle;
  }, [listTitle]);
  useEffect(() => {
    setCard(card);
  }, [card]);

  const editCard = (e) => {
    e.stopPropagation();
    setPos(e.target.parentNode.getBoundingClientRect());
    setCardMenuClick(Card);
  };
  const openModal = () => {
    setCardClick(Card);
  };

  return Card.status === 1 ? (
    <React.Fragment>
      <div className="ownCard" onClick={openModal}>
        {Card.labels &&
          Card.labels.map((label) => (
            <hr style={{ backgroundColor: label.color }} key={label.id}></hr>
          ))}
        <span className="edit-card" onClick={editCard}></span>
        <h4>{Card.title}</h4>
        <div className="info">
        <div className="icon">
          {Card.description && <i className="fas fa-align-justify"></i>}
          {Card.checklists && Card.checklists.length !== 0 && (
            <a>
              <i className="far fa-check-square"></i>
              {Card.checklists.length}
            </a>
          )}
          </div>
          {Card.members && (
            <div className="member">
              {Card.members.map((member, index) => (
                <div className="avatar" key={index}>
                  {getInitName(member.name)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <CardModal
        card={cardClick}
        setCard={setCard}
        setCardClick={setCardClick}
      />
      <CardMenuModal
        card={cardMenuClick}
        setCard={setCard}
        setCardMenuClick={setCardMenuClick}
        pos={pos}
      />
    </React.Fragment>
  ) : null;
};

export default Card;
