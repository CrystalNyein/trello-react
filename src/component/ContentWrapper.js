import React, { useState, useEffect } from 'react'
import './ContentWrapper.css'
import Axios from 'axios'
import List from './List';
import AddList from './AddList';

const ContentWrapper = () => {
    const [Lists, setLists] = useState([]);
    const fetchData = async () => {
        try {
            const res = await Axios.get(process.env.REACT_APP_END_POINT + "/list");
            setLists(res.data);
        } catch (err) {
            setLists([]);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const addList = (list) => {
        setLists(prevList => [...prevList, list]);
    }
    const editList = (List) => {        
        const index=Lists.findIndex(l=>l.id === List.id);
        setLists(prevList=>{
            prevList[index] = List;
            return prevList;
        })
    }
    const addCard = (card) => {
        const listIndex = Lists.findIndex(l => l.id === card.list.id);
        setLists(prevList => {
            prevList[listIndex].cards.push(card);
            return prevList;
        });
    }    
    
    return (
        <div className="content-wrapper" id="content">
            {Lists && Lists.map((list, index) => (
                    <List key={index} list={list} addCard={addCard} editList={editList} />
                
            )
            )}
            {Lists.length != 0 &&
                <div className="add-border">
                    <AddList addList={addList} position={Lists.length} />
                </div>
            }            
            
        </div>
    )
}

export default ContentWrapper
