import React, { useState, useEffect } from 'react'
import './ContentWrapper.css'
import Axios from 'axios'
import List from './List';
import AddList from './AddList';
import ListModal from './ListModal';
import CardMenuModal from './CardMenuModal';
import CardModal from './CardModal';
import MemberModal from './MemberModal';
import LabelModal from './LabelModal';

const ContentWrapper = () => {
    const [Lists, setLists] = useState([]);
    const [card, setcard] = useState({});
    const [cardClick, setCardClick] = useState({});
    const [cardMenuClick, setCardMenuClick] = useState({});
    const [pos,setPos] = useState([]);
    const fetchData = async () => {
        try {
            const res = await Axios.get(process.env.REACT_APP_END_POINT + "/list");
            setLists(res.data);
        } catch (err) {
            setLists([]);
        }
    }

    // const closeModal = (event) => {
    //     let target = event.target;
    //     let node;
    //     if(target.nodeName === 'I'){
    //         node = target.parentNode;
    //     }
    //     else{
    //         node = target;
    //     }
    //     if (node.className !== "menuClick") {
    //         if (target == document.getElementById("listArchive")) {
    //             document.getElementById("listMenu").style.display = "none";
    //         }
    //         if (target.parentNode.parentNode != document.getElementById("listMenu")) {
    //             document.getElementById("listMenu").style.display = "none";
    //         }
    //     }
    // }
    useEffect(() => {
        fetchData();
        // document.getElementsByClassName("desc-save")[0].addEventListener("click", (event) => {
        // })
        // document.body.addEventListener("click", (e) => {
        //     console.log(e)
        
        // });
    }, [])

    const addList = (list) => {
        setLists(prevList => [...prevList, list]);
    }
    const archiveList = (list) => {
        let index = Lists.findIndex(l => l.id === list.id);
        setLists(prevList => prevList.filter(l => l.id !== list.id));
        setLists(prevList => {
            prevList.splice(index, 0, list);
            return prevList;
        })

    }
    const addCard = (card) => {
        const listIndex = Lists.findIndex(l => l.id === card.list.id);
        delete card.list;
        setLists(prevList => {
            prevList[listIndex].cards.push(card);
            return prevList;
        });
    }
    const editList = (listid, title) => {        
        const index=Lists.findIndex(l=>l.id === listid);
        setLists(prevList => {
            prevList[index].title = title;
            return prevList;
        })
    }
    const editCardDesc = (Card,listid) =>  {        
        let listIndex=Lists.findIndex(l=>l.id==listid);
        let cardIndex=Lists[listIndex].cards.findIndex(c => c.id == Card.id);
        setcard(prevCard => {
            prevCard.description = Card.description;
            return prevCard;
        });
        setLists(prevList =>{
            prevList[listIndex].cards[cardIndex] = Card;
            return prevList;
        })
    }
    // const onCardClick = (cardid,listid) => {
    //     let list=Lists.find(l=>l.id==listid);
    //     setcard(()=>{
    //         let card = list.cards.find(c=>c.id==cardid);
    //         card.listTitle = list.title;
    //         card.listId = list.id;
    //         return card;
    //     })
    // }
    const editCardName = (Card) => {
        let listIndex=Lists.findIndex(l=>l.id==Card.list.id);
        let cardIndex=Lists[listIndex].cards.findIndex(c => c.id == Card.id);
        setcard(prevCard => {
            prevCard.title = Card.title;
            return prevCard;
        });
        setLists(prevList =>{
            prevList[listIndex].cards[cardIndex] = Card;
            return prevList;
        });
    }
    const editCardStatus = (Card) => {
        let listIndex=Lists.findIndex(l=>l.id==Card.list.id);
        setcard(prevCard => {
            prevCard.title = Card.title;
            return prevCard;
        });
        let cards = Lists[listIndex].cards.filter(c=>c.id != Card.id);
        setLists(prevList =>{
            prevList[listIndex].cards = cards;
            return prevList;
        });
    }
    return (
        <div className="content-wrapper" id="content">
            {Lists && Lists.map((list, index) => (
                (list.status === 1) && (
                    <List key={index} list={list} addCard={addCard} editList={editList} setCardClick={setCardClick} setCardMenuClick={setCardMenuClick}/>
                )
            )
            )}
            {Lists.length != 0 &&
                <div className="add-border">
                    <AddList addList={addList} position={Lists.length} />
                </div>}
            <ListModal archiveList={archiveList} />
            <CardMenuModal card={cardMenuClick} editCardName={editCardName} editCardStatus={editCardStatus} setCardMenuClick={setCardMenuClick}/>
            <CardModal card={cardClick} editCardDesc={editCardDesc} editCardName={editCardName} setCardClick={setCardClick}/>
            <MemberModal />
            <LabelModal />
        </div>
    )
}

export default ContentWrapper
