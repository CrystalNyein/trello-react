import React, { useState, useEffect } from "react";
import "./ContentWrapper.css";
import Axios from "axios";
import List from "./List";
import AddList from "./AddList";

const ContentWrapper = () => {
  const [lists, setLists] = useState([]);
  const fetchData = async () => {
    try {
      const res = await Axios.get(process.env.REACT_APP_END_POINT + "/list");
      setLists(res.data);
    } catch (err) {
      setLists([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addList = (list) => {
    setLists((prevList) => [...prevList, list]);
  };
  const editList = (List) => {
    const index = lists.findIndex((l) => l.id === List.id);
    setLists((prevList) => {
      prevList[index] = List;
      return prevList;
    });
  };
  const archiveList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId));
  };
  const addCard = (card) => {
    const listIndex = lists.findIndex((l) => l.id === card.list.id);
    setLists((prevList) => {
      prevList[listIndex].cards.push(card);
      return prevList;
    });
  };

  return (
    <div className="ContentWrapper content-wrapper" id="content">
      {lists &&
        lists.map((list) => (
          <List
            key={list.id}
            list={list}
            addCard={addCard}
            editList={editList}
            archiveList={archiveList}
          />
        ))}
      {lists.length != 0 && (
        <div className="add-border">
          <AddList addList={addList} position={lists.length} />
        </div>
      )}
    </div>
  );
};

export default ContentWrapper;
