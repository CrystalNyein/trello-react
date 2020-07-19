import React, { useState, useEffect } from "react";
import "./List.css";
import Card from "./Card";
import Axios from "axios";
import ListModal from "./ListModal";

const List = ({ list, addCard, editList }) => {
  const [List, setList] = useState(list);
  const [cardTitle, setCardTitle] = useState("");
  const [listTitle, setlistTitle] = useState(list.title);
  const [cards, setCards] = useState(list.cards);
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
  const changeList = (List) => {
    setList(List);
    editList(List);
  };
  const addingCard = () => {
    setAddCardClick(true);
  };
  const cardSubmit = (e) => {
    e.preventDefault();
    Axios.post(process.env.REACT_APP_END_POINT + "/card/add/" + list.id, {
      title: cardTitle,
      position: list.cards.length + 1,
    }).then((res) => {
      setCards([...cards, res.data]);
      addCard(res.data);
    });
    setAddCardClick(false);
    setCardTitle("");
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
    if (list.title !== listTitle) {
      Axios.put(process.env.REACT_APP_END_POINT + "/list/" + list.id, {
        title: listTitle,
        position: list.position,
        status: list.status,
      })
        .then((res) => {
          setlistTitle(res.data.title);
          changeList(res.data);
        })
        .catch((err) => console.log(err));
    }
    setListTitleClick(false);
  };
  return List.status === 1 ? (
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
        {cards && (
          <div className="cards">
            {cards.map((card) => (
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
        changeList={changeList}
      />
    </>
  ) : null;
};

export default List;
