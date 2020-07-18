import React, { useState ,useEffect} from 'react'
import './List.css'
import Card from './Card'
import Axios from 'axios'

const List = ({ list, addCard, editList ,setCardClick,setCardMenuClick}) => {
    const [Title, setTitle] = useState("");
    const [listTitle, setlistTitle] = useState(list.title);
    const [cards, setCards] = useState(list.cards);

    useEffect(() => {
        setCards(list.cards);
    }, [list.cards])
    const menuClick = (event) => {
        const menuLocation = event.target.getBoundingClientRect();
        let left = menuLocation.left;
        const right = menuLocation.right;
        const listMenu = document.getElementById("listMenu");
        if (window.innerWidth - right < 300) {
            left = window.innerWidth - 292;
        }
        listMenu.setAttribute('listid', list.id);
        listMenu.style.left = left - 8 + "px";
        // setTimeout(() => {
        if (listMenu.style.display === "" || listMenu.style.display === "none") {
            listMenu.style.display = "block";
        }
        else {
            listMenu.style.display = "none";
        }
        // }, 100);
    }
    const addCardClicked = (e) => {
        const addC = e.target.parentNode;
        addC.style.display = "none";
        addC.nextSibling.style.display = "block";
    }
    const cardSubmit = (e) => {
        e.preventDefault();
        const addCClick = e.target.parentNode;
        Axios.post(process.env.REACT_APP_END_POINT + "/card/add/" + list.id,
            {
                title: Title,
                position: cards ? cards.length + 1 : 1
            }
        ).then(res => {
            setCards(prevCards => [...prevCards, res.data]);
            addCard(res.data);
        })
        addCClick.style.display = "none";
        addCClick.previousSibling.style.display = "flex";
        setTitle("");
    }
    const closeCard = (e) => {
        e.preventDefault();
        const addCClick = e.target.parentNode.parentNode.parentNode;
        setTitle("");
        addCClick.style.display = "none";
        addCClick.previousSibling.style.display = "flex";
    }
    const editListTitle = (e) => {
        const h3 = e.target;
        const input = h3.nextSibling.firstChild;
        setTimeout(() => {
            input.focus();
            input.select();
        }, 10)
        h3.style.display = "none";
        h3.nextSibling.style.display = "block";
    }
    const submitTitle = (e) => {
        e.preventDefault();
        const input = e.target.firstChild;
        const h3 = input.parentNode.previousSibling;
        if (list.title !== listTitle) {
            Axios.put(process.env.REACT_APP_END_POINT + "/list/" + list.id,
                {
                    title: listTitle,
                    position: list.position,
                    status: list.status
                }
            ).then(res => {
                setlistTitle(res.data.title);
                editList(res.data.id, res.data.title);
            }).catch(err => console.log(err));
        }
        input.parentNode.style.display = "none";
        h3.style.display = "block";
    }
    return (
        <div className="list" listid={list.id} >
            <div className="title">
                <h3 onClick={editListTitle}>{listTitle}</h3>
                <form onSubmit={submitTitle}><input type="text" className="editListTitle rounded" value={listTitle} onChange={e => setlistTitle(e.target.value)}></input></form>
                <a href="#" className="menuClick" onClick={menuClick}><i className="fas fa-ellipsis-h"></i></a>
            </div>
            {(cards) && <div className="cards">{
                cards.map(card => (
                    card.status === 1 && (
                        <Card key={card.id} setCardClick={setCardClick} setCardMenuClick={setCardMenuClick} card={card} listid={list.id} listTitle={list.title} />
                    )
                )
                )
            }
            </div>
            }
            <div className="add-card">
                <p onClick={addCardClicked}>+&nbsp; Add another card</p>
                <a href="#"><i className="far fa-clone"></i></a>
            </div>
            <div className="add-card-click">
                <form className="card-fill" onSubmit={cardSubmit}>
                    <textarea type="text" className="rounded" onChange={e => setTitle(e.target.value)} value={Title} placeholder="Enter a title for this card..."></textarea>
                    <button type="submit" className="btn add text-light">Add Card</button>
                    <button className="btn close" onClick={closeCard} ><i className="fas fa-times"></i></button>
                    <a href="#" className="float-right option"><i className="fas fa-ellipsis-h"></i></a>
                </form>
            </div>
        </div>
    )
}

export default List
