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
    const fetchData = async () => {
        try {
            const res = await Axios.get(process.env.REACT_APP_END_POINT + "/list");
            setLists(res.data);
        } catch (err) {
            setLists([]);
            console.log(err);
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
        console.log("editing card desc:"+card.description);
    }
    const onCardClick = (cardid,listid) => {
        let list=Lists.find(l=>l.id==listid);
        setcard(()=>{
            let card = list.cards.find(c=>c.id==cardid);
            card.listTitle = list.title;
            card.listId = list.id;
            return card;
        })
    }
    const editCardName = (listid,cardid,name) => {
        console.log("listid:"+listid+" cardid:"+cardid+" name:"+name);
        let listIndex=Lists.findIndex(l=>l.id==listid);
        let cardIndex=Lists[listIndex].cards.findIndex(c => c.id == cardid);
        let _card=Lists[listIndex].cards[cardIndex];
        Axios.put(
            process.env.REACT_APP_END_POINT +
              "/card/update/" +
              listid +
              "/" +
              cardid,
            {
              title: name,
              description: _card.description,
              position: _card.position,
              status: _card.status,
            }
        ).then(res =>{ 
            setcard(prevCard =>{
                prevCard.title = name;
                return prevCard;
            });
            setLists(prevList =>{
                prevList[listIndex].cards[cardIndex] = res.data;
                return prevList;
            })
        });
    }
    return (
        <div className="content-wrapper" id="content">
            {Lists && Lists.map((list, index) => (
                (list.status === 1) && (
                    <List key={index} list={list} addCard={addCard} editList={editList} onCardClick={onCardClick}/>
                )
            )
            )}
            {Lists.length != 0 &&
                <div className="add-border">
                    <AddList addList={addList} position={Lists.length} />
                </div>}
            <ListModal archiveList={archiveList} />
            <CardMenuModal editCardName={editCardName}/>
            <CardModal card={card} editCardDesc={editCardDesc}/>
            <MemberModal />
            <LabelModal />
        </div>
    )
}

export default ContentWrapper
