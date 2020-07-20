import React, { useState } from "react";
import "./List.css";
import Card from "./Card";
import Axios from "axios";
import ListModal from "./ListModal";

const List = ({ list, addCard, editList, archiveList }) => {
  const [cardTitle, setCardTitle] = useState("");
  const [listTitle, setlistTitle] = useState(list.title);
  const [listEditClick, setListEditClick] = useState({});
  const [listTitleClick, setListTitleClick] = useState(false);
  const [addCardClick, setAddCardClick] = useState(false);
  const [pos, setPos] = useState([]);

  const menuClick = (e) => {
    setPos(e.target.getBoundingClientRect());
    if (listEditClick.id) {
      setListEditClick({});
    } else {
      setListEditClick(list);
    }
  };
  const addingCard = () => {
    setAddCardClick(true);
  };
  const cardSubmit = (e) => {
    e.preventDefault();
    if (cardTitle && cardTitle.trim()) {
      Axios.post(process.env.REACT_APP_END_POINT + "/card/add/" + list.id, {
        title: cardTitle.trim(),
        position: list.cards.length + 1,
      })
        .then((res) => {
          addCard(res.data);
          setAddCardClick(false);
          setCardTitle("");
        })
        .catch((err) => {
          console.log(err);
          setAddCardClick(false);
          setCardTitle("");
        });
    }
  };
  const closeCard = (e) => {
    e.preventDefault();
    setCardTitle("");
    setAddCardClick(false);
  };
  const editListTitle = () => {
    setListTitleClick(true);
  };
  const submitTitle = (e) => {
    e.preventDefault();
    if (list.title !== listTitle && listTitle.trim()) {
      Axios.put(process.env.REACT_APP_END_POINT + "/list/" + list.id, {
        title: listTitle.trim(),
        position: list.position,
        status: list.status,
      })
        .then((res) => {
          setlistTitle(res.data.title);
          editList(res.data);
        })
        .catch((err) => console.log(err));
    }
    setListTitleClick(false);
  };
  return list.status === 1 ? (
    <>
      <div className="list" listid={List.id}>
        <div className="title">
          {listTitleClick ? (
            <form onSubmit={submitTitle}>
              <input
                type="text"
                className="editListTitle rounded"
                value={listTitle}
                onChange={(e) => setlistTitle(e.target.value)}
                onBlur={submitTitle}
                autoFocus
              ></input>
            </form>
          ) : (
            <h3 onClick={editListTitle}>{listTitle}</h3>
          )}
          <a href="#" className="menuClick" onClick={menuClick}>
            <i className="fas fa-ellipsis-h"></i>
          </a>
        </div>
        {list.cards && (
          <div className="cards">
            {list.cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                listid={list.id}
                listTitle={listTitle}
              />
            ))}
          </div>
        )}
        {addCardClick ? (
          <div className="add-card-click">
            <form className="card-fill" onSubmit={cardSubmit}>
              <textarea
                type="text"
                className="rounded"
                onChange={(e) => setCardTitle(e.target.value)}
                value={cardTitle}
                placeholder="Enter a title for this card..."
              ></textarea>
              <button type="submit" className="btn add text-light">
                Add Card
              </button>
              <button className="btn close" onClick={closeCard}>
                <i className="fas fa-times"></i>
              </button>
              <a href="#" className="float-right option">
                <i className="fas fa-ellipsis-h"></i>
              </a>
            </form>
          </div>
        ) : (
          <div className="add-card">
            <p onClick={addingCard}>+&nbsp; Add another card</p>
            <a href="#">
              <i className="far fa-clone"></i>
            </a>
          </div>
        )}
      </div>
      <ListModal
        list={listEditClick}
        setListEditClick={setListEditClick}
        pos={pos}
        archiveList={archiveList}
      />
    </>
  ) : null;
};

export default List;
