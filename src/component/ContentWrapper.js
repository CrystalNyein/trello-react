import React, { useState, useEffect } from 'react'
import './ContentWrapper.css'
import Axios from 'axios'
import List from './List';
import AddList from './AddList';
import ListModal from './ListModal';
import CardMenuModal from './CardMenuModal';

const ContentWrapper = () => {
    const [Lists, setLists] = useState([]);
    const fetchData = async () => {
        try {
            const res = await Axios.get(process.env.REACT_APP_END_POINT + "/list");
            setLists(res.data);
        } catch (err) {
            setLists([]);
            console.log(err);
        }

    }
    useEffect(() => {
        fetchData();
    }, [Lists])
    const addList = (title) => {
        Axios.post(process.env.REACT_APP_END_POINT + "/list", { title: title, position: Lists.length + 1 })
            .then(res => {
                setLists(prevList => [...prevList, res.data]);
            })
            .catch(err => console.log(err))
    }
    const archiveList = (index) => {
        console.log(index);
        Axios.put(process.env.REACT_APP_END_POINT + "/list/" + Lists[index].id + "/status/2");
    }
    const addCard = (listid,title) => {
        const list = Lists.find(l => l.id===listid);
        Axios.post(process.env.REACT_APP_END_POINT + "/card/add/"+ listid,{
            title:title,
            position:list.cards.length+1
        });

    }
    const editList = (listid,title) => {

    }
    return (
        <div className="content-wrapper" id="content">
            {Lists && Lists.map((list, index) => (
                (list.status === 1) && (
                    <List key={index} datakey={index} list={list} addCard={addCard} editList={editList}/>
                )
            )
            )}
            {Lists.length != 0 &&
                <div className="add-border">
                    <AddList addList={addList} />
                </div>}
            <ListModal archiveList={archiveList} />
            <CardMenuModal />
        </div>
    )
}

export default ContentWrapper
