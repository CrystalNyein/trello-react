import React, { useState } from 'react'
import './List.css'
import Card from './Card'

const List = ({ datakey, list, addCard,editList }) => {
    const [Title, setTitle] = useState("");
    const [listTitle, setlistTitle] = useState(list.title);
    const menuClick = (event) => {
        const menuLocation = event.target.getBoundingClientRect();
        let left = menuLocation.left;
        const right = menuLocation.right;
        const listMenu = document.getElementById("listMenu");
        if (window.innerWidth - right < 300) {
            left = window.innerWidth - 292;
        }
        listMenu.setAttribute('datakey', datakey);
        listMenu.style.left = left - 8 + "px";
        document.body.addEventListener("click", closeModal);
        if (listMenu.style.display == "" || listMenu.style.display == "none") {
            listMenu.style.display = "block";
        }
        else {
            listMenu.style.display = "none";
        }
    }
    const closeModal = (event) => {
        if (event.target == document.getElementById("listArchive")) {
            document.getElementById("listMenu").style.display = "none";
        }
        if (event.target.parentNode.parentNode != document.getElementById("listMenu")) {
            document.getElementById("listMenu").style.display = "none";
        }
    }
    const addCardClicked = (e) => {
        const addC = e.target.parentNode;
        const addCClick = addC.nextSibling;
        addC.style.display = "none";
        addCClick.style.display = "block";
    }
    const cardSubmit = (e) => {
        e.preventDefault();
        const addCClick = e.target.parentNode;
        const addC = addCClick.previousSibling;
        addCard(list.id,Title);
        addCClick.style.display = "none";
        addC.style.display = "flex";        
        setTitle("");
    }
    const closeCard = (e) => {
        e.preventDefault();
        const addCClick = e.target.parentNode.parentNode.parentNode;
        const addC = addCClick.previousSibling;
        setTitle("");
        addCClick.style.display = "none";
        addC.style.display = "flex";
    }
    const editListTitle = (e) => {
        const h3 = e.target;
        const input = h3.nextSibling;
        h3.style.display = "none";
        input.style.display = "block";
    }
    const submitTitle = (e) => {
        const input = e.target;
        const h3 = input.previousSibling;
        input.style.display = "none";
        h3.style.display = "block";
    }
    return (
        <div className="list" listid={list.id} >
            <div className="title">
                <h3 onClick={editListTitle}>{list.title}</h3>
                <input type="text" className="editListTitle rounded" value={listTitle} onChange={e => setlistTitle(e.target.value)} onSubmit={submitTitle}></input>
                <a href="#" onClick={menuClick}><i className="fas fa-ellipsis-h"></i></a>
            </div>
            {(list.cards) && <div className="cards">{
                list.cards.map(card => (
                    card.status === 1 && (
                        <Card key={card.id} card={card} />
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
